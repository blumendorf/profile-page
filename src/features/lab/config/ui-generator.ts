/**
 * UI Generator - Simplified flat config approach
 *
 * Instead of generating complex nested JSON, the model outputs
 * a simple flat style configuration. We then build the full
 * UI structure programmatically.
 *
 * This is MUCH easier for small models:
 * - ~50 tokens output vs 1000+
 * - No nesting to track
 * - Just picking from predefined options
 */

import type { LLMEngine, TokenCallback } from './llm';
import type { GeneratedUI, PageComponent, Color } from './ui-schema';
import { DEFAULT_UI } from './ui-schema';

// Profile data
const PROFILE = {
  name: "Dr Marco Blumendorf",
  title: "Director of Software Engineering",
  headline: "Building AI-first engineering teams",
  tags: ["Engineering", "Leadership", "AI First"],
};

// ============================================================================
// Flat Style Config (what the model outputs)
// ============================================================================

interface StyleConfig {
  style: 'terminal' | 'corporate' | 'minimal' | 'neon' | 'elegant' | 'playful';
  background: 'dark' | 'light' | 'gradient';
  accent: Color;
  font: 'mono' | 'sans' | 'serif';
  cardStyle: 'glass' | 'outline' | 'solid' | 'none';
  alignment: 'left' | 'center';
}

const DEFAULT_STYLE: StyleConfig = {
  style: 'terminal',
  background: 'dark',
  accent: 'amber',
  font: 'sans',
  cardStyle: 'glass',
  alignment: 'center',
};

// ============================================================================
// Simple prompt - model just fills in values
// ============================================================================

const SYSTEM_PROMPT = `Pick style options for a profile card. Output JSON only.

OPTIONS:
- style: terminal, corporate, minimal, neon, elegant, playful
- background: dark, light
- accent: amber, cyan, emerald, rose, purple, blue
- font: mono, sans, serif
- cardStyle: glass, outline, solid
- alignment: left, center

EXAMPLES:
"hacker vibe" → {"style":"terminal","background":"dark","accent":"cyan","font":"mono","cardStyle":"outline","alignment":"left"}
"professional" → {"style":"corporate","background":"light","accent":"blue","font":"sans","cardStyle":"solid","alignment":"center"}
"neon glow" → {"style":"neon","background":"dark","accent":"rose","font":"sans","cardStyle":"glass","alignment":"center"}
"clean minimal" → {"style":"minimal","background":"dark","accent":"slate","font":"sans","cardStyle":"none","alignment":"center"}

User wants:`;

// ============================================================================
// Build full UI from flat config
// ============================================================================

function buildUIFromConfig(config: StyleConfig): PageComponent {
  const { style, background, accent, font, cardStyle, alignment } = config;

  // Terminal-style prefix
  const terminalPrefix = style === 'terminal'
    ? { type: 'text' as const, content: '> whoami', variant: 'caption' as const, color: accent }
    : null;

  // Build the card content
  const cardChildren = [
    terminalPrefix,
    {
      type: 'heading' as const,
      level: 1 as const,
      text: PROFILE.name,
      align: alignment,
      gradient: style === 'neon' || style === 'elegant',
    },
    {
      type: 'text' as const,
      content: PROFILE.title,
      variant: 'lead' as const,
      color: accent,
      align: alignment,
    },
    style !== 'minimal' ? { type: 'divider' as const } : null,
    {
      type: 'text' as const,
      content: PROFILE.headline,
      color: 'muted' as const,
      align: alignment,
    },
    { type: 'spacer' as const, size: 'md' as const },
    {
      type: 'flex' as const,
      direction: 'row' as const,
      gap: 2,
      wrap: true,
      justify: alignment === 'center' ? 'center' as const : 'start' as const,
      children: PROFILE.tags.map(tag => ({
        type: 'badge' as const,
        text: tag,
        color: accent,
        variant: (style === 'terminal' ? 'outline' : style === 'corporate' ? 'subtle' : 'outline') as const,
      })),
    },
  ].filter(Boolean);

  // Wrap in card if needed
  const sectionChildren = cardStyle === 'none'
    ? [{
        type: 'flex' as const,
        direction: 'col' as const,
        align: alignment === 'center' ? 'center' as const : 'start' as const,
        gap: 4,
        children: cardChildren,
      }]
    : [{
        type: 'card' as const,
        variant: cardStyle,
        padding: 'lg' as const,
        rounded: style === 'corporate' ? 'xl' as const : 'lg' as const,
        shadow: style === 'corporate' ? 'lg' as const : undefined,
        children: [{
          type: 'flex' as const,
          direction: 'col' as const,
          align: alignment === 'center' ? 'center' as const : 'start' as const,
          gap: 4,
          children: cardChildren,
        }],
      }];

  return {
    type: 'page',
    theme: {
      background,
      accent,
      font,
    },
    layout: 'centered',
    children: [{
      type: 'section',
      padding: 'lg',
      variant: style === 'neon' ? 'gradient' : undefined,
      children: sectionChildren,
    }],
  };
}

