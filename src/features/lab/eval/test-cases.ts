/**
 * Test cases for HTML generator evaluation
 */

export type HueRange = [number, number]; // [min, max] in degrees 0-360
export type Luminance = 'dark' | 'light' | 'black' | 'white';
export type FontCategory = 'monospace' | 'serif' | 'sans-serif';

export type Constraint =
  | { type: 'bgHue'; range: HueRange }
  | { type: 'bgLuminance'; value: Luminance }
  | { type: 'textHue'; range: HueRange }
  | { type: 'textLuminance'; value: Luminance }
  | { type: 'accentHue'; selector: string; range: HueRange }
  | { type: 'fontFamily'; category: FontCategory }
  | { type: 'cssContains'; pattern: string }
  | { type: 'cssNotContains'; pattern: string };

export interface TestCase {
  id: string;
  intent: string;
  constraints: Constraint[];
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Hue ranges for colors (in degrees, 0-360)
const HUE = {
  RED: [340, 20] as HueRange,      // Wraps around 0
  ORANGE: [20, 45] as HueRange,
  YELLOW: [45, 70] as HueRange,
  GREEN: [80, 160] as HueRange,
  CYAN: [160, 200] as HueRange,
  BLUE: [200, 260] as HueRange,
  PURPLE: [260, 320] as HueRange,
  PINK: [320, 350] as HueRange,
};

export const TEST_CASES: TestCase[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // Category 1: Background Color (Hue) - Easy
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'bg-green',
    intent: 'green background',
    constraints: [{ type: 'bgHue', range: HUE.GREEN }],
    category: 'bg-hue',
    difficulty: 'easy',
  },
  {
    id: 'bg-blue',
    intent: 'blue background',
    constraints: [{ type: 'bgHue', range: HUE.BLUE }],
    category: 'bg-hue',
    difficulty: 'easy',
  },
  {
    id: 'bg-red',
    intent: 'red background',
    constraints: [{ type: 'bgHue', range: HUE.RED }],
    category: 'bg-hue',
    difficulty: 'easy',
  },
  {
    id: 'bg-purple',
    intent: 'purple background',
    constraints: [{ type: 'bgHue', range: HUE.PURPLE }],
    category: 'bg-hue',
    difficulty: 'easy',
  },
  {
    id: 'bg-orange',
    intent: 'orange background',
    constraints: [{ type: 'bgHue', range: HUE.ORANGE }],
    category: 'bg-hue',
    difficulty: 'easy',
  },
  {
    id: 'bg-yellow',
    intent: 'yellow background',
    constraints: [{ type: 'bgHue', range: HUE.YELLOW }],
    category: 'bg-hue',
    difficulty: 'easy',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Category 2: Background Luminance - Easy
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'bg-dark',
    intent: 'dark background',
    constraints: [{ type: 'bgLuminance', value: 'dark' }],
    category: 'bg-lum',
    difficulty: 'easy',
  },
  {
    id: 'bg-light',
    intent: 'light background',
    constraints: [{ type: 'bgLuminance', value: 'light' }],
    category: 'bg-lum',
    difficulty: 'easy',
  },
  {
    id: 'bg-black',
    intent: 'black background',
    constraints: [{ type: 'bgLuminance', value: 'black' }],
    category: 'bg-lum',
    difficulty: 'easy',
  },
  {
    id: 'bg-white',
    intent: 'white background',
    constraints: [{ type: 'bgLuminance', value: 'white' }],
    category: 'bg-lum',
    difficulty: 'easy',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Category 3: Text Color (Hue) - Easy
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'text-green',
    intent: 'green text color',
    constraints: [{ type: 'textHue', range: HUE.GREEN }],
    category: 'text-hue',
    difficulty: 'easy',
  },
  {
    id: 'text-blue',
    intent: 'blue text color',
    constraints: [{ type: 'textHue', range: HUE.BLUE }],
    category: 'text-hue',
    difficulty: 'easy',
  },
  {
    id: 'text-red',
    intent: 'red text',
    constraints: [{ type: 'textHue', range: HUE.RED }],
    category: 'text-hue',
    difficulty: 'easy',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Category 4: Text Luminance - Easy
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'text-light',
    intent: 'light colored text',
    constraints: [{ type: 'textLuminance', value: 'light' }],
    category: 'text-lum',
    difficulty: 'easy',
  },
  {
    id: 'text-dark',
    intent: 'dark colored text',
    constraints: [{ type: 'textLuminance', value: 'dark' }],
    category: 'text-lum',
    difficulty: 'easy',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Category 5: Accent Color - Medium
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'accent-green',
    intent: 'green accent color for title',
    constraints: [{ type: 'accentHue', selector: '.title', range: HUE.GREEN }],
    category: 'accent',
    difficulty: 'medium',
  },
  {
    id: 'accent-blue',
    intent: 'blue accent color',
    constraints: [{ type: 'accentHue', selector: '.title', range: HUE.BLUE }],
    category: 'accent',
    difficulty: 'medium',
  },
  {
    id: 'accent-purple',
    intent: 'purple accent color',
    constraints: [{ type: 'accentHue', selector: '.title', range: HUE.PURPLE }],
    category: 'accent',
    difficulty: 'medium',
  },
  {
    id: 'accent-orange',
    intent: 'orange accent color',
    constraints: [{ type: 'accentHue', selector: '.title', range: HUE.ORANGE }],
    category: 'accent',
    difficulty: 'medium',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Category 6: Font Family - Easy
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'font-mono',
    intent: 'monospace font',
    constraints: [{ type: 'fontFamily', category: 'monospace' }],
    category: 'font',
    difficulty: 'easy',
  },
  {
    id: 'font-serif',
    intent: 'serif font',
    constraints: [{ type: 'fontFamily', category: 'serif' }],
    category: 'font',
    difficulty: 'easy',
  },
  {
    id: 'font-sans',
    intent: 'sans-serif font',
    constraints: [{ type: 'fontFamily', category: 'sans-serif' }],
    category: 'font',
    difficulty: 'easy',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Category 7: Structural CSS - Easy
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'has-gradient',
    intent: 'gradient background',
    constraints: [{ type: 'cssContains', pattern: 'gradient' }],
    category: 'structure',
    difficulty: 'easy',
  },
  {
    id: 'has-shadow',
    intent: 'with box shadow',
    constraints: [{ type: 'cssContains', pattern: 'box-shadow' }],
    category: 'structure',
    difficulty: 'easy',
  },
  {
    id: 'has-rounded',
    intent: 'rounded corners',
    constraints: [{ type: 'cssContains', pattern: 'border-radius' }],
    category: 'structure',
    difficulty: 'easy',
  },
  {
    id: 'has-border',
    intent: 'visible border',
    constraints: [{ type: 'cssContains', pattern: 'border' }],
    category: 'structure',
    difficulty: 'easy',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Category 8: Combined Tests - Medium
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'terminal',
    intent: 'terminal hacker style',
    constraints: [
      { type: 'bgLuminance', value: 'dark' },
      { type: 'textHue', range: HUE.GREEN },
      { type: 'fontFamily', category: 'monospace' },
    ],
    category: 'combined',
    difficulty: 'medium',
  },
  {
    id: 'corporate',
    intent: 'professional corporate style',
    constraints: [
      { type: 'bgLuminance', value: 'light' },
      { type: 'fontFamily', category: 'sans-serif' },
    ],
    category: 'combined',
    difficulty: 'medium',
  },
  {
    id: 'dark-gradient',
    intent: 'dark theme with gradient',
    constraints: [
      { type: 'bgLuminance', value: 'dark' },
      { type: 'cssContains', pattern: 'gradient' },
    ],
    category: 'combined',
    difficulty: 'medium',
  },
  {
    id: 'minimal-white',
    intent: 'clean minimal white design',
    constraints: [
      { type: 'bgLuminance', value: 'white' },
      { type: 'fontFamily', category: 'sans-serif' },
    ],
    category: 'combined',
    difficulty: 'medium',
  },
  {
    id: 'warm-serif',
    intent: 'warm and friendly with serif font',
    constraints: [
      { type: 'bgHue', range: [20, 60] }, // Orange to yellow range
      { type: 'fontFamily', category: 'serif' },
    ],
    category: 'combined',
    difficulty: 'medium',
  },
  {
    id: 'ocean-blue',
    intent: 'ocean blue theme',
    constraints: [
      { type: 'bgHue', range: HUE.BLUE },
      { type: 'cssContains', pattern: 'gradient' },
    ],
    category: 'combined',
    difficulty: 'medium',
  },
];

// Export test cases grouped by difficulty
export const EASY_TESTS = TEST_CASES.filter((t) => t.difficulty === 'easy');
export const MEDIUM_TESTS = TEST_CASES.filter((t) => t.difficulty === 'medium');
export const HARD_TESTS = TEST_CASES.filter((t) => t.difficulty === 'hard');

// Export test cases grouped by category
export const getTestsByCategory = (category: string) =>
  TEST_CASES.filter((t) => t.category === category);

