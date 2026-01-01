import type { LLMEngine, TokenCallback, GenerationConfig } from './llm';

/** Generation config optimized for HTML output */
const HTML_GENERATION_CONFIG: GenerationConfig = {
  maxTokens: 600,
  temperature: 0.25,
  topP: 0.9,
  repetitionPenalty: 1.1,
  stop: ['</html>'],
};

// Profile data for the card
const PROFILE = {
  name: "Dr Marco Blumendorf",
  title: "Director of Software Engineering",
  headline: "Building AI-first engineering teams",
};

// Structured prompt with explicit rules and readable examples
const SYSTEM_PROMPT = `You are a senior web developer. Modify the provided page according to the request. CREATE VALID HTML.

Current page:
// inject the current html here


Request:
// inject the request here
`;

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

/**
 * Check if the output looks like valid HTML (basic check)
 */
export function isValidHTML(html: string): boolean {
  const lower = html.toLowerCase();
  // Just check it has the basic structure - browser will handle the rest
  return (
    (lower.includes('<!doctype') || lower.includes('<html')) &&
    lower.includes('<body')
  );
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
    .card {
      max-width: 500px;
      padding: 2rem;
      border: 1px solid #333;
      border-radius: 1rem;
    }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    .title { color: #f59e0b; margin-bottom: 1rem; }
    .headline { opacity: 0.8; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${PROFILE.name}</h1>
    <p class="title">${PROFILE.title}</p>
    <p class="headline">${PROFILE.headline}</p>
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
 * @param userIntent - User's style description
 * @param engine - LLM engine to use for generation
 * @param onToken - Optional callback for streaming tokens
 */
export async function generateHTMLWithEngine(
  userIntent: string,
  engine: LLMEngine,
  onToken?: TokenCallback
): Promise<GenerationResult> {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('[html-generator] generateHTMLWithEngine() called');
  console.log('[html-generator] User Intent:', userIntent);
  console.log('[html-generator] Model:', engine.getModelId());

  const prompt = `${SYSTEM_PROMPT} "${userIntent}"`;
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
    console.log('[html-generator] Config:', HTML_GENERATION_CONFIG);

    const response = await engine.generate(prompt, HTML_GENERATION_CONFIG, wrappedOnToken);

    const duration = Date.now() - startTime;
    console.log('[html-generator] ════════════════════════════════════════');
    console.log('[html-generator] MODEL OUTPUT (Raw HTML):');
    console.log('────────────────────────────────────────');
    console.log(response);
    console.log('────────────────────────────────────────');
    console.log(`[html-generator] Generation took ${duration}ms`);

    // Clean up and process HTML output
    const html = buildHTML(response);
    const isValid = isValidHTML(html);

    console.log('[html-generator] ✓ HTML processed');
    if (!isValid) {
      console.log('[html-generator] ⚠ HTML may be incomplete but will be shown to user');
    }
    console.log('═══════════════════════════════════════════════════════════');

    return {
      rawOutput: response,
      html,
      isValid,
      generationTimeMs: duration,
      tokenCount: tokenCount || Math.ceil(response.length / 4), // Rough estimate if not streaming
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('[html-generator] ❌ Generation failed:', error);
    console.log('═══════════════════════════════════════════════════════════');

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return {
      rawOutput: `Error: ${errorMessage}`,
      html: DEFAULT_HTML,
      isValid: false,
      generationTimeMs: duration,
      tokenCount: 0,
    };
  }
}
