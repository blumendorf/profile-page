# The Lab

> Source of truth for the `/lab` experiments hub.

## Purpose

The Lab is a **general-purpose space for experiments and writeups**-things I'm tinkering with, exploring, or documenting. Some ideas turn into real projects, others stay as notes on what I've learned along the way.

Not tied to any specific theme-it's simply where I put things I'm working on outside of main projects.

## Main Page Section

The Lab has its own section on the main profile page (`#lab`), positioned above Contact:
- Brief description of the Lab's purpose
- "Explore the Lab" link to `/lab`

Data lives in `profile.json` under the `lab` key. Component: `src/features/home/sections/Lab.tsx`.

---

## Experiment Independence Principle

**Each experiment should be completely self-dependent**, except for:
1. **Reusable UI components** (see `shared/components/`: DownloadProgress, ModelSelector, CrossTabWarning, ExperimentCard, BackLink, Pill, EmptyState, ErrorPanel, InfoPanel, SelectField, SliderField, StatusDot, TabList, StatsBar, etc.)
2. **Infrastructure needed for the Labs section in general** (cross-tab coordination)

This means:
- Each experiment has its own `llm/` folder containing all LLM-related code
- Experiments can evolve independently without breaking others
- An experiment can use a different subset of models or different generation configs
- Deleting an experiment doesn't affect other experiments

---

## Structure

```
src/features/lab/
├── lab.md              # This documentation file
├── LabIndex.tsx        # Hub listing all experiments
├── index.ts            # Exports
├── shared/             # ONLY shared UI, hooks, and utils
│   ├── components/           # Reusable UI (folder-per-component: `Name/Name.tsx`, `Name.stories.tsx`, `index.ts`)
│   │   ├── DownloadProgress/ …
│   │   ├── ModelSelector/ …
│   │   ├── CrossTabWarning/ …
│   │   ├── ExperimentCard/ …
│   │   ├── BackLink/ …
│   │   ├── Pill/ …
│   │   ├── EmptyState/ …
│   │   ├── ErrorPanel/ …
│   │   ├── InfoPanel/ …
│   │   ├── SelectField/ …
│   │   ├── SliderField/ …
│   │   ├── StatusDot/ …
│   │   ├── TabList/ …
│   │   ├── StatsBar/ …
│   │   └── index.ts
│   ├── hooks/                # Reusable hooks
│   │   ├── useCrossTabModel.ts   # Hook for cross-tab state
│   │   └── index.ts
│   ├── utils/                # Utility functions
│   │   ├── cross-tab-state.ts    # Cross-tab coordination logic
│   │   └── index.ts
│   └── index.ts
│
├── config/             # Config Generator experiment
│   ├── llm/                  # Experiment's own LLM infrastructure
│   │   ├── types.ts          # LLMEngine interface, GenerationConfig
│   │   ├── models.ts         # Available models for this experiment
│   │   ├── compatibility.ts  # WebGPU detection
│   │   ├── webllm-engine.ts  # WebLLM implementation
│   │   ├── transformers-engine.ts
│   │   ├── factory.ts        # createEngine(), localStorage helpers
│   │   └── index.ts
│   ├── ConfigLanding.tsx
│   ├── ConfigPlayground.tsx
│   ├── ui-generator.ts
│   ├── ui-schema.ts
│   ├── UIRenderer.tsx
│   └── index.ts
│
├── html/               # HTML Generator experiment
│   ├── llm/                  # Experiment's own LLM infrastructure
│   │   └── ... (same structure)
│   ├── HTMLLanding.tsx
│   ├── HTMLPlayground.tsx
│   ├── HTMLPreview.tsx
│   ├── html-generator.ts
│   └── index.ts
│
├── canvas/             # Living Canvas experiment
│   ├── llm/                  # Experiment's own LLM infrastructure
│   │   └── ... (same structure)
│   ├── CanvasLanding.tsx
│   ├── CanvasPlayground.tsx
│   ├── canvas-interpreter.ts
│   └── index.ts
│
└── eval/               # Prompt evaluation experiment
    ├── llm/                  # Experiment's own LLM infrastructure
    │   └── ... (simplified - no localStorage)
    ├── EvalPlayground.tsx
    ├── test-cases.ts
    ├── constraint-checker.ts
    └── index.ts
```