// ============================================================================
// Parse model output
// ============================================================================

function parseStyleConfig(rawOutput: string): StyleConfig | null {
  try {
    // Extract JSON from output
    let json = rawOutput.trim();

    // Remove markdown code blocks
    const codeMatch = json.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeMatch) {
      json = codeMatch[1].trim();
    }

    // Find JSON object
    const jsonMatch = json.match(/\{[^{}]*\}/);
    if (!jsonMatch) return null;

    json = jsonMatch[0]
      .replace(/,\s*}/g, '}')
      // eslint-disable-next-line no-control-regex
      .replace(/[\x00-\x1F\x7F]/g, '');

    const parsed = JSON.parse(json) as Partial<StyleConfig>;

    // Validate and normalize
    const validStyles = ['terminal', 'corporate', 'minimal', 'neon', 'elegant', 'playful'] as const;
    const validBackgrounds = ['dark', 'light', 'gradient'] as const;
    const validAccents = ['amber', 'cyan', 'emerald', 'rose', 'purple', 'blue', 'slate', 'green', 'orange', 'red'] as const;
    const validFonts = ['mono', 'sans', 'serif'] as const;
    const validCardStyles = ['glass', 'outline', 'solid', 'none'] as const;
    const validAlignments = ['left', 'center'] as const;

    return {
      style: (validStyles as readonly string[]).includes(parsed.style ?? '') ? (parsed.style as StyleConfig['style']) : 'terminal',
      background: (validBackgrounds as readonly string[]).includes(parsed.background ?? '') ? (parsed.background as StyleConfig['background']) : 'dark',
      accent: (validAccents as readonly string[]).includes(parsed.accent ?? '') ? (parsed.accent as Color) : 'cyan',
      font: (validFonts as readonly string[]).includes(parsed.font ?? '') ? (parsed.font as StyleConfig['font']) : 'sans',
      cardStyle: (validCardStyles as readonly string[]).includes(parsed.cardStyle ?? '') ? (parsed.cardStyle as StyleConfig['cardStyle']) : 'glass',
      alignment: (validAlignments as readonly string[]).includes(parsed.alignment ?? '') ? (parsed.alignment as StyleConfig['alignment']) : 'center',
    };
  } catch (e) {
    console.error('[ui-generator] Failed to parse style config:', e);
    return null;
  }
}

// ============================================================================
// Keyword-based preset matching (instant, no model needed)
// ============================================================================

