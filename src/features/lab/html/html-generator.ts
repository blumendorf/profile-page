import type { LLMEngine, TokenCallback, GenerationConfig } from './llm';

/** Default generation config optimized for HTML output */
export const DEFAULT_HTML_GENERATION_CONFIG: Required<Omit<GenerationConfig, 'stop'>> & Pick<GenerationConfig, 'stop'> = {
  maxTokens: 1200,
  temperature: 0.4,
  topP: 0.9,
  repetitionPenalty: 1.1,
  stop: ['</html>'],
};

/**
 * Build the prompt with current HTML and user request
 */
function buildPrompt(currentHtml: string, request: string): string {
  return `You are a senior web developer. Modify the provided page according to the request. Output ONLY the complete HTML document, no explanations.

Current page:
${currentHtml}

Request: ${request}

Output only the modified HTML:`;
}

/**
 * Clean HTML output from the model - fix common issues and extract the HTML
 */
export function buildHTML(rawOutput: string): string {
  let html = rawOutput.trim();

  // Remove markdown code blocks if present
  const codeMatch = html.match(/```(?:html)?\s*([\s\S]*?)```/);
  if (codeMatch) {
    html = codeMatch[1].trim();
  }

  // Find the start of the HTML document
  const doctypeIndex = html.toLowerCase().indexOf('<!doctype');
  const htmlIndex = html.toLowerCase().indexOf('<html');
  const startIndex = doctypeIndex !== -1 ? doctypeIndex : htmlIndex;

  if (startIndex > 0) {
    html = html.substring(startIndex);
  }

  // Fix incomplete closing tags (common with stop sequences)
  // Handle </html, </body, </head without closing >
  html = html.replace(/<\/html\s*$/i, '</html>');
  html = html.replace(/<\/body\s*$/i, '</body>');
  html = html.replace(/<\/head\s*$/i, '</head>');

  // Ensure </html> is present at the end
  if (!html.toLowerCase().includes('</html>')) {
    // Try to add closing tags if missing
    if (!html.toLowerCase().includes('</body>')) {
      html += '\n</body>';
    }
    html += '\n</html>';
  }

  return html;
}

// Default HTML for initial state
export const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0a0a0a;
      color: #e5e5e5;
      font-family: system-ui, -apple-system, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .container {
      text-align: center;
    }
    h1 { font-size: 2rem; margin-bottom: 1rem; }
    p { opacity: 0.7; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hello World</h1>
    <p>Describe what you want to create...</p>
  </div>
</body>
</html>`;

/**
 * Result of HTML generation
 */
export interface GenerationResult {
  /** Raw model output */
  rawOutput: string;
  /** Final processed HTML */
  html: string;
  /** Whether the output was valid HTML */
  isValid: boolean;
  /** Generation time in milliseconds */
  generationTimeMs: number;
  /** Approximate token count */
  tokenCount: number;
}

/**
 * Generate HTML with streaming support
 * @param request - User's modification request
 * @param currentHtml - The current HTML to modify
 * @param engine - LLM engine to use for generation
 * @param onToken - Optional callback for streaming tokens
 * @param config - Optional generation config (uses defaults if not provided)
 */
export async function generateHTMLWithEngine(
  request: string,
  currentHtml: string,
  engine: LLMEngine,
  onToken?: TokenCallback,
  config?: GenerationConfig
): Promise<GenerationResult> {
  // Merge with defaults, ensuring stop sequence is always present
  const finalConfig: GenerationConfig = {
    ...DEFAULT_HTML_GENERATION_CONFIG,
    ...config,
    stop: config?.stop ?? DEFAULT_HTML_GENERATION_CONFIG.stop,
  };

  console.log('═══════════════════════════════════════════════════════════');
  console.log('[html-generator] generateHTMLWithEngine() called');
  console.log('[html-generator] Request:', request);
  console.log('[html-generator] Model:', engine.getModelId());

  const prompt = buildPrompt(currentHtml, request);
  const startTime = Date.now();
  let tokenCount = 0;

  // Wrap the token callback to count tokens
  const wrappedOnToken: TokenCallback | undefined = onToken
    ? (token: string) => {
        tokenCount++;
        onToken(token);
      }
    : undefined;

  console.log('[html-generator] ════════════════════════════════════════');
  console.log('[html-generator] MODEL INPUT (Prompt):');
  console.log('────────────────────────────────────────');
  console.log(prompt);
  console.log('────────────────────────────────────────');

  try {
    console.log('[html-generator] Calling engine.generate()...');
    console.log('[html-generator] Config:', finalConfig);

    const response = await engine.generate(prompt, finalConfig, wrappedOnToken);

    const duration = Date.now() - startTime;
    console.log('[html-generator] ════════════════════════════════════════');
    console.log('[html-generator] MODEL OUTPUT (Raw HTML):');
    console.log('────────────────────────────────────────');
    console.log(response);
    console.log('────────────────────────────────────────');
    console.log(`[html-generator] Generation took ${duration}ms`);

    // Clean up the output (extract HTML, fix common issues)
    const html = buildHTML(response);

    console.log('[html-generator] ✓ HTML processed');
    console.log('═══════════════════════════════════════════════════════════');

    return {
      rawOutput: response,
      html,
      isValid: true, // Always render whatever the model produces
      generationTimeMs: duration,
      tokenCount: tokenCount || Math.ceil(response.length / 4),
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('[html-generator] ❌ Generation failed:', error);
    console.log('═══════════════════════════════════════════════════════════');

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return {
      rawOutput: `Error: ${errorMessage}`,
      html: currentHtml, // Keep current HTML on error
      isValid: true,
      generationTimeMs: duration,
      tokenCount: 0,
    };
  }
}