---

## Experiments

The `/lab` hub (`LabIndex.tsx`) uses **border-only** experiment cards (`bg-transparent`) on `bg-page`. Denser lab chrome (inputs, modals, panels) uses `bg-surface` / `bg-card` — not a separate `page-elevated` token.

### 1. Config Generator (`/lab/config`)

**Status:** Active
**Approach:** JSON UI Language - AI generates structured JSON that renders via React

Inspired by Google Research's [Generative UI paper](https://generativeui.github.io/), this experiment uses a JSON-based UI language that's easier for small local models to produce reliably. The model generates a JSON structure describing UI components, which a React renderer interprets into visual output.

**JSON UI Language Components:**
- `page` - Root container with theme (background, accent, font) and layout
- `section` - Groups related content with variants (elevated, bordered, gradient)
- `card` - Elevated content container (glass, outline, solid variants)
- `flex` / `grid` - Layout components
- `heading`, `text` - Typography
- `badge`, `list`, `divider`, `spacer`, `icon` - Supporting elements

**Model Selection:** Users can choose from multiple models before starting.

**Files:**
- `config/llm/` - Experiment's own LLM infrastructure
- `config/ConfigLanding.tsx` - Experiment intro with model selection
- `config/ConfigPlayground.tsx` - Main experiment with preview/JSON editor
- `config/ui-schema.ts` - TypeScript types for the JSON UI Language
- `config/ui-generator.ts` - Prompt engineering for JSON generation
- `config/UIRenderer.tsx` - Converts JSON to React components

**Legacy Files (deprecated):**
- `config/ConfigAdaptive.tsx` - Old config approach
- `config/ConfigProfile.tsx` - Old renderer
- `config/config-generator.ts` - Old generator
- `config/ui-config.ts` - Old schema

---

### 2. HTML Generator (`/lab/html`)

**Status:** Active
**Approach:** AI generates CSS that styles a fixed HTML template

The AI generates CSS styles based on the user's style description. These styles are injected into a predefined HTML template and rendered in a sandboxed iframe.

**Model Selection:** Users can choose from multiple models before starting:
- WebLLM (MLC): SmolLM 360M (default), SmolLM 1.7B, Llama 3.2 1B, Phi 3.5 Mini
- Transformers.js (ONNX): Qwen 2.5 0.5B, Gemma 3 270M/1B, Mistral 3B

**How it works:**
1. User selects a model on the landing page
2. User describes a style (e.g., "dark terminal hacker aesthetic")
3. System checks for preset matches (instant results for known keywords)
4. If no preset match, AI generates CSS using few-shot examples
5. CSS is injected into the HTML template
6. Result renders live in a sandboxed iframe

**Files:**
- `html/llm/` - Experiment's own LLM infrastructure
- `html/HTMLLanding.tsx` - Experiment intro with model selection & compatibility check
- `html/HTMLPlayground.tsx` - Main experiment with iframe preview
- `html/HTMLPreview.tsx` - Sandboxed iframe component
- `html/html-generator.ts` - CSS generation with presets and AI fallback

**Safety:**
- Iframe uses `sandbox="allow-scripts"` (no parent frame access)
- Content via `srcdoc` (no external network requests)

---

### 3. Living Canvas (`/lab/canvas`)

**Status:** Active
**Approach:** Ambient visual experience driven by AI-generated mood phrases

An ever-changing, breathing visual canvas where the AI continuously generates short atmospheric phrases. These phrases are interpreted (not executed) to control colors, animation speeds, and visual chaos.

**Key Insight:** Small models excel at evocative phrases-they don't need to follow complex instructions. The system interprets their output fuzzy-matches for colors, energy levels, and moods. "Wrong" outputs become artistic surprises.

**How it works:**
1. Model continuously generates short phrases (e.g., "warm sunset calm flowing")
2. Interpreter extracts: colors (→ hue), energy (→ animation speed), chaos (→ particle behavior)
3. Canvas state smoothly blends toward the interpreted values
4. Phrases appear as floating text, then fade
5. User can optionally nudge the direction ("warmer", "more chaotic")