const KEYWORD_PRESETS: Record<string, Partial<StyleConfig>> = {
  // Terminal/hacker styles
  terminal: { style: 'terminal', background: 'dark', accent: 'cyan', font: 'mono', cardStyle: 'outline', alignment: 'left' },
  hacker: { style: 'terminal', background: 'dark', accent: 'cyan', font: 'mono', cardStyle: 'outline', alignment: 'left' },
  matrix: { style: 'terminal', background: 'dark', accent: 'emerald', font: 'mono', cardStyle: 'outline', alignment: 'left' },
  code: { style: 'terminal', background: 'dark', accent: 'cyan', font: 'mono', cardStyle: 'outline', alignment: 'left' },
  dev: { style: 'terminal', background: 'dark', accent: 'emerald', font: 'mono', cardStyle: 'outline', alignment: 'left' },

  // Corporate/professional
  corporate: { style: 'corporate', background: 'light', accent: 'blue', font: 'sans', cardStyle: 'solid', alignment: 'center' },
  professional: { style: 'corporate', background: 'light', accent: 'blue', font: 'sans', cardStyle: 'solid', alignment: 'center' },
  business: { style: 'corporate', background: 'light', accent: 'blue', font: 'sans', cardStyle: 'solid', alignment: 'center' },
  recruiter: { style: 'corporate', background: 'light', accent: 'amber', font: 'sans', cardStyle: 'solid', alignment: 'center' },

  // Minimal/clean
  minimal: { style: 'minimal', background: 'dark', accent: 'slate', font: 'sans', cardStyle: 'none', alignment: 'center' },
  simple: { style: 'minimal', background: 'dark', accent: 'slate', font: 'sans', cardStyle: 'none', alignment: 'center' },
  clean: { style: 'minimal', background: 'light', accent: 'slate', font: 'sans', cardStyle: 'none', alignment: 'center' },

  // Neon/vibrant
  neon: { style: 'neon', background: 'dark', accent: 'rose', font: 'sans', cardStyle: 'glass', alignment: 'center' },
  cyberpunk: { style: 'neon', background: 'dark', accent: 'purple', font: 'mono', cardStyle: 'glass', alignment: 'center' },
  glow: { style: 'neon', background: 'dark', accent: 'cyan', font: 'sans', cardStyle: 'glass', alignment: 'center' },
  vibrant: { style: 'neon', background: 'dark', accent: 'rose', font: 'sans', cardStyle: 'glass', alignment: 'center' },

  // Elegant/sophisticated
  elegant: { style: 'elegant', background: 'dark', accent: 'amber', font: 'serif', cardStyle: 'glass', alignment: 'center' },
  sophisticated: { style: 'elegant', background: 'dark', accent: 'amber', font: 'serif', cardStyle: 'glass', alignment: 'center' },
  luxury: { style: 'elegant', background: 'dark', accent: 'amber', font: 'serif', cardStyle: 'solid', alignment: 'center' },

  // Playful/fun
  playful: { style: 'playful', background: 'light', accent: 'rose', font: 'sans', cardStyle: 'solid', alignment: 'center' },
  fun: { style: 'playful', background: 'light', accent: 'purple', font: 'sans', cardStyle: 'solid', alignment: 'center' },
  creative: { style: 'playful', background: 'dark', accent: 'purple', font: 'sans', cardStyle: 'glass', alignment: 'center' },

  // Colors as keywords
  warm: { accent: 'amber', background: 'dark' },
  cool: { accent: 'cyan', background: 'dark' },
  red: { accent: 'rose' },
  green: { accent: 'emerald' },
  blue: { accent: 'blue' },
  purple: { accent: 'purple' },
  orange: { accent: 'orange' },
  pink: { accent: 'rose' },

  // Light/dark mode
  dark: { background: 'dark' },
  light: { background: 'light' },
};

function matchKeywords(intent: string): StyleConfig {
  const lower = intent.toLowerCase();
  const words = lower.split(/\s+/);

  // Start with default
  let config: StyleConfig = { ...DEFAULT_STYLE };

  // Check each word against presets
  for (const word of words) {
    const preset = KEYWORD_PRESETS[word];
    if (preset) {
      config = { ...config, ...preset };
    }
  }

  return config;
}

// ============================================================================
// Main generation function
// ============================================================================

export interface UIGenerationResult {
  rawOutput: string;
  ui: GeneratedUI;
  isValid: boolean;
  generationTimeMs: number;
  tokenCount: number;
  styleConfig?: StyleConfig;
}

