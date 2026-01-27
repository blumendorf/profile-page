# Dr Marco Blumendorf – Personal Profile

A personal profile website with an "Engineer's Notebook" aesthetic, featuring interactive elements and browser-based AI experiments.

**[View Live Site →](https://blumendorf.github.io/profile-page)**

## Features

- **Warm, Personal Design** – Earth tones with amber accents, monospace typography, generous whitespace
- **Interactive Profile Ring** – Mouse-tracking conic gradient animation around the profile image
- **JSON View Mode** – Developer easter egg that displays profile data as an interactive API response
- **Animated Network Background** – Canvas-based constellation effect with mouse proximity interactions
- **Dark/Light Theme** – System-aware with manual toggle and localStorage persistence
- **The Lab** – A collection of browser-based AI experiments using local LLMs

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 + Vite 6 |
| Language | TypeScript 5.7+ |
| Styling | Tailwind CSS v4 |
| Animation | Motion |
| Icons | Lucide React |
| Routing | React Router v7 |
| Testing | Vitest, Testing Library, Playwright |
| Deployment | GitHub Pages |

## Project Structure

```
src/
├── components/ui/         # Shared UI primitives
├── features/
│   ├── home/              # Landing page components
│   │   └── components/    # Hero, About, Timeline, Contact, etc.
│   ├── lab/               # AI experiments
│   │   ├── html/          # HTML/CSS generator experiment
│   │   ├── eval/          # Prompt evaluation playground
│   │   ├── compare/       # Compare views experiment
│   │   └── shared/        # Shared lab infrastructure
│   └── shared/            # Cross-feature hooks & contexts
├── lib/
│   ├── data/              # Profile data (profile.json)
│   └── utils/             # Utility functions
└── main.tsx               # Router configuration
```

## The Lab

The Lab (`/lab`) is a collection of browser-based AI experiments exploring what's possible with local LLMs running entirely in the browser via WebGPU.

### Experiments

| Experiment | Description |
|------------|-------------|
| **HTML Generator** | AI generates CSS styles for a fixed HTML template based on user descriptions |
| **Eval Playground** | Test and compare prompt variants against constraint-based evaluations |
| **Compare Views** | Side-by-side comparison tools |

### Local LLM Infrastructure

Each experiment includes its own LLM infrastructure supporting multiple backends:

- **WebLLM (MLC)** – SmolLM 360M/1.7B, Llama 3.2 1B, Phi 3.5 Mini
- **Transformers.js (ONNX)** – Qwen 2.5 0.5B, Gemma 3 270M/1B

**Requirements:** Chrome 113+ or Edge 113+ with WebGPU support, 2-6GB available memory.

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Run unit tests
pnpm test

# Run E2E tests (requires dev server running)
pnpm test:e2e

# Lint & type check
pnpm lint

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### E2E & Visual Regression Tests

E2E tests use Playwright and include visual regression testing to catch unintended design changes.

**Test files:**
- `e2e/homepage.spec.ts` – Homepage sections
- `e2e/navigation.spec.ts` – Navigation behavior
- `e2e/responsive.spec.ts` – Responsive layouts
- `e2e/accessibility.spec.ts` – Accessibility checks
- `e2e/visual-regression.spec.ts` – Screenshot comparisons

**Updating snapshots after UI changes:**

When you intentionally change the design, update the baseline screenshots:

```bash
pnpm test:e2e:update-snapshots
```

Review the updated images in `e2e/snapshots/` before committing to ensure changes are intentional.

## AI-Assisted Development

This project was built through AI-assisted development using Cursor IDE with Claude. The workflow demonstrates human-AI collaboration where:

- **AI** handles implementation details, code generation, and technical problem-solving
- **Human** provides direction, design decisions, and final review

The `agent-context/` directory serves as the source of truth for content and design, ensuring consistency between AI-generated code and project requirements.

## API

Profile data is exposed as a public JSON endpoint:

```
GET /api/v1/profile.json
```

This same data powers the JSON View mode in the UI.

## License

MIT

---

Built with ☕ in Brandenburg, Germany
