import type { LLMEngine, TokenCallback } from '../shared';

// Profile data
const PROFILE_DATA = {
  name: "Dr Marco Blumendorf",
  title: "Director of Software Engineering",
  headline: "I spent a decade at TU Berlin researching adaptive UI and distributed AI. Now I lead engineering teams, rethinking how we build software alongside AI.",
  tags: ["Engineering", "Leadership", "AI first"],
  contact: {
    email: "marco@blumendorf.info",
    linkedin: "linkedin.com/in/marcoblu",
    github: "github.com/blumendorf"
  }
};

// Few-shot prompt with exact examples
const SYSTEM_PROMPT = `Generate CSS for a profile page. Output ONLY CSS code.

Example 1 - "terminal hacker":
body{background:#000;color:#0f0;font-family:monospace}
h1{font-size:2.5rem}
.title{color:#0f0}
.tag{border:1px solid #0f0;color:#0f0;padding:0.5rem 1rem;border-radius:999px}
.contact a{color:#0f0;border:1px solid #0f0;padding:0.5rem 1rem}

Example 2 - "minimal professional":
body{background:#fff;color:#111;font-family:system-ui}
h1{font-size:2.5rem;font-weight:600}
.title{color:#0066cc}
.tag{border:1px solid #0066cc;color:#0066cc;padding:0.5rem 1rem;border-radius:999px}
.contact a{color:#111;border:1px solid #ccc;padding:0.5rem 1rem}

Example 3 - "warm sunset":
body{background:#fef3e2;color:#422006;font-family:Georgia,serif}
h1{font-size:2.5rem}
.title{color:#ea580c}
.tag{border:1px solid #ea580c;color:#ea580c;padding:0.5rem 1rem;border-radius:999px}
.contact a{color:#422006;border:1px solid #422006;padding:0.5rem 1rem}

Now generate CSS for:`;

/**
 * Build HTML with injected CSS
 */
export function buildHTML(css: string): string {
  // Clean up CSS
  let cleanCss = css.trim();

  // Remove markdown code blocks
  const codeMatch = cleanCss.match(/```(?:css)?\s*([\s\S]*?)```/);
  if (codeMatch) {
    cleanCss = codeMatch[1].trim();
  }

  // Find body selector start
  const bodyIndex = cleanCss.indexOf('body');
  if (bodyIndex > 0) {
    cleanCss = cleanCss.substring(bodyIndex);
  }

  // Stop at any non-CSS content
  const endMarkers = ['Example', 'Note:', '/*', 'Now generate'];
  for (const marker of endMarkers) {
    const idx = cleanCss.indexOf(marker);
    if (idx !== -1) {
      cleanCss = cleanCss.substring(0, idx);
    }
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${PROFILE_DATA.name}</title>
  <style>
    /* Reset */
    * { margin: 0; padding: 0; box-sizing: border-box; }

    /* AI Generated Styles */
    ${cleanCss}

    /* Layout */
    body { min-height: 100vh; display: flex; align-items: center; padding: 2rem; }
    .container { max-width: 800px; margin: 0 auto; }
    h1 { margin-bottom: 0.5rem; }
    .title { font-size: 1.25rem; margin-bottom: 1rem; }
    .headline { line-height: 1.6; margin-bottom: 1.5rem; max-width: 600px; opacity: 0.8; }
    .tags { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem; }
    .tag { font-size: 0.875rem; }
    .contact { display: flex; gap: 1rem; flex-wrap: wrap; }
    .contact a { text-decoration: none; border-radius: 0.5rem; transition: opacity 0.2s; }
    .contact a:hover { opacity: 0.7; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${PROFILE_DATA.name}</h1>
      <p class="title">${PROFILE_DATA.title}</p>
      <p class="headline">${PROFILE_DATA.headline}</p>
      <div class="tags">
        ${PROFILE_DATA.tags.map(tag => `<span class="tag">${tag}</span>`).join('\n        ')}
      </div>
    </header>
    <section class="contact">
      <a href="mailto:${PROFILE_DATA.contact.email}">Email</a>
      <a href="https://${PROFILE_DATA.contact.linkedin}" target="_blank">LinkedIn</a>
      <a href="https://${PROFILE_DATA.contact.github}" target="_blank">GitHub</a>
    </section>
  </div>
</body>
</html>`;
}

// Default CSS for initial state
const DEFAULT_CSS = 'body{background:#0a0a0a;color:#e5e5e5;font-family:system-ui}h1{font-size:2.5rem}.title{color:#f59e0b}.tag{border:1px solid #f59e0b;color:#f59e0b;padding:0.5rem 1rem;border-radius:999px}.contact a{color:#e5e5e5;border:1px solid #333;padding:0.5rem 1rem}';
export const DEFAULT_HTML = buildHTML(DEFAULT_CSS);

/**
 * Result of HTML generation
 */
export interface GenerationResult {
  /** Raw model output (CSS) */
  rawOutput: string;
  /** Final processed HTML */
  html: string;
  /** Whether the output was valid CSS */
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

    const response = await engine.generate(prompt, 400, wrappedOnToken);

    const duration = Date.now() - startTime;
    console.log('[html-generator] ════════════════════════════════════════');
    console.log('[html-generator] MODEL OUTPUT (Raw CSS):');
    console.log('────────────────────────────────────────');
    console.log(response);
    console.log('────────────────────────────────────────');
    console.log(`[html-generator] Generation took ${duration}ms`);

    // Validate CSS output has body selector
    const isValid = response.includes('body') && response.includes('{');
    const html = isValid ? buildHTML(response) : DEFAULT_HTML;

    if (isValid) {
      console.log('[html-generator] ✓ HTML built with AI-generated CSS');
    } else {
      console.log('[html-generator] ✗ Invalid CSS output, using default');
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
