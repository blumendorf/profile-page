/**
 * JSON UI Language Schema
 *
 * A declarative UI language for Generative UI experiments.
 * The model generates JSON according to this schema, and a renderer
 * converts it to React components.
 *
 * Design principles:
 * - Simple enough for small models to generate reliably
 * - Flexible enough to create visually interesting UIs
 * - Maps cleanly to React/Tailwind components
 * - Supports theming and layout variations
 */

// ============================================================================
// Base Types
// ============================================================================

/** Available component types */
export type ComponentType =
  | 'page'
  | 'section'
  | 'card'
  | 'heading'
  | 'text'
  | 'list'
  | 'badge'
  | 'divider'
  | 'spacer'
  | 'grid'
  | 'flex'
  | 'icon';

/** Text alignment options */
export type TextAlign = 'left' | 'center' | 'right';

/** Size variants */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Color palette - matches Tailwind colors */
export type Color =
  | 'amber'
  | 'cyan'
  | 'emerald'
  | 'rose'
  | 'purple'
  | 'blue'
  | 'red'
  | 'orange'
  | 'green'
  | 'slate'
  | 'zinc'
  | 'white'
  | 'black';

/** Spacing values */
export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;

// ============================================================================
// Component Definitions
// ============================================================================

/** Base component interface */
interface BaseComponent {
  type: ComponentType;
  id?: string;
}

/** Page - root container */
export interface PageComponent extends BaseComponent {
  type: 'page';
  theme: {
    background: 'dark' | 'light' | 'gradient';
    accent: Color;
    font: 'sans' | 'mono' | 'serif';
  };
  layout: 'centered' | 'full-width' | 'sidebar';
  children: UIComponent[];
}

/** Section - groups related content */
export interface SectionComponent extends BaseComponent {
  type: 'section';
  variant?: 'default' | 'elevated' | 'bordered' | 'gradient';
  padding?: Size;
  children: UIComponent[];
}

/** Card - elevated content container */
export interface CardComponent extends BaseComponent {
  type: 'card';
  variant?: 'default' | 'glass' | 'outline' | 'solid';
  padding?: Size;
  rounded?: Size;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  children: UIComponent[];
}

/** Heading - text headings h1-h6 */
export interface HeadingComponent extends BaseComponent {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  align?: TextAlign;
  color?: Color | 'inherit' | 'muted';
  gradient?: boolean;
}

