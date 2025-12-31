# The Lab

> Source of truth for the `/lab` experiments hub.

## Purpose

The Lab is a **general-purpose space for experiments and writeups**—things I'm tinkering with, exploring, or documenting. Some ideas turn into real projects, others stay as notes on what I've learned along the way.

Not tied to any specific theme—it's simply where I put things I'm working on outside of main projects.

## Main Page Section

The Lab has its own section on the main profile page (`#lab`), positioned above Contact:
- Brief description of the Lab's purpose
- "Explore the Lab" link to `/lab`

Data lives in `profile.json` under the `lab` key. Component: `src/components/Lab.tsx`.

## Structure

Each experiment is **self-contained** in its own folder:

```
src/pages/lab/
├── lab.md              # This documentation file
├── LabIndex.tsx        # Hub listing all experiments
├── index.ts            # Exports
├── shared/             # Shared infrastructure for all experiments
│   ├── models/         # Multi-model abstraction layer
│   │   ├── engine-interface.ts  # LLMEngine interface
│   │   ├── config.ts            # Model registry & metadata
│   │   ├── webllm-engine.ts     # WebLLM (MLC) implementation
│   │   ├── transformers-engine.ts # Transformers.js implementation
│   │   ├── factory.ts           # createEngine() factory
│   │   └── index.ts
│   ├── engine.ts           # Backward-compatible default engine
│   ├── compatibility.ts    # WebGPU detection
│   ├── DownloadProgress.tsx # Model download UI (dynamic size)
│   ├── ModelSelector.tsx   # Model selection dropdown
│   └── index.ts
├── config/             # Config Generator experiment (self-contained)
│   ├── ConfigLanding.tsx
│   ├── ConfigAdaptive.tsx
│   ├── ConfigProfile.tsx
│   ├── config-generator.ts
│   ├── config-schema.json
│   ├── IntentInput.tsx
│   ├── ui-config.ts
│   └── index.ts
└── html/               # HTML Generator experiment (self-contained)
    ├── HTMLLanding.tsx     # Landing with model selection
    ├── HTMLPlayground.tsx  # Main experiment (uses selected model)
    ├── HTMLPreview.tsx
    ├── html-generator.ts
    └── index.ts
```

---

## Experiments

### 1. Config Generator (`/lab/config`)

**Status:** Active
**Approach:** React-based profile with AI-generated JSON configuration

The AI model runs in-browser via WebGPU and generates a JSON config that controls:
- Theme (terminal, warm, minimal, default)
- Colors (amber, cyan, emerald, rose)
- Typography (mono, sans, mixed)
- Content variant (technical vs non-technical)

**Simplified scope:** Hero section + Contact section only.

**Files:**
- `config/ConfigLanding.tsx` - Experiment intro with compatibility check
- `config/ConfigAdaptive.tsx` - Main experiment page
- `config/ConfigProfile.tsx` - Renders Hero + Contact based on config
- `config/config-generator.ts` - Prompt engineering for config generation
- `config/ui-config.ts` - TypeScript types and defaults
- `config/IntentInput.tsx` - User input component with suggestions

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
- `html/HTMLLanding.tsx` - Experiment intro with model selection & compatibility check
- `html/HTMLPlayground.tsx` - Main experiment with iframe preview
- `html/HTMLPreview.tsx` - Sandboxed iframe component
- `html/html-generator.ts` - CSS generation with presets and AI fallback

**Safety:**
- Iframe uses `sandbox="allow-scripts"` (no parent frame access)
- Content via `srcdoc` (no external network requests)

---

## Multi-Model Abstraction (`/lab/shared/models`)

The lab supports multiple LLM backends through a unified abstraction layer.

### Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                         UI Layer                              │
│  ┌─────────────┐  ┌─────────────────┐  ┌─────────────────┐   │
│  │ HTMLLanding │──│ ModelSelector   │  │ DownloadProgress │  │
│  └─────────────┘  └─────────────────┘  └─────────────────┘   │
│         │                 │                    ▲              │
│         │                 │                    │              │
│         ▼                 ▼                    │              │
│  ┌─────────────┐  ┌─────────────────┐         │              │
│  │HTMLPlayground│──│ createEngine() │─────────┘              │
│  └─────────────┘  └─────────────────┘                        │
└──────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                     Abstraction Layer                         │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                     LLMEngine Interface                  │ │
│  │  initialize(), generate(), isReady(), dispose()          │ │
│  └─────────────────────────────────────────────────────────┘ │
│         ▲                                     ▲               │
│         │                                     │               │
│  ┌──────────────────┐              ┌──────────────────────┐  │
│  │  WebLLMEngine    │              │  TransformersEngine  │  │
│  │  (@mlc-ai/web-llm)│             │ (@huggingface/       │  │
│  │                  │              │  transformers)       │  │
│  └──────────────────┘              └──────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
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

### Usage

```typescript
import { createEngine, getSavedModelId, getModelConfig } from '../shared';

// Get user's selected model from localStorage
const modelId = getSavedModelId();
const config = getModelConfig(modelId);

// Create engine for the selected model
const engine = createEngine(modelId);

// Initialize with progress callback
await engine.initialize((progress) => {
  console.log(progress.stage, progress.progress, progress.text);
});

// Generate text
const output = await engine.generate(prompt, maxTokens);

// Cleanup when done
await engine.dispose();
```

### Key Files

| File | Purpose |
|------|---------|
| `models/engine-interface.ts` | `LLMEngine` interface all backends implement |
| `models/config.ts` | Model registry with metadata (size, memory, etc.) |
| `models/webllm-engine.ts` | WebLLM implementation using @mlc-ai/web-llm |
| `models/transformers-engine.ts` | Transformers.js implementation |
| `models/factory.ts` | `createEngine()` factory + localStorage helpers |

---

## Shared Infrastructure (`/lab/shared`)

| File | Purpose |
|------|---------|
| `engine.ts` | Backward-compatible default engine singleton |
| `compatibility.ts` | WebGPU detection and memory estimation |
| `DownloadProgress.tsx` | Model download progress overlay UI (accepts `downloadSizeGB` prop) |
| `ModelSelector.tsx` | Model selection dropdown with details |

---

## Technical Requirements

- **WebGPU:** Chrome 113+, Edge 113+, Safari 18+
- **Memory:** 2-6GB+ available (depends on model)
- **Model:** User-selected, cached after first load
- **Generation:** ~2-10 seconds after model loaded (varies by model size)

---

## Adding New Experiments

1. Create a new folder: `src/pages/lab/{experiment-name}/`
2. Include ALL experiment-specific files in that folder (self-contained)
3. Add landing page explaining the experiment
4. Add main experiment page
5. Add any generators or utilities the experiment needs
6. Create `index.ts` to export the experiment's components
7. Register routes in `src/main.tsx`
8. Add experiment card to `LabIndex.tsx`
9. **Update this document** with the new experiment details

---

## Route Structure

```
/lab                      → LabIndex (experiments hub)
/lab/config               → ConfigLanding
/lab/config/adaptive      → ConfigAdaptive
/lab/html                 → HTMLLanding (with model selection)
/lab/html/playground      → HTMLPlayground
```

---

*Last updated: 2024-12-31*
