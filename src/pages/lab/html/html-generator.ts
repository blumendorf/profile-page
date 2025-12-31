import { webllmEngine } from '../shared';

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
function buildHTML(css: string): string {
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

// Style presets as fallback
const STYLE_PRESETS: Record<string, string> = {
  'terminal': 'body{background:#000;color:#0f0;font-family:monospace}h1{font-size:2.5rem}.title{color:#0f0}.tag{border:1px solid #0f0;color:#0f0;padding:0.5rem 1rem;border-radius:999px}.contact a{color:#0f0;border:1px solid #0f0;padding:0.5rem 1rem}',
  'hacker': 'body{background:#000;color:#0f0;font-family:monospace}h1{font-size:2.5rem}.title{color:#0f0}.tag{border:1px solid #0f0;color:#0f0;padding:0.5rem 1rem;border-radius:999px}.contact a{color:#0f0;border:1px solid #0f0;padding:0.5rem 1rem}',
  'dark': 'body{background:#0a0a0a;color:#e5e5e5;font-family:system-ui}h1{font-size:2.5rem}.title{color:#f59e0b}.tag{border:1px solid #f59e0b;color:#f59e0b;padding:0.5rem 1rem;border-radius:999px}.contact a{color:#e5e5e5;border:1px solid #333;padding:0.5rem 1rem}',
  'minimal': 'body{background:#fff;color:#111;font-family:system-ui}h1{font-size:2.5rem;font-weight:600}.title{color:#0066cc}.tag{border:1px solid #0066cc;color:#0066cc;padding:0.5rem 1rem;border-radius:999px}.contact a{color:#111;border:1px solid #ccc;padding:0.5rem 1rem}',
  'clean': 'body{background:#fff;color:#111;font-family:system-ui}h1{font-size:2.5rem;font-weight:600}.title{color:#0066cc}.tag{border:1px solid #0066cc;color:#0066cc;padding:0.5rem 1rem;border-radius:999px}.contact a{color:#111;border:1px solid #ccc;padding:0.5rem 1rem}',
  'professional': 'body{background:#f8fafc;color:#0f172a;font-family:system-ui}h1{font-size:2.5rem;font-weight:700}.title{color:#3b82f6}.tag{border:1px solid #3b82f6;color:#3b82f6;padding:0.5rem 1rem;border-radius:999px}.contact a{color:#0f172a;border:1px solid #e2e8f0;padding:0.5rem 1rem}',
  'warm': 'body{background:#fef3e2;color:#422006;font-family:Georgia,serif}h1{font-size:2.5rem}.title{color:#ea580c}.tag{border:1px solid #ea580c;color:#ea580c;padding:0.5rem 1rem;border-radius:999px}.contact a{color:#422006;border:1px solid #422006;padding:0.5rem 1rem}',
  'friendly': 'body{background:#fef3e2;color:#422006;font-family:Georgia,serif}h1{font-size:2.5rem}.title{color:#ea580c}.tag{border:1px solid #ea580c;color:#ea580c;padding:0.5rem 1rem;border-radius:999px}.contact a{color:#422006;border:1px solid #422006;padding:0.5rem 1rem}',
  'brutalist': 'body{background:#ff0;color:#000;font-family:Impact,sans-serif}h1{font-size:3rem;text-transform:uppercase}.title{color:#f00}.tag{border:3px solid #000;color:#000;padding:0.5rem 1rem}.contact a{color:#000;border:3px solid #000;padding:0.5rem 1rem;background:#fff}',
  'bold': 'body{background:#000;color:#fff;font-family:Impact,sans-serif}h1{font-size:3rem}.title{color:#f00}.tag{border:2px solid #f00;color:#f00;padding:0.5rem 1rem}.contact a{color:#fff;border:2px solid #fff;padding:0.5rem 1rem}',
};

const DEFAULT_CSS = STYLE_PRESETS['dark'];
export const DEFAULT_HTML = buildHTML(DEFAULT_CSS);

export async function generateHTML(userIntent: string): Promise<string> {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('[html-generator] generateHTML() called');
  console.log('[html-generator] User Intent:', userIntent);

  const intentLower = userIntent.toLowerCase();

  // Check presets first for reliable results
  for (const [keyword, css] of Object.entries(STYLE_PRESETS)) {
    if (intentLower.includes(keyword)) {
      console.log(`[html-generator] ✓ PRESET MATCH: "${keyword}"`);
      console.log('[html-generator] Using preset CSS (instant)');
      console.log('═══════════════════════════════════════════════════════════');
      return buildHTML(css);
    }
  }

  console.log('[html-generator] No preset match, using AI generation...');

  const prompt = `${SYSTEM_PROMPT} "${userIntent}"`;

  console.log('[html-generator] ════════════════════════════════════════');
  console.log('[html-generator] MODEL INPUT (Prompt):');
  console.log('────────────────────────────────────────');
  console.log(prompt);
  console.log('────────────────────────────────────────');

  try {
    const startTime = Date.now();
    console.log('[html-generator] Calling webllmEngine.generate()...');

    const response = await webllmEngine.generate(prompt, 400);

    const duration = Date.now() - startTime;
    console.log('[html-generator] ════════════════════════════════════════');
    console.log('[html-generator] MODEL OUTPUT (Raw CSS):');
    console.log('────────────────────────────────────────');
    console.log(response);
    console.log('────────────────────────────────────────');
    console.log(`[html-generator] Generation took ${duration}ms`);

    // Validate CSS output has body selector
    if (response.includes('body') && response.includes('{')) {
      const html = buildHTML(response);
      console.log('[html-generator] ✓ HTML built with AI-generated CSS');
      console.log('═══════════════════════════════════════════════════════════');
      return html;
    } else {
      console.log('[html-generator] ✗ Invalid CSS output, using default');
      console.log('═══════════════════════════════════════════════════════════');
      return DEFAULT_HTML;
    }
  } catch (error) {
    console.error('[html-generator] ❌ Generation failed:', error);
    console.log('[html-generator] Returning DEFAULT_HTML');
    console.log('═══════════════════════════════════════════════════════════');
    return DEFAULT_HTML;
  }
}

