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
│   ├── engine.ts       # WebLLM singleton (model lifecycle)
│   ├── compatibility.ts # WebGPU detection
│   ├── DownloadProgress.tsx # Model download UI
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
    ├── HTMLLanding.tsx
    ├── HTMLPlayground.tsx
    ├── HTMLPreview.tsx
    ├── html-generator.ts
    └── index.ts
```

---

## Experiments

### 1. Config Generator (`/lab/config`)

**Status:** Active
**Approach:** React-based profile with AI-generated JSON configuration

The AI model (SmolLM 360M, ~500MB) runs in-browser via WebGPU and generates a JSON config that controls:
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

**How it works:**
1. User describes a style (e.g., "dark terminal hacker aesthetic")
2. System checks for preset matches (instant results for known keywords)
3. If no preset match, AI generates CSS using few-shot examples
4. CSS is injected into the HTML template
5. Result renders live in a sandboxed iframe

**Files:**
- `html/HTMLLanding.tsx` - Experiment intro with compatibility check
- `html/HTMLPlayground.tsx` - Main experiment with iframe preview
- `html/HTMLPreview.tsx` - Sandboxed iframe component
- `html/html-generator.ts` - CSS generation with presets and AI fallback

**Safety:**
- Iframe uses `sandbox="allow-scripts"` (no parent frame access)
- Content via `srcdoc` (no external network requests)

---

## Shared Infrastructure (`/lab/shared`)

| File | Purpose |
|------|---------|
| `engine.ts` | WebLLM singleton (model download, initialization, generation) |
| `compatibility.ts` | WebGPU detection and memory estimation |
| `DownloadProgress.tsx` | Model download progress overlay UI |

---

## Technical Requirements

- **WebGPU:** Chrome 113+, Edge 113+, Safari 18+
- **Memory:** 4GB+ available
- **Model:** SmolLM2-360M-Instruct (~500MB download, cached after first load)
- **Generation:** ~2-4 seconds after model loaded (presets are instant)

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
/lab/html                 → HTMLLanding
/lab/html/playground      → HTMLPlayground
```

---

*Last updated: 2024-12-31*