**Canvas State Variables:**
- `hue` (0-360): Primary color
- `saturation` (0-100%): Color intensity
- `lightness` (0-100%): Brightness
- `accentHue`: Complementary color
- `energy` (0.2-3): Animation speed multiplier
- `chaos` (0-1): Particle randomness
- `pulse` (0-1): Breathing animation intensity

**Files:**
- `canvas/llm/` - Experiment's own LLM infrastructure
- `canvas/CanvasLanding.tsx` - Experiment intro with model selection
- `canvas/CanvasPlayground.tsx` - Main ambient canvas experience
- `canvas/canvas-interpreter.ts` - Color/mood/energy word mappings & state blending

**Design Philosophy:**
- Interpretation over execution: model output is parsed, not run as code
- Graceful degradation: unrecognized words are ignored, no errors
- Continuous generation: the experience is meant to run indefinitely
- Smooth transitions: state changes blend over time, never jarring

---

### 4. UI/UX design in AI-assisted engineering (`/lab/design-and-ai`)

**Status:** Active
**Approach:** Seven-part long-form research series, read linearly via prev/next navigation

A research log on what changes in UI/UX work when AI agents become first-class readers and writers of the same files humans produce. The experiment runs on this site itself. Each part is its own URL but the experience is one continuous long-read; readers move through the series with the prev/next nav rendered above and below every part.

**Series order:**
1. `/lab/design-and-ai` — UI/UX design in the age of AI-assisted engineering (intro / framing)
2. `/lab/design-and-ai/design-md` — DESIGN.md: history and 2026 reframing
3. `/lab/design-and-ai/storybook` — Storybook as verification layer and agent registry
4. `/lab/design-and-ai/components-and-tokens` — Components and design tokens
5. `/lab/design-and-ai/figma-jobs` — Removing Figma: the four jobs it was bundling
6. `/lab/design-and-ai/tools` — Tools for AI-assisted UI work, surveyed
7. `/lab/design-and-ai/workflow` — The 2026 workflow

The static Storybook workshop at `/storybook/` is unchanged. It is referenced from inside Part 3 where it earns its place, not promoted on the Lab index.

**Files:**
- `design-and-ai/design-and-ai.md` — feature doc (purpose, structure, how to add a part)
- `design-and-ai/parts/*.md` — markdown source of truth for the seven parts
- `design-and-ai/parts/index.ts` — ordered series manifest with raw markdown imports
- `design-and-ai/SeriesPart/SeriesPart.tsx` — shell that renders any part: header strip, markdown body, footer prev/next cards
- `design-and-ai/SeriesNav/SeriesNav.tsx` — compact and card variants of the prev/next pair
- `design-and-ai/pages/*.tsx` — one thin wrapper per route

---

## Per-Experiment LLM Infrastructure

Each experiment has its own `llm/` folder containing:

| File | Purpose |
|------|---------|
| `types.ts` | `LLMEngine` interface, `GenerationConfig`, callbacks |
| `models.ts` | Available models for this experiment |
| `compatibility.ts` | WebGPU detection |
| `webllm-engine.ts` | WebLLM (MLC) implementation |
| `transformers-engine.ts` | Transformers.js (ONNX) implementation |
| `factory.ts` | `createEngine()` factory + localStorage helpers |
| `index.ts` | Re-exports for convenient imports |

### Usage

```typescript
// Import from experiment's own llm/ folder
import { createEngine, getSavedModelId, getModelConfig } from './llm';

// Get user's selected model from localStorage
const modelId = getSavedModelId();
const config = getModelConfig(modelId);

// Create engine for the selected model
const engine = createEngine(modelId);

// Initialize with progress callback
await engine.initialize((progress) => {
  console.log(progress.stage, progress.progress, progress.text);
});

// Generate text with config
const output = await engine.generate(prompt, {
  maxTokens: 600,
  temperature: 0.25,
  topP: 0.9,
  stop: ['</html>'],
});

// Cleanup when done
await engine.dispose();
```

### Available Models

