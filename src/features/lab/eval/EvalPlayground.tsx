/**
 * Prompt Comparison Playground
 *
 * Compare different prompt variants to find the best performing one.
 */

import { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Square, Trophy, Clock, CheckCircle, XCircle } from 'lucide-react';
import { TEST_CASES } from './test-cases';
import { checkTestCase, isValidHTML, type TestResult } from './constraint-checker';
import { buildHTML } from '../html/html-generator';
import { createEngine, getModelConfig, AVAILABLE_MODELS, type LLMEngine, type GenerationConfig } from './llm';
import { DownloadProgress } from '../shared/components';
import { PROMPT_VARIANTS, PROFILE } from './prompt-variants';

// Generation config
const EVAL_CONFIG: GenerationConfig = {
  maxTokens: 600,
  temperature: 0.25,
  topP: 0.9,
  stop: ['</html>'],
};

interface VariantResult {
  variantId: string;
  results: TestResult[];
  passRate: number;
  avgTimeMs: number;
  validHtmlRate: number;
}

interface EvalState {
  status: 'idle' | 'initializing' | 'running' | 'complete' | 'error';
  progress: { stage: string; progress: number; text: string };
  currentVariant: string;
  currentTest: string;
  variantResults: VariantResult[];
  error?: string;
}

export function EvalPlayground() {
  const [modelId, setModelId] = useState('smollm-360m');
  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'medium'>('easy');
  const [selectedVariants, setSelectedVariants] = useState<string[]>(['v1-current', 'v3-more-examples']);
  const [state, setState] = useState<EvalState>({
    status: 'idle',
    progress: { stage: 'idle', progress: 0, text: '' },
    currentVariant: '',
    currentTest: '',
    variantResults: [],
  });

  const abortRef = useRef(false);
  const engineRef = useRef<LLMEngine | null>(null);

  const toggleVariant = (id: string) => {
    setSelectedVariants((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const stopEvaluation = useCallback(() => {
    abortRef.current = true;
  }, []);

  const runEvaluation = useCallback(async () => {
    if (selectedVariants.length === 0) {
      alert('Select at least one prompt variant');
      return;
    }

    abortRef.current = false;
    setState({
      status: 'initializing',
      progress: { stage: 'downloading', progress: 0, text: 'Starting...' },
      currentVariant: '',
      currentTest: '',
      variantResults: [],
    });

    try {
      // Initialize engine
      engineRef.current = createEngine(modelId);
      await engineRef.current.initialize((progress) => {
        setState((s) => ({
          ...s,
          progress: {
            stage: progress.stage,
            progress: progress.progress,
            text: progress.text,
          },
        }));
      });

      if (abortRef.current) {
        setState((s) => ({ ...s, status: 'idle' }));
        return;
      }

      // Filter tests
      const tests =
        difficulty === 'all'
          ? TEST_CASES
          : TEST_CASES.filter((t) => t.difficulty === difficulty);

      setState((s) => ({ ...s, status: 'running' }));

      const allVariantResults: VariantResult[] = [];

      // Run each variant
      for (const variantId of selectedVariants) {
        if (abortRef.current) break;

        const variant = PROMPT_VARIANTS.find((v) => v.id === variantId);
        if (!variant) continue;

        setState((s) => ({ ...s, currentVariant: variantId }));

        const results: TestResult[] = [];

        for (const testCase of tests) {
          if (abortRef.current) break;

          setState((s) => ({ ...s, currentTest: testCase.id }));

          const startTime = Date.now();
          try {
            // Build full prompt
            const fullPrompt = `${variant.prompt} "${testCase.intent}"`;

            // Generate
            const response = await engineRef.current.generate(fullPrompt, EVAL_CONFIG);
            const generationTimeMs = Date.now() - startTime;

            // For V2 (CSS-only), we need to wrap it in HTML
            let html = response;
            if (variantId === 'v2-css-focus') {
              html = wrapCSSInHTML(response);
            } else {
              html = buildHTML(response);
            }

            const testResult = checkTestCase(html, testCase);
            results.push({
              ...testResult,
              generationTimeMs,
              rawOutput: html,
            });
          } catch (error) {
            results.push({
              testCase,
              passed: false,
              constraintResults: [],
              generationTimeMs: Date.now() - startTime,
              rawOutput: `Error: ${String(error)}`,
            });
          }

          // Update live results
          const passedCount = results.filter((r) => r.passed).length;
          const validCount = results.filter((r) => isValidHTML(r.rawOutput || '').valid).length;

          const currentVariantResult: VariantResult = {
            variantId,
            results: [...results],
            passRate: results.length > 0 ? passedCount / results.length : 0,
            avgTimeMs:
              results.length > 0
                ? results.reduce((s, r) => s + r.generationTimeMs, 0) / results.length
                : 0,
            validHtmlRate: results.length > 0 ? validCount / results.length : 0,
          };

          setState((s) => ({
            ...s,
            variantResults: [
              ...allVariantResults,
              currentVariantResult,
            ],
          }));
        }

        // Finalize this variant
        const passedCount = results.filter((r) => r.passed).length;
        const validCount = results.filter((r) => isValidHTML(r.rawOutput || '').valid).length;

        allVariantResults.push({
          variantId,
          results,
          passRate: results.length > 0 ? passedCount / results.length : 0,
          avgTimeMs:
            results.length > 0
              ? results.reduce((s, r) => s + r.generationTimeMs, 0) / results.length
              : 0,
          validHtmlRate: results.length > 0 ? validCount / results.length : 0,
        });

        setState((s) => ({ ...s, variantResults: [...allVariantResults] }));
      }

      setState((s) => ({
        ...s,
        status: 'complete',
        currentVariant: '',
        currentTest: '',
      }));
    } catch (error) {
      setState((s) => ({
        ...s,
        status: 'error',
        error: String(error),
      }));
    } finally {
      if (engineRef.current) {
        void engineRef.current.dispose();
        engineRef.current = null;
      }
    }
  }, [modelId, difficulty, selectedVariants]);

  // Find best variant
  const bestVariant = state.variantResults.length > 0
    ? state.variantResults.reduce((best, curr) =>
        curr.passRate > best.passRate ? curr : best
      )
    : null;

  const testCount = difficulty === 'all'
    ? TEST_CASES.length
    : TEST_CASES.filter((t) => t.difficulty === difficulty).length;

  return (
    <div className="min-h-screen bg-page p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <Link
            to="/lab"
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back to Lab</span>
          </Link>
          <h1 className="text-3xl font-bold font-mono mb-2">Prompt Comparison</h1>
          <p className="text-text-muted">
            Compare different prompt variants to find the best performing one.
          </p>
        </div>

        {/* Configuration */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Model & Tests */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Model</label>
              <select
                value={modelId}
                onChange={(e) => setModelId(e.target.value)}
                disabled={state.status === 'running' || state.status === 'initializing'}
                className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-page-elevated"
              >
                {AVAILABLE_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.size})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Test Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as 'all' | 'easy' | 'medium')}
                disabled={state.status === 'running' || state.status === 'initializing'}
                className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-page-elevated"
              >
                <option value="easy">
                  Easy ({TEST_CASES.filter((t) => t.difficulty === 'easy').length} tests)
                </option>
                <option value="medium">
                  Medium ({TEST_CASES.filter((t) => t.difficulty === 'medium').length} tests)
                </option>
                <option value="all">All ({TEST_CASES.length} tests)</option>
              </select>
            </div>
          </div>

          {/* Right: Variant Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Prompt Variants to Compare</label>
            <div className="space-y-2">
              {PROMPT_VARIANTS.map((variant) => (
                <label
                  key={variant.id}
                  className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedVariants.includes(variant.id)
                      ? 'border-accent bg-accent/10'
                      : 'border-border-subtle hover:border-border'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedVariants.includes(variant.id)}
                    onChange={() => toggleVariant(variant.id)}
                    disabled={state.status === 'running' || state.status === 'initializing'}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium">{variant.name}</div>
                    <div className="text-sm text-text-muted">{variant.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Run Button */}
        <div className="flex gap-4">
          {state.status === 'running' || state.status === 'initializing' ? (
            <button
              onClick={stopEvaluation}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Square size={18} />
              Stop
            </button>
          ) : (
            <button
              onClick={() => void runEvaluation()}
              disabled={selectedVariants.length === 0}
              className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              <Play size={18} />
              Run Comparison ({selectedVariants.length} variants × {testCount} tests)
            </button>
          )}
        </div>

        {/* Progress */}
        {(state.status === 'initializing' || state.status === 'running') && (
          <div className="p-4 border border-border-subtle rounded-lg bg-page-elevated">
            {state.status === 'initializing' && (
              <DownloadProgress
                progress={state.progress.progress}
                stage={state.progress.stage as 'downloading' | 'loading' | 'ready'}
                text={state.progress.text}
                modelName={getModelConfig(modelId).name}
                downloadSizeGB={getModelConfig(modelId).downloadSizeGB}
              />
            )}
            {state.status === 'running' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-accent border-t-transparent rounded-full" />
                  <span>
                    Running: <span className="font-mono">{state.currentVariant}</span> →{' '}
                    <span className="font-mono">{state.currentTest}</span>
                  </span>
                </div>
                <div className="text-sm text-text-muted">
                  {state.variantResults.length > 0 && (
                    <>
                      Completed {state.variantResults.length === selectedVariants.length
                        ? selectedVariants.length
                        : state.variantResults.length - 1} of {selectedVariants.length} variants
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {state.status === 'error' && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg">
            <strong>Error:</strong> {state.error}
          </div>
        )}

        {/* Results Comparison */}
        {state.variantResults.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Results Comparison</h2>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {state.variantResults.map((vr) => {
                const variant = PROMPT_VARIANTS.find((v) => v.id === vr.variantId);
                const isBest = bestVariant?.variantId === vr.variantId && state.status === 'complete';

                return (
                  <div
                    key={vr.variantId}
                    className={`p-4 border rounded-lg ${
                      isBest
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-border-subtle bg-page-elevated'
                    }`}
                  >
                    {isBest && (
                      <div className="flex items-center gap-1 text-green-500 text-sm mb-2">
                        <Trophy size={14} />
                        <span>Best</span>
                      </div>
                    )}
                    <div className="font-medium mb-3">{variant?.name}</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-muted">Pass Rate</span>
                        <span className={vr.passRate >= 0.5 ? 'text-green-500' : 'text-red-500'}>
                          {(vr.passRate * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Passed</span>
                        <span>
                          {vr.results.filter((r) => r.passed).length}/{vr.results.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Avg Time</span>
                        <span>{vr.avgTimeMs.toFixed(0)}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Valid HTML</span>
                        <span>{(vr.validHtmlRate * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detailed Results Table */}
            <div className="border border-border-subtle rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-page-elevated">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Test</th>
                      <th className="px-4 py-3 text-left font-medium">Intent</th>
                      {state.variantResults.map((vr) => {
                        const variant = PROMPT_VARIANTS.find((v) => v.id === vr.variantId);
                        return (
                          <th key={vr.variantId} className="px-4 py-3 text-center font-medium">
                            {variant?.name.split(':')[0]}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {(difficulty === 'all'
                      ? TEST_CASES
                      : TEST_CASES.filter((t) => t.difficulty === difficulty)
                    ).map((test, i) => (
                      <tr key={test.id} className={i % 2 === 0 ? 'bg-page' : 'bg-page-elevated/50'}>
                        <td className="px-4 py-2 font-mono text-xs">{test.id}</td>
                        <td className="px-4 py-2 text-text-muted">{test.intent}</td>
                        {state.variantResults.map((vr) => {
                          const result = vr.results.find((r) => r.testCase.id === test.id);
                          return (
                            <td key={vr.variantId} className="px-4 py-2 text-center">
                              {result ? (
                                result.passed ? (
                                  <CheckCircle size={18} className="inline text-green-500" />
                                ) : (
                                  <XCircle size={18} className="inline text-red-500" />
                                )
                              ) : (
                                <Clock size={18} className="inline text-text-muted animate-pulse" />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Wrap CSS-only output in HTML template (for V2 prompt)
 */
function wrapCSSInHTML(css: string): string {
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

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    ${cleanCss}
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
