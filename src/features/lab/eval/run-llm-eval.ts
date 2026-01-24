/**
 * LLM-based evaluation script
 *
 * This runs the actual HTML generator with real LLM models.
 * Requires Node.js with WebGPU support (not available in all environments).
 *
 * For browser-based evaluation, use the EvalPlayground component instead.
 *
 * Usage:
 *   npx tsx src/pages/lab/eval/run-llm-eval.ts [options]
 *
 * Options:
 *   --quick       Run only easy tests
 *   --runs=N      Number of runs per test (default: 1)
 *   --model=X     Model ID to use (default: smollm-360m)
 */

import { runEvaluation, type EvalConfig } from './runner';
import { generateHTMLWithEngine } from '../html/html-generator';
import { createEngine, getModelConfig, type LLMEngine } from './llm';

// ─────────────────────────────────────────────────────────────────────────────
// LLM Generator
// ─────────────────────────────────────────────────────────────────────────────

let engine: LLMEngine | null = null;

async function initEngine(modelId: string): Promise<void> {
  console.log(`\n📦 Initializing model: ${modelId}`);
  const config = getModelConfig(modelId);
  console.log(`   ${config.name} (${config.size}, ${config.downloadSize})`);

  engine = createEngine(modelId);

  await engine.initialize((progress) => {
    if (progress.stage === 'downloading') {
      process.stdout.write(`\r   Downloading: ${progress.progress}%`);
    } else if (progress.stage === 'loading') {
      process.stdout.write(`\r   Loading into GPU...    `);
    } else if (progress.stage === 'ready') {
      console.log(`\n   ✓ Model ready`);
    }
  });
}

async function llmGenerator(intent: string): Promise<string> {
  if (!engine) {
    throw new Error('Engine not initialized');
  }

  const result = await generateHTMLWithEngine(intent, '', engine);
  return result.html;
}

// ─────────────────────────────────────────────────────────────────────────────
// CLI Entry Point
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  // Parse model
  const modelArg = args.find((a) => a.startsWith('--model='));
  const modelId = modelArg ? modelArg.split('=')[1] : 'smollm-360m';

  const config: Partial<EvalConfig> = {
    runsPerTest: 1,
    verbose: args.includes('--verbose'),
  };

  if (args.includes('--quick')) {
    config.difficulties = ['easy'];
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

  console.log('\n🧪 HTML Generator LLM Evaluation');
  console.log(`Model: ${modelId}`);

  try {
    await initEngine(modelId);

    const summary = await runEvaluation(llmGenerator, config);

    // Cleanup
    if (engine) {
      await engine.dispose();
    }

    // Exit with error code if pass rate is below threshold
    if (summary.passRate < 0.5) {
      console.log('⚠️  Pass rate below 50% threshold');
      process.exit(1);
    }

    console.log('✅ Evaluation complete');
  } catch (error) {
    console.error('Evaluation failed:', error);

    // Check for WebGPU not available
    if (String(error).includes('WebGPU') || String(error).includes('GPU')) {
      console.log('\n💡 WebGPU is not available in this Node.js environment.');
      console.log('   Run evaluation in the browser using the EvalPlayground component,');
      console.log('   or use the mock evaluation: npx tsx src/pages/lab/eval/run-eval.ts');
    }

    process.exit(1);
  }
}

void main();