| ID | Name | Backend | Size | Download | Memory |
|----|------|---------|------|----------|--------|
| `smollm-360m` | SmolLM (360M) | webllm | 360M | ~500MB | 4GB |
| `smollm-1.7b` | SmolLM (1.7B) | webllm | 1.7B | ~1GB | 4GB |
| `llama-1b` | Llama 3.2 (1B) | webllm | 1B | ~700MB | 4GB |
| `phi-3.5` | Phi 3.5 Mini | webllm | 3.8B | ~2GB | 6GB |
| `qwen-0.5b` | Qwen 2.5 (0.5B) | transformers | 0.5B | ~300MB | 2GB |
| `gemma-270m` | Gemma 3 (270M) | transformers | 270M | ~200MB | 2GB |
| `gemma-1b` | Gemma 3 (1B) | transformers | 1B | ~600MB | 4GB |
| `llama-3.2-1b-onnx` | Llama 3.2 (1B) ONNX | transformers | 1B | ~700MB | 4GB |

---

## Shared Infrastructure (`/lab/shared`)

The shared folder contains reusable UI components, hooks, and utils:

### UI Components (`/lab/shared/components`)

| File | Purpose |
|------|---------|
| `DownloadProgress.tsx` | Model download progress overlay UI |
| `ModelSelector.tsx` | Model selection dropdown (accepts `models` prop) |
| `CrossTabWarning.tsx` | Warning banner when another tab is using a model |

### Hooks (`/lab/shared/hooks`)

| File | Purpose |
|------|---------|
| `useCrossTabModel.ts` | React hook for cross-tab model state management |

### Utils (`/lab/shared/utils`)

| File | Purpose |
|------|---------|
| `cross-tab-state.ts` | Cross-tab coordination via BroadcastChannel + localStorage |

### Cross-Tab Coordination

The playgrounds coordinate model state across browser tabs/windows to warn users about concurrent usage:

- **BroadcastChannel**: Real-time cross-tab communication
- **localStorage**: Persistence and fallback for older browsers
- **Heartbeat**: Tabs send heartbeats every 10s; stale tabs are cleaned up after 30s
- **Status tracking**: `idle` → `loading` → `ready` → `generating` → back to `ready`

Usage in playground components:

```tsx
import { CrossTabWarning } from '../shared/components';
import { useCrossTabModel } from '../shared/hooks';

const {
  isModelInUseByOtherTab,
  otherTabInfo,
  updateStatus,
  warningDismissed,
  dismissWarning,
} = useCrossTabModel();

// Update status during model lifecycle
updateStatus('loading', modelId);
updateStatus('ready', modelId);
updateStatus('generating', modelId);
updateStatus('idle', ''); // on unmount
```

---

## Technical Requirements

- **WebGPU:** Chrome 113+, Edge 113+, Safari 18+
- **Memory:** 2-6GB+ available (depends on model)
- **Model:** User-selected, cached after first load
- **Generation:** ~2-10 seconds after model loaded (varies by model size)

---

## Adding New Experiments

1. Create a new folder: `src/features/lab/{experiment-name}/`
2. Create `llm/` subfolder with the experiment's LLM infrastructure (copy from existing experiment)
3. Add landing page explaining the experiment
4. Add main experiment page
5. Add any generators or utilities the experiment needs
6. Create `index.ts` to export the experiment's components
7. Register routes in `src/main.tsx`
8. Add experiment card to `LabIndex.tsx`
9. **Update this document** with the new experiment details

**Remember:** Each experiment should be self-contained with its own `llm/` folder!

---

## Route Structure

```
/lab                      → LabIndex (experiments hub)
/lab/config               → ConfigLanding (with model selection)
/lab/config/playground    → ConfigPlayground
/lab/html                 → HTMLLanding (with model selection)
/lab/html/playground      → HTMLPlayground
/lab/canvas               → CanvasLanding (with model selection)
/lab/canvas/playground    → CanvasPlayground
/lab/design-and-ai                          → DesignAndAi · Part 1 (intro)
/lab/design-and-ai/design-md                → DesignAndAi · Part 2
/lab/design-and-ai/storybook                → DesignAndAi · Part 3
/lab/design-and-ai/components-and-tokens    → DesignAndAi · Part 4
/lab/design-and-ai/figma-jobs               → DesignAndAi · Part 5
/lab/design-and-ai/tools                    → DesignAndAi · Part 6
/lab/design-and-ai/workflow                 → DesignAndAi · Part 7
/storybook/                                 → Static Storybook visual workshop
```

---

*Last updated: 2026-04-27*
