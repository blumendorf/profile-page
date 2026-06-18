import type { Meta, StoryObj } from '@storybook/react-vite';
import { DownloadProgress, ModelSelector, type ModelConfig } from './shared/components';
import { CrossTabIndicator, CrossTabWarning } from './shared/components/CrossTabWarning';
import type { OtherTabInfo } from './shared/hooks/useCrossTabModel';
import { ModelSelectorModal } from './html/components/ModelSelectorModal';
import { HTMLPreview } from './html/HTMLPreview';
import { LogPanel } from './html/LogPanel';
import type { LogEntry } from './html/log-utils';
import { PersonaProvider } from './compare/PersonaContext';
import { SplitView } from './compare/components/SplitView';

const meta = {
  title: 'Lab/Existing Visuals',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleModels: ModelConfig[] = [
  {
    id: 'smollm-360m',
    name: 'SmolLM (360M)',
    backend: 'webllm',
    modelId: 'SmolLM2-360M-Instruct-q4f16_1-MLC',
    size: '360M',
    downloadSize: '~500MB',
    downloadSizeGB: 0.5,
    memoryRequired: 4,
    description: 'Fast and lightweight, good for quick tests',
  },
  {
    id: 'qwen-0.5b',
    name: 'Qwen 2.5 (0.5B)',
    backend: 'transformers',
    modelId: 'onnx-community/Qwen2.5-0.5B-Instruct',
    size: '0.5B',
    downloadSize: '~300MB',
    downloadSizeGB: 0.3,
    memoryRequired: 2,
    description: 'Small ONNX model for constrained devices',
    recommended: true,
  },
];

const otherTab: OtherTabInfo = {
  tabId: 'story-tab',
  modelId: 'qwen-0.5b',
  status: 'generating',
};

const logs: LogEntry[] = [
  {
    id: 'log-1',
    timestamp: new Date('2026-04-26T07:45:00'),
    level: 'info',
    message: 'Creating engine for Qwen 2.5...',
  },
  {
    id: 'log-2',
    timestamp: new Date('2026-04-26T07:45:03'),
    level: 'success',
    message: 'Model ready for generation',
  },
  {
    id: 'log-3',
    timestamp: new Date('2026-04-26T07:45:08'),
    level: 'warn',
    message: 'Generation used a preset fallback',
  },
];

const sampleHtml = `
<!doctype html>
<html>
  <head>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: Inter, system-ui, sans-serif;
        background: radial-gradient(circle at top, #164e63, #0f172a);
        color: white;
      }
      main {
        max-width: 28rem;
        padding: 2rem;
        border: 1px solid rgba(255,255,255,.2);
        border-radius: 1rem;
        background: rgba(15,23,42,.72);
      }
    </style>
  </head>
  <body>
    <main>
      <p>Browser AI: HTML</p>
      <h1>Generated preview shell</h1>
    </main>
  </body>
</html>
`;

export const DownloadProgressDownloading: Story = {
  render: () => (
    <DownloadProgress
      stage="downloading"
      progress={46}
      text="Downloading shard 3 of 7..."
      downloadSizeGB={0.5}
      modelName="SmolLM (360M)"
      onCancel={() => undefined}
    />
  ),
};

export const ModelSelectorDefault: Story = {
  render: () => (
    <div className="min-h-screen bg-page p-8">
      <div className="max-w-xl">
        <ModelSelector
          models={sampleModels}
          selectedModelId="qwen-0.5b"
          onModelChange={() => undefined}
        />
      </div>
    </div>
  ),
};

export const CrossTabWarningDefault: Story = {
  render: () => (
    <div className="min-h-screen bg-page p-8">
      <div className="max-w-2xl space-y-6">
        <CrossTabWarning otherTab={otherTab} dismissed={false} onDismiss={() => undefined} />
        <CrossTabIndicator otherTab={otherTab} />
      </div>
    </div>
  ),
};

export const ModelSelectorModalOpen: Story = {
  render: () => (
    <ModelSelectorModal
      isOpen
      models={sampleModels}
      currentModelId="qwen-0.5b"
      onClose={() => undefined}
      onLoadModel={() => undefined}
    />
  ),
};

export const HTMLPreviewDefault: Story = {
  render: () => (
    <div className="min-h-screen bg-page p-8">
      <HTMLPreview html={sampleHtml} className="h-[560px]" />
    </div>
  ),
};

export const LogPanelDefault: Story = {
  render: () => (
    <div className="min-h-screen bg-page p-8">
      <LogPanel logs={logs} className="h-64" />
    </div>
  ),
};

export const SplitViewDefault: Story = {
  render: () => (
    <PersonaProvider>
      <div className="min-h-screen bg-page p-8">
        <SplitView
          className="min-h-[360px]"
          nonTechnicalContent={
            <div className="rounded-xl border border-border-subtle bg-page-elevated p-8">
              <p className="section-label mb-4">// non-technical</p>
              <h2 className="heading-md mb-3">Outcome-focused narrative</h2>
              <p className="text-body">
                Built teams, shipped products, and connected business goals with engineering delivery.
              </p>
            </div>
          }
          technicalContent={
            <div className="rounded-xl border border-cyan-500/40 bg-cyan-950/30 p-8">
              <p className="font-mono text-sm text-cyan-400 mb-4">// technical</p>
              <h2 className="heading-md mb-3">Architecture-focused narrative</h2>
              <p className="text-body">
                React, TypeScript, Python, LLM integrations, and codebases designed for AI-assisted work.
              </p>
            </div>
          }
        />
      </div>
    </PersonaProvider>
  ),
};
