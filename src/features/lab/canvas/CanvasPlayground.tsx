import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { DownloadProgress, CrossTabWarning, CrossTabIndicator } from '../shared/components';
import { useCrossTabModel } from '../shared/hooks';
import {
  createEngine,
  getSavedModelId,
  getModelConfig,
  type LLMEngine,
} from './llm';
import {
  interpretMood,
  blendState,
  buildPrompt,
  DEFAULT_CANVAS_STATE,
  extractKeywords,
  type CanvasState,
} from './canvas-interpreter';
import { ArrowLeft, Sparkles, Pause, Play, RotateCcw } from 'lucide-react';

export default function CanvasPlayground() {
  const [downloadState, setDownloadState] = useState<{
    stage: 'downloading' | 'loading' | 'ready';
    progress: number;
    text: string;
  } | null>({ stage: 'downloading', progress: 0, text: 'Initializing...' });

  const [modelReady, setModelReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [userNudge, setUserNudge] = useState('');

  // Canvas state
  const [canvasState, setCanvasState] = useState<CanvasState>(DEFAULT_CANVAS_STATE);
  const [detectedMood, setDetectedMood] = useState<string>('');
  const [generationCount, setGenerationCount] = useState(0);

  // Get selected model
  const selectedModelId = getSavedModelId();
  const selectedModel = getModelConfig(selectedModelId);

  // Cross-tab coordination
  const {
    isModelInUseByOtherTab,
    otherTabInfo,
    updateStatus,
    warningDismissed,
    dismissWarning,
  } = useCrossTabModel();

  // Refs
  const engineRef = useRef<LLMEngine | null>(null);
  const isRunningRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const targetStateRef = useRef<Partial<CanvasState>>({});

  // Initialize model
  useEffect(() => {
    updateStatus('loading', selectedModelId);
    const engine = createEngine(selectedModelId);
    engineRef.current = engine;

    if (engine.isReady()) {
      setModelReady(true);
      setDownloadState(null);
      updateStatus('ready', selectedModelId);
      return;
    }

    engine.initialize((progress) => {
      setDownloadState(progress);
      if (progress.stage === 'ready') {
        setModelReady(true);
        updateStatus('ready', selectedModelId);
        setTimeout(() => setDownloadState(null), 500);
      }
    }).catch((err: Error) => {
      setError(`Failed to load model: ${err.message}`);
      updateStatus('error', selectedModelId);
      setDownloadState(null);
    });

    return () => {
      updateStatus('idle', '');
      if (engineRef.current) {
        const result = engineRef.current.dispose();
        if (result && typeof result.catch === 'function') {
          result.catch(console.error);
        }
      }
    };
  }, [selectedModelId, updateStatus]);

  // Smooth state blending animation loop
  useEffect(() => {
    const animate = () => {
      setCanvasState((current) => {
        const blended = blendState(current, targetStateRef.current, 0.08);
        return blended;
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);


  // Generation loop
  const generateMood = useCallback(async () => {
    if (!engineRef.current || !isRunningRef.current) return;

    const prompt = buildPrompt(userNudge);

    try {
      let accumulated = '';

      await engineRef.current.generate(
        prompt,
        { maxTokens: 20 }, // Short output
        (token) => {
          accumulated += token;
        }
      );

      // Interpret the mood and update target state
      const changes = interpretMood(accumulated);
      targetStateRef.current = { ...targetStateRef.current, ...changes };

      // Extract and display detected keywords
      const keywords = extractKeywords(accumulated);
      if (keywords.length > 0) {
        setDetectedMood(keywords.join(' · '));
      }
      setGenerationCount((c) => c + 1);

      // Schedule next generation
      if (isRunningRef.current) {
        setTimeout(() => void generateMood(), 2000); // Pause between generations
      }
    } catch (err) {
      console.error('Generation failed:', err);
      if (isRunningRef.current) {
        setTimeout(() => void generateMood(), 3000);
      }
    }
  }, [userNudge]);

  // Start/stop generation
  const handleToggle = () => {
    if (isRunning) {
      isRunningRef.current = false;
      setIsRunning(false);
      updateStatus('ready', selectedModelId);
    } else {
      isRunningRef.current = true;
      setIsRunning(true);
      updateStatus('generating', selectedModelId);
      void generateMood();
    }
  };

  const handleReset = () => {
    targetStateRef.current = DEFAULT_CANVAS_STATE;
    setCanvasState(DEFAULT_CANVAS_STATE);
    setDetectedMood('');
    setGenerationCount(0);
    setUserNudge('');
  };

  // CSS custom properties from canvas state
  const canvasStyle = {
    '--canvas-hue': canvasState.hue,
    '--canvas-saturation': `${canvasState.saturation}%`,
    '--canvas-lightness': `${canvasState.lightness}%`,
    '--canvas-accent-hue': canvasState.accentHue,
    '--canvas-energy': canvasState.energy,
    '--canvas-chaos': canvasState.chaos,
    '--canvas-pulse': canvasState.pulse,
  } as React.CSSProperties;

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={canvasStyle}
    >
      {/* Download overlay */}
      {downloadState && downloadState.stage !== 'ready' && !error && (
        <DownloadProgress
          {...downloadState}
          downloadSizeGB={selectedModel.downloadSizeGB}
          modelName={selectedModel.name}
        />
      )}

      {/* Animated background layers */}
      <div className="absolute inset-0 canvas-background" />
      <div className="absolute inset-0 canvas-gradient" />
      <div className="absolute inset-0 canvas-particles" />
      <div className="absolute inset-0 canvas-pulse" />

      {/* Header */}
      <div className="relative z-20 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            to="/lab/canvas"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back</span>
          </Link>

          <div className="flex items-center gap-2 text-white/80 font-mono text-sm">
            <Sparkles size={16} />
            <span>Living Canvas</span>
          </div>

          <div className="text-xs text-white/50 font-mono flex items-center gap-3">
            <CrossTabIndicator otherTab={otherTabInfo} />
            {modelReady ? (
              <span className="text-emerald-400">● Ready</span>
            ) : (
              <span className="text-amber-400">● Loading...</span>
            )}
          </div>
        </div>
      </div>

      {/* Cross-tab warning */}
      {isModelInUseByOtherTab && otherTabInfo && (
        <div className="relative z-20 max-w-md mx-auto mt-4 px-4">
          <CrossTabWarning
            otherTab={otherTabInfo}
            onDismiss={dismissWarning}
            dismissed={warningDismissed}
          />
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="relative z-20 max-w-md mx-auto mt-20 p-6 bg-red-500/20 border border-red-500/50 rounded-lg backdrop-blur-sm">
          <p className="text-red-300">{error}</p>
          <Link
            to="/lab/canvas"
            className="inline-block mt-4 text-red-300 hover:text-red-200 underline"
          >
            Go back to select a different model
          </Link>
        </div>
      )}

      {/* Main content */}
      {!error && (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-8">
          {/* Central display */}
          <div className="text-center mb-12">
            {/* Status indicator */}
            {!isRunning && !detectedMood && (
              <p className="text-white/50 text-lg mb-4">
                Press Start to begin the ambient experience
              </p>
            )}

            {/* Detected mood keywords */}
            {detectedMood && (
              <div className="mb-6">
                <p className="text-white/40 text-xs font-mono uppercase tracking-wider mb-2">
                  detected mood
                </p>
                <p className="text-2xl md:text-3xl font-light text-white/90">
                  {detectedMood}
                </p>
              </div>
            )}

            {/* Running indicator */}
            {isRunning && (
              <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span>Evolving... ({generationCount} cycles)</span>
              </div>
            )}
          </div>

          {/* State visualization - compact pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-mono text-white/70">
              <span className="text-white/40">hue</span> {Math.round(canvasState.hue)}°
            </div>
            <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-mono text-white/70">
              <span className="text-white/40">energy</span> {canvasState.energy.toFixed(1)}×
            </div>
            <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-mono text-white/70">
              <span className="text-white/40">chaos</span> {(canvasState.chaos * 100).toFixed(0)}%
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-4">
            {/* Play/Pause */}
            <div className="flex gap-3">
              <button
                onClick={handleToggle}
                disabled={!modelReady}
                className="px-8 py-4 rounded-xl font-semibold flex items-center gap-3 transition-all
                           bg-white/15 hover:bg-white/25 text-white backdrop-blur-md
                           border border-white/20 hover:border-white/30
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRunning ? (
                  <>
                    <Pause size={22} />
                    Pause
                  </>
                ) : (
                  <>
                    <Play size={22} />
                    Start
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                className="px-4 py-4 rounded-xl text-white/60 hover:text-white
                           hover:bg-white/10 transition-colors border border-transparent
                           hover:border-white/20"
                title="Reset to default"
              >
                <RotateCcw size={20} />
              </button>
            </div>

            {/* Nudge input */}
            <div className="flex flex-col items-center gap-2 mt-4">
              <label className="text-white/40 text-xs font-mono uppercase tracking-wider">
                Influence the mood
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={userNudge}
                  onChange={(e) => setUserNudge(e.target.value)}
                  placeholder="ocean, fire, calm..."
                  className="w-48 px-4 py-2.5 rounded-lg bg-white/10 backdrop-blur-md
                             text-white placeholder:text-white/30 text-sm
                             border border-white/20 focus:border-white/40
                             focus:outline-none transition-colors"
                />
                {userNudge && (
                  <span className="text-emerald-400/70 text-xs">✓ active</span>
                )}
              </div>
              <p className="text-white/30 text-xs text-center max-w-xs">
                Type keywords to guide the AI's next generations
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CSS for canvas animations */}
      <style>{`
        .canvas-background {
          background: hsl(var(--canvas-hue), var(--canvas-saturation), calc(var(--canvas-lightness) * 0.15));
          transition: background 1.5s ease-out;
        }

        .canvas-gradient {
          background:
            radial-gradient(
              ellipse 80% 60% at 30% 20%,
              hsla(var(--canvas-hue), var(--canvas-saturation), var(--canvas-lightness), 0.5) 0%,
              transparent 60%
            ),
            radial-gradient(
              ellipse 70% 80% at 75% 75%,
              hsla(var(--canvas-accent-hue), var(--canvas-saturation), var(--canvas-lightness), 0.4) 0%,
              transparent 55%
            ),
            radial-gradient(
              circle at 50% 50%,
              hsla(var(--canvas-hue), calc(var(--canvas-saturation) * 0.5), calc(var(--canvas-lightness) * 1.2), 0.2) 0%,
              transparent 40%
            );
          animation: gradient-shift calc(8s / var(--canvas-energy)) ease-in-out infinite;
          transition: background 1s ease-out;
        }

        @keyframes gradient-shift {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          25% {
            transform: scale(1.05) rotate(2deg);
          }
          50% {
            transform: scale(1.1) rotate(0deg);
            opacity: 0.9;
          }
          75% {
            transform: scale(1.05) rotate(-2deg);
          }
        }

        /* Primary particle layer - small, fast */
        .canvas-particles {
          background-image:
            radial-gradient(calc(1px + var(--canvas-energy) * 1px) calc(1px + var(--canvas-energy) * 1px) at 15% 25%,
              hsla(var(--canvas-hue), 90%, 85%, calc(0.4 + var(--canvas-chaos) * 0.5)), transparent),
            radial-gradient(calc(1px + var(--canvas-energy) * 1px) calc(1px + var(--canvas-energy) * 1px) at 35% 65%,
              hsla(var(--canvas-accent-hue), 85%, 80%, calc(0.3 + var(--canvas-chaos) * 0.4)), transparent),
            radial-gradient(calc(2px + var(--canvas-energy) * 1px) calc(2px + var(--canvas-energy) * 1px) at 55% 15%,
              hsla(var(--canvas-hue), 80%, 90%, calc(0.35 + var(--canvas-chaos) * 0.45)), transparent),
            radial-gradient(calc(1px + var(--canvas-energy) * 1px) calc(1px + var(--canvas-energy) * 1px) at 75% 55%,
              hsla(var(--canvas-accent-hue), 85%, 85%, calc(0.4 + var(--canvas-chaos) * 0.5)), transparent),
            radial-gradient(calc(2px + var(--canvas-energy) * 1px) calc(2px + var(--canvas-energy) * 1px) at 25% 85%,
              hsla(var(--canvas-hue), 90%, 80%, calc(0.3 + var(--canvas-chaos) * 0.4)), transparent),
            radial-gradient(calc(1px + var(--canvas-energy) * 1px) calc(1px + var(--canvas-energy) * 1px) at 85% 35%,
              hsla(var(--canvas-accent-hue), 80%, 90%, calc(0.35 + var(--canvas-chaos) * 0.45)), transparent),
            radial-gradient(calc(2px + var(--canvas-energy) * 2px) calc(2px + var(--canvas-energy) * 2px) at 45% 45%,
              hsla(var(--canvas-hue), 95%, 95%, calc(0.2 + var(--canvas-chaos) * 0.3)), transparent),
            radial-gradient(calc(1px + var(--canvas-energy) * 1px) calc(1px + var(--canvas-energy) * 1px) at 65% 75%,
              hsla(var(--canvas-accent-hue), 90%, 85%, calc(0.35 + var(--canvas-chaos) * 0.4)), transparent);
          background-size: calc(200px + var(--canvas-chaos) * 150px) calc(200px + var(--canvas-chaos) * 150px);
          animation: particles-float calc(15s / var(--canvas-energy)) linear infinite;
          opacity: calc(0.6 + var(--canvas-chaos) * 0.4);
        }

        @keyframes particles-float {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          100% {
            transform: translateY(-250px) translateX(80px) rotate(calc(var(--canvas-chaos) * 20deg));
          }
        }

        /* Secondary particle layer - larger, slower, opposite direction */
        .canvas-particles::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(calc(3px + var(--canvas-energy) * 2px) calc(3px + var(--canvas-energy) * 2px) at 10% 40%,
              hsla(var(--canvas-hue), 70%, 75%, calc(0.2 + var(--canvas-pulse) * 0.3)), transparent),
            radial-gradient(calc(4px + var(--canvas-energy) * 2px) calc(4px + var(--canvas-energy) * 2px) at 30% 80%,
              hsla(var(--canvas-accent-hue), 75%, 70%, calc(0.15 + var(--canvas-pulse) * 0.25)), transparent),
            radial-gradient(calc(3px + var(--canvas-energy) * 2px) calc(3px + var(--canvas-energy) * 2px) at 60% 30%,
              hsla(var(--canvas-hue), 65%, 80%, calc(0.2 + var(--canvas-pulse) * 0.3)), transparent),
            radial-gradient(calc(5px + var(--canvas-energy) * 2px) calc(5px + var(--canvas-energy) * 2px) at 80% 70%,
              hsla(var(--canvas-accent-hue), 70%, 75%, calc(0.15 + var(--canvas-pulse) * 0.25)), transparent),
            radial-gradient(calc(3px + var(--canvas-energy) * 2px) calc(3px + var(--canvas-energy) * 2px) at 50% 50%,
              hsla(var(--canvas-hue), 80%, 85%, calc(0.1 + var(--canvas-pulse) * 0.2)), transparent);
          background-size: calc(350px - var(--canvas-chaos) * 100px) calc(350px - var(--canvas-chaos) * 100px);
          animation: particles-drift calc(25s / var(--canvas-energy)) linear infinite reverse;
          opacity: calc(0.4 + var(--canvas-pulse) * 0.4);
        }

        @keyframes particles-drift {
          0% {
            transform: translateY(0) translateX(0) scale(1);
          }
          50% {
            transform: translateY(-150px) translateX(-50px) scale(calc(1 + var(--canvas-pulse) * 0.2));
          }
          100% {
            transform: translateY(-300px) translateX(-100px) scale(1);
          }
        }

        /* Glowing orbs layer - responds to pulse */
        .canvas-pulse {
          background:
            radial-gradient(
              circle at 30% 30%,
              hsla(var(--canvas-hue), var(--canvas-saturation), calc(var(--canvas-lightness) * 1.3), calc(var(--canvas-pulse) * 0.25)) 0%,
              transparent 30%
            ),
            radial-gradient(
              circle at 70% 60%,
              hsla(var(--canvas-accent-hue), var(--canvas-saturation), calc(var(--canvas-lightness) * 1.2), calc(var(--canvas-pulse) * 0.2)) 0%,
              transparent 25%
            ),
            radial-gradient(
              circle at 50% 80%,
              hsla(var(--canvas-hue), var(--canvas-saturation), var(--canvas-lightness), calc(var(--canvas-pulse) * 0.15)) 0%,
              transparent 35%
            );
          animation: pulse-breathe calc(3s / var(--canvas-energy)) ease-in-out infinite;
        }

        @keyframes pulse-breathe {
          0%, 100% {
            transform: scale(0.9);
            opacity: calc(0.4 + var(--canvas-pulse) * 0.3);
            filter: blur(0px);
          }
          50% {
            transform: scale(calc(1.1 + var(--canvas-pulse) * 0.2));
            opacity: calc(0.7 + var(--canvas-pulse) * 0.3);
            filter: blur(calc(var(--canvas-chaos) * 2px));
          }
        }

      `}</style>
    </div>
  );
}