export async function generateUIWithEngine(
  userIntent: string,
  engine: LLMEngine,
  onToken?: TokenCallback
): Promise<UIGenerationResult> {
  const startTime = Date.now();

  console.log('═══════════════════════════════════════════════════════════');
  console.log('[ui-generator] User Intent:', userIntent);

  // First, try keyword matching (instant result)
  const keywordConfig = matchKeywords(userIntent);
  const hasKeywordMatch = JSON.stringify(keywordConfig) !== JSON.stringify(DEFAULT_STYLE);

  if (hasKeywordMatch) {
    console.log('[ui-generator] ✓ Keyword match found:', keywordConfig);
    const ui = buildUIFromConfig(keywordConfig);

    return {
      rawOutput: `Keyword match: ${JSON.stringify(keywordConfig)}`,
      ui: {
        page: ui,
        meta: {
          prompt: userIntent,
          generatedAt: new Date().toISOString(),
          modelId: 'keyword-match',
          generationTimeMs: Date.now() - startTime,
        },
      },
      isValid: true,
      generationTimeMs: Date.now() - startTime,
      tokenCount: 0,
      styleConfig: keywordConfig,
    };
  }

  // No keyword match - use model
  console.log('[ui-generator] No keyword match, using model...');

  const prompt = `${SYSTEM_PROMPT} "${userIntent}"`;
  let tokenCount = 0;

  const wrappedOnToken: TokenCallback | undefined = onToken
    ? (token: string) => {
        tokenCount++;
        onToken(token);
      }
    : undefined;

  try {
    // Short max tokens since output is small
    const response = await engine.generate(prompt, { maxTokens: 150 }, wrappedOnToken);
    const duration = Date.now() - startTime;

    console.log('[ui-generator] Model output:', response);

    const styleConfig = parseStyleConfig(response);

    if (styleConfig) {
      console.log('[ui-generator] ✓ Parsed style config:', styleConfig);
      const ui = buildUIFromConfig(styleConfig);

      return {
        rawOutput: response,
        ui: {
          page: ui,
          meta: {
            prompt: userIntent,
            generatedAt: new Date().toISOString(),
            modelId: engine.getModelId(),
            generationTimeMs: duration,
            tokenCount,
          },
        },
        isValid: true,
        generationTimeMs: duration,
        tokenCount,
        styleConfig,
      };
    } else {
      // Fallback to keyword config (even if not different from default)
      console.log('[ui-generator] ✗ Could not parse model output, using keyword fallback');
      const ui = buildUIFromConfig(keywordConfig);

      return {
        rawOutput: response,
        ui: {
          page: ui,
          meta: {
            prompt: userIntent,
            generatedAt: new Date().toISOString(),
            modelId: engine.getModelId(),
            generationTimeMs: duration,
            tokenCount,
          },
        },
        isValid: false,
        generationTimeMs: duration,
        tokenCount,
        styleConfig: keywordConfig,
      };
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('[ui-generator] ❌ Generation failed:', error);

    return {
      rawOutput: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      ui: {
        ...DEFAULT_UI,
        meta: {
          prompt: userIntent,
          generatedAt: new Date().toISOString(),
          modelId: 'fallback',
          generationTimeMs: duration,
        },
      },
      isValid: false,
      generationTimeMs: duration,
      tokenCount: 0,
    };
  }
}

// Export for backward compatibility
export function matchPreset(intent: string): PageComponent | null {
  const config = matchKeywords(intent);
  if (JSON.stringify(config) !== JSON.stringify(DEFAULT_STYLE)) {
    return buildUIFromConfig(config);
  }
  return null;
}

export const UI_PRESETS = {
  terminal: buildUIFromConfig(KEYWORD_PRESETS.terminal as StyleConfig),
  corporate: buildUIFromConfig(KEYWORD_PRESETS.corporate as StyleConfig),
  minimal: buildUIFromConfig(KEYWORD_PRESETS.minimal as StyleConfig),
  neon: buildUIFromConfig(KEYWORD_PRESETS.neon as StyleConfig),
};
