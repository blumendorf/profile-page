/**
 * Canvas state that drives the visual experience
 */
export interface CanvasState {
  /** Primary hue (0-360) */
  hue: number;
  /** Saturation (0-100) */
  saturation: number;
  /** Lightness (0-100) */
  lightness: number;
  /** Secondary/accent hue */
  accentHue: number;
  /** Energy level affecting animation speed (0.2-3) */
  energy: number;
  /** Chaos level affecting particle behavior (0-1) */
  chaos: number;
  /** Pulse intensity for breathing animations (0-1) */
  pulse: number;
  /** Current mood phrase from the model */
  currentPhrase: string;
}

export const DEFAULT_CANVAS_STATE: CanvasState = {
  hue: 200,
  saturation: 70,
  lightness: 50,
  accentHue: 280,
  energy: 1,
  chaos: 0.3,
  pulse: 0.5,
  currentPhrase: '',
};

/**
 * Color word mappings to HSL values
 * Fuzzy matching - we look for these words anywhere in the output
 */
const COLOR_MAP: Record<string, { hue: number; saturation?: number; lightness?: number }> = {
  // Blues
  ocean: { hue: 200, saturation: 80 },
  sea: { hue: 195, saturation: 75 },
  sky: { hue: 210, saturation: 60, lightness: 60 },
  blue: { hue: 220 },
  azure: { hue: 210, saturation: 100 },
  navy: { hue: 230, saturation: 70, lightness: 30 },
  teal: { hue: 180, saturation: 60 },
  cyan: { hue: 185, saturation: 80 },
  aqua: { hue: 175, saturation: 70 },
  ice: { hue: 195, saturation: 30, lightness: 85 },

  // Greens
  forest: { hue: 140, saturation: 50, lightness: 35 },
  green: { hue: 130 },
  emerald: { hue: 150, saturation: 70 },
  mint: { hue: 160, saturation: 50, lightness: 70 },
  lime: { hue: 90, saturation: 70 },
  nature: { hue: 120, saturation: 40 },
  grass: { hue: 100, saturation: 60 },
  jungle: { hue: 130, saturation: 60, lightness: 30 },

  // Warm colors
  sunset: { hue: 30, saturation: 90 },
  sunrise: { hue: 35, saturation: 85, lightness: 60 },
  orange: { hue: 25, saturation: 90 },
  amber: { hue: 40, saturation: 85 },
  golden: { hue: 45, saturation: 80, lightness: 55 },
  gold: { hue: 50, saturation: 85, lightness: 50 },
  yellow: { hue: 55, saturation: 85 },
  warm: { hue: 35, saturation: 70 },
  fire: { hue: 15, saturation: 95 },
  flame: { hue: 20, saturation: 90 },

  // Reds/Pinks
  red: { hue: 0, saturation: 80 },
  crimson: { hue: 348, saturation: 85 },
  rose: { hue: 340, saturation: 60 },
  pink: { hue: 330, saturation: 70 },
  coral: { hue: 16, saturation: 75 },
  salmon: { hue: 10, saturation: 65, lightness: 65 },

  // Purples
  purple: { hue: 280 },
  violet: { hue: 270, saturation: 70 },
  lavender: { hue: 260, saturation: 50, lightness: 70 },
  plum: { hue: 290, saturation: 50, lightness: 40 },
  magenta: { hue: 300, saturation: 80 },
  berry: { hue: 310, saturation: 65 },
  grape: { hue: 275, saturation: 60 },

  // Neutrals/Special
  night: { hue: 240, saturation: 30, lightness: 15 },
  midnight: { hue: 230, saturation: 40, lightness: 20 },
  dark: { hue: 220, saturation: 20, lightness: 15 },
  shadow: { hue: 240, saturation: 15, lightness: 25 },
  storm: { hue: 220, saturation: 30, lightness: 35 },
  silver: { hue: 210, saturation: 10, lightness: 75 },
  snow: { hue: 200, saturation: 15, lightness: 95 },
  white: { hue: 0, saturation: 0, lightness: 95 },
  neon: { hue: 180, saturation: 100, lightness: 55 },
  electric: { hue: 190, saturation: 95, lightness: 50 },
  cosmic: { hue: 260, saturation: 70, lightness: 35 },
  space: { hue: 250, saturation: 50, lightness: 20 },
  rainbow: { hue: Math.random() * 360, saturation: 80 },
};

/**
 * Energy/speed word mappings (multiplier for animation speed)
 */
const ENERGY_MAP: Record<string, number> = {
  // Very calm
  still: 0.2,
  frozen: 0.2,
  static: 0.25,
  quiet: 0.3,
  peaceful: 0.35,
  serene: 0.4,
  calm: 0.5,
  gentle: 0.5,
  soft: 0.55,
  slow: 0.5,
  relaxed: 0.6,
  lazy: 0.4,
  dreamy: 0.45,

  // Moderate
  flowing: 0.8,
  steady: 0.9,
  smooth: 0.85,
  normal: 1.0,
  balanced: 1.0,
  moderate: 1.0,

  // Energetic
  active: 1.3,
  lively: 1.4,
  dynamic: 1.5,
  vibrant: 1.6,
  energetic: 1.7,
  fast: 1.8,
  quick: 1.7,
  rapid: 2.0,

  // Very energetic
  intense: 2.2,
  wild: 2.5,
  chaotic: 2.8,
  frantic: 3.0,
  electric: 2.3,
  explosive: 2.8,
  pulsing: 1.8,
  beating: 1.6,
};

