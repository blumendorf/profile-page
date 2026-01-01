/**
 * Test runner for HTML generator evaluation
 *
 * This module runs evaluation tests against the HTML generator.
 * Can be used both programmatically and from the command line.
 */

import { TEST_CASES, type TestCase } from './test-cases';
import { checkTestCase, isValidHTML, type TestResult } from './constraint-checker';

export interface EvalConfig {
  /** Number of runs per test (for statistical analysis) */
  runsPerTest: number;
  /** Filter to specific test IDs */
  testIds?: string[];
  /** Filter to specific categories */
  categories?: string[];
  /** Filter to specific difficulties */
  difficulties?: ('easy' | 'medium' | 'hard')[];
  /** Verbose output */
  verbose: boolean;
}

export interface EvalSummary {
  totalTests: number;
  totalRuns: number;
  passedTests: number;
  passRate: number;
  avgGenerationTimeMs: number;
  validHTMLRate: number;
  byCategory: Record<string, { passed: number; total: number; rate: number }>;
  byDifficulty: Record<string, { passed: number; total: number; rate: number }>;
  results: TestResult[];
}

const DEFAULT_CONFIG: EvalConfig = {
  runsPerTest: 1,
  verbose: false,
};

/**
 * Filter test cases based on config
 */
function filterTests(config: EvalConfig): TestCase[] {
  let tests = [...TEST_CASES];

  if (config.testIds?.length) {
    tests = tests.filter((t) => config.testIds!.includes(t.id));
  }

  if (config.categories?.length) {
    tests = tests.filter((t) => config.categories!.includes(t.category));
  }

  if (config.difficulties?.length) {
    tests = tests.filter((t) => config.difficulties!.includes(t.difficulty));
  }

  return tests;
}

/**
 * Run evaluation with a generate function
 *
 * @param generateFn - Function that generates HTML from an intent string
 * @param config - Evaluation configuration
 */
export async function runEvaluation(
  generateFn: (intent: string) => Promise<string>,
  config: Partial<EvalConfig> = {}
): Promise<EvalSummary> {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const tests = filterTests(cfg);
  const results: TestResult[] = [];

  let totalGenerationTime = 0;
  let validHTMLCount = 0;

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`RUNNING EVALUATION: ${tests.length} tests × ${cfg.runsPerTest} runs`);
  console.log(`${'═'.repeat(60)}\n`);

  for (const testCase of tests) {
    if (cfg.verbose) {
      console.log(`\n▸ ${testCase.id}: "${testCase.intent}"`);
    }

    for (let run = 0; run < cfg.runsPerTest; run++) {
      const startTime = Date.now();

      try {
        const html = await generateFn(testCase.intent);
        const generationTimeMs = Date.now() - startTime;
        totalGenerationTime += generationTimeMs;

        // Check HTML validity
        const validity = isValidHTML(html);
        if (validity.valid) {
          validHTMLCount++;
        }

        // Check constraints
        const result = checkTestCase(html, testCase);
        const testResult: TestResult = {
          ...result,
          generationTimeMs,
          rawOutput: cfg.verbose ? html : undefined,
        };

        results.push(testResult);

        // Print result
        const status = testResult.passed ? '✓' : '✗';
        const runLabel = cfg.runsPerTest > 1 ? ` [run ${run + 1}]` : '';

        if (cfg.verbose) {
          console.log(`  ${status}${runLabel} (${generationTimeMs}ms)`);
          if (!testResult.passed) {
            testResult.constraintResults
              .filter((c) => !c.passed)
              .forEach((c) => {
                console.log(`    └─ ${c.reason}`);
                if (c.actual) console.log(`       actual: ${c.actual}`);
              });
          }
        } else {
          const passedConstraints = testResult.constraintResults.filter((c) => c.passed).length;
          const totalConstraints = testResult.constraintResults.length;
          process.stdout.write(
            `${status} ${testCase.id}${runLabel} [${passedConstraints}/${totalConstraints}] (${generationTimeMs}ms)\n`
          );
        }
      } catch (error) {
        const generationTimeMs = Date.now() - startTime;
        console.log(`✗ ${testCase.id}: ERROR - ${String(error)}`);

        results.push({
          testCase,
          passed: false,
          constraintResults: [],
          generationTimeMs,
        });
      }
    }
  }

  // Calculate summary
  const passedTests = results.filter((r) => r.passed).length;
  const totalRuns = results.length;

  // Group by category
  const byCategory: EvalSummary['byCategory'] = {};
  for (const result of results) {
    const cat = result.testCase.category;
    if (!byCategory[cat]) {
      byCategory[cat] = { passed: 0, total: 0, rate: 0 };
    }
    byCategory[cat].total++;
    if (result.passed) byCategory[cat].passed++;
  }
  for (const cat of Object.keys(byCategory)) {
    byCategory[cat].rate = byCategory[cat].passed / byCategory[cat].total;
  }

  // Group by difficulty
  const byDifficulty: EvalSummary['byDifficulty'] = {};
  for (const result of results) {
    const diff = result.testCase.difficulty;
    if (!byDifficulty[diff]) {
      byDifficulty[diff] = { passed: 0, total: 0, rate: 0 };
    }
    byDifficulty[diff].total++;
    if (result.passed) byDifficulty[diff].passed++;
  }
  for (const diff of Object.keys(byDifficulty)) {
    byDifficulty[diff].rate = byDifficulty[diff].passed / byDifficulty[diff].total;
  }

  const summary: EvalSummary = {
    totalTests: tests.length,
    totalRuns,
    passedTests,
    passRate: passedTests / totalRuns,
    avgGenerationTimeMs: totalGenerationTime / totalRuns,
    validHTMLRate: validHTMLCount / totalRuns,
    byCategory,
    byDifficulty,
    results,
  };

  // Print summary
  console.log(`\n${'═'.repeat(60)}`);
  console.log('EVALUATION SUMMARY');
  console.log(`${'═'.repeat(60)}`);
  console.log(`\nOverall: ${passedTests}/${totalRuns} passed (${(summary.passRate * 100).toFixed(1)}%)`);
  console.log(`Valid HTML: ${(summary.validHTMLRate * 100).toFixed(1)}%`);
  console.log(`Avg Generation Time: ${summary.avgGenerationTimeMs.toFixed(0)}ms`);

  console.log('\nBy Category:');
  for (const [cat, stats] of Object.entries(byCategory)) {
    console.log(`  ${cat}: ${stats.passed}/${stats.total} (${(stats.rate * 100).toFixed(0)}%)`);
  }

  console.log('\nBy Difficulty:');
  for (const [diff, stats] of Object.entries(byDifficulty)) {
    console.log(`  ${diff}: ${stats.passed}/${stats.total} (${(stats.rate * 100).toFixed(0)}%)`);
  }

  console.log(`\n${'═'.repeat(60)}\n`);

  return summary;
}

/**
 * Run a quick evaluation with fewer tests
 */
export async function runQuickEval(
  generateFn: (intent: string) => Promise<string>
): Promise<EvalSummary> {
  return runEvaluation(generateFn, {
    // Run only easy tests for quick validation
    difficulties: ['easy'],
    runsPerTest: 1,
    verbose: false,
  });
}

/**
 * Run full evaluation with multiple runs per test
 */
export async function runFullEval(
  generateFn: (intent: string) => Promise<string>,
  runsPerTest: number = 3
): Promise<EvalSummary> {
  return runEvaluation(generateFn, {
    runsPerTest,
    verbose: false,
  });
}

// Export test cases for external use
export { TEST_CASES } from './test-cases';
export type { TestCase } from './test-cases';
export type { TestResult } from './constraint-checker';

