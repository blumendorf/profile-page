/**
 * CLI script to run HTML generator evaluations
 *
 * Usage:
 *   npx tsx src/pages/lab/eval/run-eval.ts [options]
 *
 * Options:
 *   --quick       Run only easy tests (faster)
 *   --full        Run all tests with multiple runs
 *   --runs=N      Number of runs per test (default: 1)
 *   --category=X  Filter by category (bg-hue, text-hue, font, etc.)
 *   --verbose     Show detailed output
 */

import { runEvaluation, type EvalConfig } from './runner';
import { DEFAULT_HTML } from '../html/html-generator';

// ─────────────────────────────────────────────────────────────────────────────
// Mock generator for testing the eval framework
// In real usage, this would use the actual LLM
// ─────────────────────────────────────────────────────────────────────────────

const PROFILE = {
  name: 'Dr Marco Blumendorf',
  title: 'Director of Software Engineering',
  headline: 'Building AI-first engineering teams',
};

// Style presets that match common test intents
const STYLE_PRESETS: Record<string, string> = {
  // Background hue tests
  'green background': `body{background:#228B22;color:#fff}`,
  'blue background': `body{background:#1e40af;color:#fff}`,
  'red background': `body{background:#dc2626;color:#fff}`,
  'purple background': `body{background:#7c3aed;color:#fff}`,
  'orange background': `body{background:#ea580c;color:#fff}`,
  'yellow background': `body{background:#eab308;color:#000}`,

  // Background luminance tests
  'dark background': `body{background:#1a1a1a;color:#e5e5e5}`,
  'light background': `body{background:#f5f5f5;color:#1a1a1a}`,
  'black background': `body{background:#000;color:#fff}`,
  'white background': `body{background:#fff;color:#111}`,

  // Text color tests
  'green text color': `body{background:#000;color:#22c55e}`,
  'blue text color': `body{background:#000;color:#3b82f6}`,
  'red text': `body{background:#fff;color:#dc2626}`,
  'light colored text': `body{background:#000;color:#e5e5e5}`,
  'dark colored text': `body{background:#fff;color:#1a1a1a}`,

  // Accent color tests
  'green accent color for title': `body{background:#000;color:#fff}.title{color:#22c55e}`,
  'blue accent color': `body{background:#fff;color:#111}.title{color:#3b82f6}`,
  'purple accent color': `body{background:#000;color:#fff}.title{color:#a855f7}`,
  'orange accent color': `body{background:#fff;color:#111}.title{color:#f97316}`,

  // Font tests
  'monospace font': `body{background:#000;color:#0f0;font-family:monospace}`,
  'serif font': `body{background:#fef3e2;color:#422006;font-family:Georgia,serif}`,
  'sans-serif font': `body{background:#fff;color:#111;font-family:system-ui,sans-serif}`,

  // Structure tests
  'gradient background': `body{background:linear-gradient(135deg,#1a1a2e,#16213e);color:#fff}`,
  'with box shadow-sm': `body{background:#fff;color:#111}.card{box-shadow:0 4px 20px rgba(0,0,0,0.1)}`,
  'rounded-sm corners': `body{background:#fff;color:#111}.card{border-radius:1rem}`,
  'visible border': `body{background:#000;color:#0f0}.card{border:1px solid #0f0}`,

  // Combined tests
  'terminal hacker style': `body{background:#000;color:#0f0;font-family:monospace}.card{border:1px solid #0f0}`,
  'professional corporate style': `body{background:#f8fafc;color:#1e293b;font-family:system-ui,sans-serif}.card{box-shadow:0 4px 20px rgba(0,0,0,0.1)}`,
  'dark theme with gradient': `body{background:linear-gradient(135deg,#0a0a0a,#1a1a2e);color:#fff}`,
  'clean minimal white design': `body{background:#fff;color:#111;font-family:system-ui,sans-serif}`,
  'warm and friendly with serif font': `body{background:#fef3e2;color:#422006;font-family:Georgia,serif}`,
  'ocean blue theme': `body{background:linear-gradient(180deg,#0369a1,#1e3a5f);color:#fff}`,
};

/**
 * Build full HTML from CSS preset
 */
function buildHTMLFromCSS(css: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    ${css}
    body { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; }
    .card { max-width: 500px; padding: 2rem; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    .title { margin-bottom: 1rem; }
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
</html>`;
}

/**
 * Mock generator using presets
 * Returns preset if intent matches, otherwise returns default
 */
function mockGenerator(intent: string): Promise<string> {
  // Look for matching preset
  const intentLower = intent.toLowerCase();

  for (const [key, css] of Object.entries(STYLE_PRESETS)) {
    if (intentLower === key.toLowerCase()) {
      return Promise.resolve(buildHTMLFromCSS(css));
    }
  }

  // Partial match
  for (const [key, css] of Object.entries(STYLE_PRESETS)) {
    if (intentLower.includes(key.toLowerCase()) || key.toLowerCase().includes(intentLower)) {
      return Promise.resolve(buildHTMLFromCSS(css));
    }
  }

  // No match - return default
  console.log(`  [mock] No preset for: "${intent}"`);
  return Promise.resolve(DEFAULT_HTML);
}

// ─────────────────────────────────────────────────────────────────────────────
// CLI Entry Point
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  const config: Partial<EvalConfig> = {
    runsPerTest: 1,
    verbose: args.includes('--verbose'),
  };

  if (args.includes('--quick')) {
    config.difficulties = ['easy'];
  }

  if (args.includes('--full')) {
    config.runsPerTest = 3;
  }

  // Parse --runs=N
  const runsArg = args.find((a) => a.startsWith('--runs='));
  if (runsArg) {
    config.runsPerTest = parseInt(runsArg.split('=')[1], 10);
  }

  // Parse --category=X
  const catArg = args.find((a) => a.startsWith('--category='));
  if (catArg) {
    config.categories = [catArg.split('=')[1]];
  }

  console.log('\n🧪 HTML Generator Evaluation');
  console.log('Using: Mock generator (preset-based)\n');

  const summary = await runEvaluation(mockGenerator, config);

  // Exit with error code if pass rate is below threshold
  if (summary.passRate < 0.8) {
    console.log('⚠️  Pass rate below 80% threshold');
    process.exit(1);
  }

  console.log('✅ Evaluation complete');
}

main().catch((err) => {
  console.error('Evaluation failed:', err);
  process.exit(1);
});

