import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface IntentInputProps {
  onGenerate: (intent: string) => void;
  isGenerating: boolean;
  disabled: boolean;
  lastGenerationTime?: number;
}

const SUGGESTIONS = [
  "I'm a technical recruiter looking for React developers",
  "I'm an engineer curious about the tech stack",
  "I'm a startup founder looking for a CTO",
  "Just browsing, show me the highlights",
];

export function IntentInput({ onGenerate, isGenerating, disabled, lastGenerationTime }: IntentInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isGenerating && !disabled) {
      onGenerate(input.trim());
    }
  };

  return (
    <div className="sticky top-0 z-30 bg-page/95 backdrop-blur-sm border-b border-border-subtle">
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What brings you here? (e.g., 'I'm hiring for a senior React role')"
            disabled={disabled || isGenerating}
            className="flex-1 bg-page-elevated border border-border-subtle rounded-lg px-4 py-3
                       text-text-primary placeholder:text-text-muted
                       focus:outline-none focus:border-accent transition-colors
                       disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={disabled || isGenerating || !input.trim()}
            className="px-6 py-3 bg-accent text-bg-page rounded-lg font-semibold
                       flex items-center gap-2 hover:bg-accent/90 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            {isGenerating ? 'Generating...' : 'Adapt UI'}
          </button>
        </form>

        {/* Quick suggestions */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-text-muted text-sm">Try:</span>
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setInput(suggestion);
                onGenerate(suggestion);
              }}
              disabled={disabled || isGenerating}
              className="text-sm px-3 py-1 rounded-full border border-border-subtle
                         hover:border-accent hover:text-accent transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {suggestion.length > 35 ? suggestion.slice(0, 35) + '...' : suggestion}
            </button>
          ))}
        </div>

        {/* Generation time indicator */}
        {lastGenerationTime && (
          <div className="text-xs text-text-muted mt-2 font-mono">
            Last generation: {(lastGenerationTime / 1000).toFixed(1)}s
          </div>
        )}
      </div>
    </div>
  );
}