/** Text - paragraphs and inline text */
export interface TextComponent extends BaseComponent {
  type: 'text';
  content: string;
  variant?: 'body' | 'lead' | 'small' | 'caption';
  align?: TextAlign;
  color?: Color | 'inherit' | 'muted';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

/** List - bulleted or numbered lists */
export interface ListComponent extends BaseComponent {
  type: 'list';
  variant?: 'bullet' | 'number' | 'check' | 'none';
  items: string[];
  spacing?: Size;
}

/** Badge - small labels/tags */
export interface BadgeComponent extends BaseComponent {
  type: 'badge';
  text: string;
  color?: Color;
  variant?: 'solid' | 'outline' | 'subtle';
  size?: 'sm' | 'md';
}

/** Divider - horizontal rule */
export interface DividerComponent extends BaseComponent {
  type: 'divider';
  variant?: 'solid' | 'dashed' | 'dotted';
  color?: Color | 'muted';
}

/** Spacer - vertical spacing */
export interface SpacerComponent extends BaseComponent {
  type: 'spacer';
  size: Size;
}

/** Grid - CSS grid layout */
export interface GridComponent extends BaseComponent {
  type: 'grid';
  cols?: 1 | 2 | 3 | 4;
  gap?: Size | number;
  children: UIComponent[];
}

/** Flex - flexbox layout */
export interface FlexComponent extends BaseComponent {
  type: 'flex';
  direction?: 'row' | 'col';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  align?: 'start' | 'center' | 'end' | 'stretch';
  gap?: Size | number;
  wrap?: boolean;
  children: UIComponent[];
}

/** Icon - decorative icon (from predefined set) */
export interface IconComponent extends BaseComponent {
  type: 'icon';
  name: 'user' | 'mail' | 'code' | 'briefcase' | 'star' | 'heart' | 'check' | 'arrow' | 'sparkle';
  size?: Size;
  color?: Color;
}

/** Union type of all components */
export type UIComponent =
  | PageComponent
  | SectionComponent
  | CardComponent
  | HeadingComponent
  | TextComponent
  | ListComponent
  | BadgeComponent
  | DividerComponent
  | SpacerComponent
  | GridComponent
  | FlexComponent
  | IconComponent;

// ============================================================================
// Generation Result
// ============================================================================

export interface GeneratedUI {
  /** The root page component */
  page: PageComponent;
  /** Metadata about generation */
  meta: {
    prompt: string;
    generatedAt: string;
    modelId: string;
    generationTimeMs: number;
    tokenCount?: number;
  };
}

// ============================================================================
// Default / Example UI
// ============================================================================

export const DEFAULT_UI: GeneratedUI = {
  page: {
    type: 'page',
    theme: {
      background: 'dark',
      accent: 'amber',
      font: 'sans',
    },
    layout: 'centered',
    children: [
      {
        type: 'section',
        padding: 'lg',
        children: [
          {
            type: 'card',
            variant: 'glass',
            padding: 'lg',
            rounded: 'lg',
            children: [
              {
                type: 'flex',
                direction: 'col',
                align: 'center',
                gap: 4,
                children: [
                  {
                    type: 'heading',
                    level: 1,
                    text: 'Dr Marco Blumendorf',
                    align: 'center',
                  },
                  {
                    type: 'text',
                    content: 'Director of Software Engineering',
                    variant: 'lead',
                    color: 'amber',
                    align: 'center',
                  },
                  {
                    type: 'text',
                    content: 'Building AI-first engineering teams',
                    variant: 'body',
                    color: 'muted',
                    align: 'center',
                  },
                  {
                    type: 'spacer',
                    size: 4,
                  },
                  {
                    type: 'flex',
                    direction: 'row',
                    gap: 2,
                    wrap: true,
                    justify: 'center',
                    children: [
                      { type: 'badge', text: 'Engineering', color: 'amber', variant: 'outline' },
                      { type: 'badge', text: 'Leadership', color: 'amber', variant: 'outline' },
                      { type: 'badge', text: 'AI First', color: 'amber', variant: 'outline' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  meta: {
    prompt: '',
    generatedAt: new Date().toISOString(),
    modelId: 'default',
    generationTimeMs: 0,
  },
};

// ============================================================================
// Validation
// ============================================================================

const VALID_COMPONENT_TYPES: ComponentType[] = [
  'page', 'section', 'card', 'heading', 'text', 'list', 'badge',
  'divider', 'spacer', 'grid', 'flex', 'icon'
];

/**
 * Validates a component structure, returning a cleaned version
 */
export function validateComponent(component: unknown): UIComponent | null {
  if (!component || typeof component !== 'object') return null;

  const comp = component as Record<string, unknown>;
  if (!VALID_COMPONENT_TYPES.includes(comp.type as ComponentType)) {
    return null;
  }

  // Recursively validate children if present
  if ('children' in comp && Array.isArray(comp.children)) {
    comp.children = comp.children
      .map(child => validateComponent(child))
      .filter((c): c is UIComponent => c !== null);
  }

  return comp as UIComponent;
}

/**
 * Validates a full GeneratedUI structure
 */
export function validateGeneratedUI(ui: unknown): GeneratedUI | null {
  if (!ui || typeof ui !== 'object') return null;

  const parsed = ui as Record<string, unknown>;

  // Check for page
  if (!parsed.page || typeof parsed.page !== 'object') return null;

  const page = validateComponent(parsed.page);
  if (!page || page.type !== 'page') return null;

  return {
    page,
    meta: {
      prompt: '',
      generatedAt: new Date().toISOString(),
      modelId: 'unknown',
      generationTimeMs: 0,
      ...(typeof parsed.meta === 'object' && parsed.meta !== null ? (parsed.meta) : {}),
    },
  } as GeneratedUI;
}

