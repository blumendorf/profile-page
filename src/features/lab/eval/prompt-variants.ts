/**
 * Prompt variants for A/B testing
 *
 * Each variant defines a different system prompt approach.
 * The evaluation will compare performance across variants.
 */

// Profile data (constant across all prompts)
export const PROFILE = {
  name: "Dr Marco Blumendorf",
  title: "Director of Software Engineering",
  headline: "Building AI-first engineering teams",
};

export interface PromptVariant {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

/**
 * Current production prompt (v1)
 */
const PROMPT_V1 = `You are a web designer. Generate a complete HTML profile card page.

RULES:
- Output ONLY valid HTML starting with <!DOCTYPE html>
- Use EXACTLY this content:
  Name: ${PROFILE.name}
  Title: ${PROFILE.title}
  Headline: ${PROFILE.headline}
- Keep HTML minimal: just head, style, and body
- Do NOT include JavaScript, external links, images, or comments
- Stop immediately after </html>

EXAMPLE - "terminal hacker":
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #000;
      color: #0f0;
      font-family: monospace;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .card {
      border: 1px solid #0f0;
      padding: 2rem;
      max-width: 500px;
    }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    .title { color: #0f0; opacity: 0.8; margin-bottom: 1rem; }
    .headline { line-height: 1.6; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${PROFILE.name}</h1>
    <p class="title">${PROFILE.title}</p>
    <p class="headline">${PROFILE.headline}</p>
  </div>
</body>
</html>

EXAMPLE - "clean corporate":
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: linear-gradient(180deg, #f8fafc, #e2e8f0);
      color: #1e293b;
      font-family: system-ui, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .card {
      background: #fff;
      border-radius: 1rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      padding: 2.5rem;
      max-width: 500px;
    }
    h1 { font-size: 2rem; font-weight: 600; margin-bottom: 0.5rem; }
    .title { color: #3b82f6; margin-bottom: 1rem; }
    .headline { color: #64748b; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${PROFILE.name}</h1>
    <p class="title">${PROFILE.title}</p>
    <p class="headline">${PROFILE.headline}</p>
  </div>
</body>
</html>

Now generate HTML for:`;

/**
 * V2: Simpler prompt with CSS-only focus
 */
const PROMPT_V2_CSS_FOCUS = `Generate CSS for a profile card. The user will describe a style, you output ONLY the CSS.

CRITICAL: Match the user's color request exactly:
- "green background" → background: #22c55e or similar GREEN
- "blue background" → background: #3b82f6 or similar BLUE
- "red background" → background: #ef4444 or similar RED
- "dark background" → background: #0a0a0a or #111
- "light background" → background: #f5f5f5 or #fff

Output format - just the body{} CSS:
body{background:COLOR;color:TEXT;font-family:FONT}

Example "terminal hacker":
body{background:#000;color:#0f0;font-family:monospace}

Example "clean white":
body{background:#fff;color:#111;font-family:system-ui}

Example "blue corporate":
body{background:#1e40af;color:#fff;font-family:system-ui}

Now output CSS for:`;

/**
 * V3: More examples, explicit color mapping
 */
const PROMPT_V3_MORE_EXAMPLES = `You are a web designer. Generate HTML for a profile card.

IMPORTANT - Follow the user's style request:
- "green" → use green colors (#22c55e, #16a34a, #15803d)
- "blue" → use blue colors (#3b82f6, #2563eb, #1d4ed8)
- "red" → use red colors (#ef4444, #dc2626, #b91c1c)
- "purple" → use purple colors (#a855f7, #9333ea, #7c3aed)
- "orange" → use orange colors (#f97316, #ea580c, #c2410c)
- "yellow" → use yellow colors (#eab308, #ca8a04, #a16207)
- "dark" → dark backgrounds (#000, #0a0a0a, #111, #1a1a1a)
- "light" → light backgrounds (#fff, #fafafa, #f5f5f5)

Profile content:
- Name: ${PROFILE.name}
- Title: ${PROFILE.title}
- Headline: ${PROFILE.headline}

Output ONLY HTML starting with <!DOCTYPE html>, ending with </html>.

EXAMPLE "green background":
<!DOCTYPE html>
<html><head><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#22c55e;color:#fff;font-family:system-ui;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem}
.card{max-width:500px;padding:2rem}
h1{font-size:2rem;margin-bottom:0.5rem}
.title{opacity:0.9;margin-bottom:1rem}
.headline{line-height:1.6}
</style></head><body>
<div class="card"><h1>${PROFILE.name}</h1><p class="title">${PROFILE.title}</p><p class="headline">${PROFILE.headline}</p></div>
</body></html>

EXAMPLE "blue background":
<!DOCTYPE html>
<html><head><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#3b82f6;color:#fff;font-family:system-ui;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem}
.card{max-width:500px;padding:2rem}
h1{font-size:2rem;margin-bottom:0.5rem}
.title{opacity:0.9;margin-bottom:1rem}
.headline{line-height:1.6}
</style></head><body>
<div class="card"><h1>${PROFILE.name}</h1><p class="title">${PROFILE.title}</p><p class="headline">${PROFILE.headline}</p></div>
</body></html>

EXAMPLE "dark background":
<!DOCTYPE html>
<html><head><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0a0a;color:#e5e5e5;font-family:system-ui;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem}
.card{max-width:500px;padding:2rem;border:1px solid #333}
h1{font-size:2rem;margin-bottom:0.5rem}
.title{color:#f59e0b;margin-bottom:1rem}
.headline{line-height:1.6;opacity:0.8}
</style></head><body>
<div class="card"><h1>${PROFILE.name}</h1><p class="title">${PROFILE.title}</p><p class="headline">${PROFILE.headline}</p></div>
</body></html>

Now generate HTML for:`;

/**
 * V4: Chain of thought - think before generating
 */
const PROMPT_V4_COT = `Generate HTML for a profile card based on the user's style request.

Step 1: Identify the key style elements from the request
Step 2: Choose appropriate colors
Step 3: Output HTML

Profile:
- Name: ${PROFILE.name}
- Title: ${PROFILE.title}
- Headline: ${PROFILE.headline}

Color guide:
- green → #22c55e
- blue → #3b82f6
- red → #ef4444
- purple → #a855f7
- orange → #f97316
- yellow → #eab308
- dark → #0a0a0a
- light → #f5f5f5
- white → #ffffff
- black → #000000

Output HTML starting with <!DOCTYPE html>.

Request:`;

/**
 * All available prompt variants
 */
export const PROMPT_VARIANTS: PromptVariant[] = [
  {
    id: 'v1-current',
    name: 'V1: Current (2 examples)',
    description: 'Current production prompt with terminal + corporate examples',
    prompt: PROMPT_V1,
  },
  {
    id: 'v2-css-focus',
    name: 'V2: CSS Focus',
    description: 'Simpler prompt asking for CSS only, explicit color mapping',
    prompt: PROMPT_V2_CSS_FOCUS,
  },
  {
    id: 'v3-more-examples',
    name: 'V3: More Examples',
    description: 'More color examples (green, blue, dark) with explicit color codes',
    prompt: PROMPT_V3_MORE_EXAMPLES,
  },
  {
    id: 'v4-cot',
    name: 'V4: Chain of Thought',
    description: 'Asks model to think step-by-step before generating',
    prompt: PROMPT_V4_COT,
  },
];

export const DEFAULT_VARIANT_ID = 'v1-current';

export function getVariant(id: string): PromptVariant {
  return PROMPT_VARIANTS.find(v => v.id === id) ?? PROMPT_VARIANTS[0];
}