/**
 * Chaos/randomness word mappings (0-1)
 */
const CHAOS_MAP: Record<string, number> = {
  // Ordered
  ordered: 0.1,
  structured: 0.15,
  geometric: 0.2,
  minimal: 0.15,
  clean: 0.2,
  precise: 0.1,

  // Moderate
  organic: 0.4,
  natural: 0.45,
  flowing: 0.5,
  fluid: 0.5,
  random: 0.6,

  // Chaotic
  chaotic: 0.8,
  wild: 0.85,
  scattered: 0.7,
  turbulent: 0.9,
  stormy: 0.75,
  explosive: 0.95,
  glitchy: 0.8,
  distorted: 0.7,
};

/**
 * Pulse/breathing intensity mappings (0-1)
 */
const PULSE_MAP: Record<string, number> = {
  // Low pulse
  still: 0.1,
  static: 0.15,
  flat: 0.1,

  // Moderate
  breathing: 0.5,
  pulsing: 0.6,
  beating: 0.65,
  living: 0.5,
  alive: 0.55,

  // High pulse
  throbbing: 0.8,
  pumping: 0.85,
  intense: 0.9,
  strong: 0.75,
};

/**
 * Interpret raw model output and extract canvas state changes
 * Uses fuzzy matching - any matching word in the output counts
 */
export function interpretMood(
  rawOutput: string
): Partial<CanvasState> {
  const text = rawOutput.toLowerCase();
  const changes: Partial<CanvasState> = {
    currentPhrase: rawOutput.trim(),
  };

  // Find color matches
  for (const [word, color] of Object.entries(COLOR_MAP)) {
    if (text.includes(word)) {
      changes.hue = color.hue;
      if (color.saturation !== undefined) {
        changes.saturation = color.saturation;
      }
      if (color.lightness !== undefined) {
        changes.lightness = color.lightness;
      }
      // Set accent hue to complementary
      changes.accentHue = (color.hue + 180) % 360;
      break; // Use first match
    }
  }

  // Find energy matches
  for (const [word, energy] of Object.entries(ENERGY_MAP)) {
    if (text.includes(word)) {
      changes.energy = energy;
      break;
    }
  }

  // Find chaos matches
  for (const [word, chaos] of Object.entries(CHAOS_MAP)) {
    if (text.includes(word)) {
      changes.chaos = chaos;
      break;
    }
  }

  // Find pulse matches
  for (const [word, pulse] of Object.entries(PULSE_MAP)) {
    if (text.includes(word)) {
      changes.pulse = pulse;
      break;
    }
  }

  return changes;
}

/**
 * Smoothly blend from current state to target state
 */
export function blendState(
  current: CanvasState,
  target: Partial<CanvasState>,
  factor: number = 0.15
): CanvasState {
  return {
    hue: lerp(current.hue, target.hue ?? current.hue, factor),
    saturation: lerp(current.saturation, target.saturation ?? current.saturation, factor),
    lightness: lerp(current.lightness, target.lightness ?? current.lightness, factor),
    accentHue: lerp(current.accentHue, target.accentHue ?? current.accentHue, factor),
    energy: lerp(current.energy, target.energy ?? current.energy, factor),
    chaos: lerp(current.chaos, target.chaos ?? current.chaos, factor),
    pulse: lerp(current.pulse, target.pulse ?? current.pulse, factor),
    currentPhrase: target.currentPhrase ?? current.currentPhrase,
  };
}

/**
 * Linear interpolation
 */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Extract detected keywords from model output
 * Returns a summary of what was detected
 */
export function extractKeywords(rawOutput: string): string[] {
  const text = rawOutput.toLowerCase();
  const keywords: string[] = [];

  // Check for color words
  for (const word of Object.keys(COLOR_MAP)) {
    if (text.includes(word)) {
      keywords.push(word);
      break;
    }
  }

  // Check for energy words
  for (const word of Object.keys(ENERGY_MAP)) {
    if (text.includes(word)) {
      keywords.push(word);
      break;
    }
  }

  // Check for chaos words
  for (const word of Object.keys(CHAOS_MAP)) {
    if (text.includes(word)) {
      keywords.push(word);
      break;
    }
  }

  return keywords;
}

/**
 * Simple prompts for the model to complete
 * Framed as word associations to avoid "helpful assistant" mode
 */
export const MOOD_PROMPTS = [
  'blue, ocean, calm,',
  'red, fire, warm,',
  'green, forest, peaceful,',
  'purple, cosmic, mysterious,',
  'orange, sunset, golden,',
  'cyan, electric, neon,',
  'pink, soft, gentle,',
  'dark, midnight, quiet,',
  'bright, energetic, vibrant,',
  'gray, stormy, turbulent,',
  'yellow, sunny, cheerful,',
  'teal, tropical, flowing,',
  'amber, autumn, cozy,',
  'silver, moonlight, serene,',
  'emerald, nature, fresh,',
  'crimson, intense, passionate,',
];

/**
 * Get a random mood prompt
 */
export function getRandomPrompt(): string {
  return MOOD_PROMPTS[Math.floor(Math.random() * MOOD_PROMPTS.length)];
}

/**
 * Build prompt with optional user nudge
 * Uses word association style to avoid assistant-mode responses
 */
export function buildPrompt(userNudge?: string): string {
  const base = getRandomPrompt();
  if (userNudge?.trim()) {
    // Prepend user's words to the association chain
    return `${userNudge.trim()}, ${base}`;
  }
  return base;
}

