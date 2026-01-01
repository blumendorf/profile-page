/**
 * UIRenderer - Converts JSON UI Language to React components
 *
 * Takes a GeneratedUI structure and renders it as React components
 * with Tailwind CSS styling.
 */

import { cn } from '@/lib/utils';
import {
  User,
  Mail,
  Code2,
  Briefcase,
  Star,
  Heart,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import type {
  UIComponent,
  PageComponent,
  SectionComponent,
  CardComponent,
  HeadingComponent,
  TextComponent,
  ListComponent,
  BadgeComponent,
  DividerComponent,
  SpacerComponent,
  GridComponent,
  FlexComponent,
  IconComponent,
  Color,
  Size,
  GeneratedUI,
} from './ui-schema';

// ============================================================================
// Utility mappings
// ============================================================================

const colorMap: Record<Color, { text: string; bg: string; border: string }> = {
  amber: { text: 'text-amber-500', bg: 'bg-amber-500', border: 'border-amber-500' },
  cyan: { text: 'text-cyan-500', bg: 'bg-cyan-500', border: 'border-cyan-500' },
  emerald: { text: 'text-emerald-500', bg: 'bg-emerald-500', border: 'border-emerald-500' },
  rose: { text: 'text-rose-500', bg: 'bg-rose-500', border: 'border-rose-500' },
  purple: { text: 'text-purple-500', bg: 'bg-purple-500', border: 'border-purple-500' },
  blue: { text: 'text-blue-500', bg: 'bg-blue-500', border: 'border-blue-500' },
  red: { text: 'text-red-500', bg: 'bg-red-500', border: 'border-red-500' },
  orange: { text: 'text-orange-500', bg: 'bg-orange-500', border: 'border-orange-500' },
  green: { text: 'text-green-500', bg: 'bg-green-500', border: 'border-green-500' },
  slate: { text: 'text-slate-500', bg: 'bg-slate-500', border: 'border-slate-500' },
  zinc: { text: 'text-zinc-500', bg: 'bg-zinc-500', border: 'border-zinc-500' },
  white: { text: 'text-white', bg: 'bg-white', border: 'border-white' },
  black: { text: 'text-black', bg: 'bg-black', border: 'border-black' },
};

const spacingMap: Record<Size, string> = {
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
  '2xl': 'p-12',
};

// Gap mapping supports both Size strings and numbers for backward compatibility
const gapMap: Record<string | number, string> = {
  // Size-based gaps
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
  // Numeric gaps (for backward compatibility)
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
  16: 'gap-16',
};

const roundedMap: Record<Size, string> = {
  xs: 'rounded-sm',
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
};

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  user: User,
  mail: Mail,
  code: Code2,
  briefcase: Briefcase,
  star: Star,
  heart: Heart,
  check: Check,
  arrow: ArrowRight,
  sparkle: Sparkles,
};

// ============================================================================
// Component Renderers
// ============================================================================

function RenderPage({ component, children }: { component: PageComponent; children: React.ReactNode }) {
  const { theme, layout } = component;

  const bgClasses = {
    dark: 'bg-[#0a0a0a] text-white',
    light: 'bg-[#fafafa] text-slate-900',
    gradient: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white',
  };

  const fontClasses = {
    sans: 'font-sans',
    mono: 'font-mono',
    serif: 'font-serif',
  };

  const layoutClasses = {
    centered: 'flex flex-col items-center justify-center min-h-screen',
    'full-width': 'min-h-screen',
    sidebar: 'min-h-screen grid grid-cols-[250px_1fr]',
  };

  return (
    <div
      className={cn(
        bgClasses[theme.background],
        fontClasses[theme.font],
        layoutClasses[layout],
        'p-4 md:p-8'
      )}
      style={{ '--accent-color': colorMap[theme.accent]?.text.replace('text-', '') } as React.CSSProperties}
    >
      <div className={layout === 'centered' ? 'w-full max-w-2xl' : 'w-full'}>
        {children}
      </div>
    </div>
  );
}

function RenderSection({ component, children }: { component: SectionComponent; children: React.ReactNode }) {
  const variantClasses = {
    default: '',
    elevated: 'bg-white/5 backdrop-blur',
    bordered: 'border border-white/10',
    gradient: 'bg-gradient-to-r from-white/5 to-transparent',
  };

  return (
    <section
      className={cn(
        variantClasses[component.variant || 'default'],
        spacingMap[component.padding || 'md'],
        'rounded-lg'
      )}
    >
      {children}
    </section>
  );
}

function RenderCard({ component, children }: { component: CardComponent; children: React.ReactNode }) {
  const variantClasses = {
    default: 'bg-white/5',
    glass: 'bg-white/5 backdrop-blur-md border border-white/10',
    outline: 'border border-white/20 bg-transparent',
    solid: 'bg-white/10',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg shadow-black/20',
  };

  return (
    <div
      className={cn(
        variantClasses[component.variant || 'default'],
        spacingMap[component.padding || 'md'],
        roundedMap[component.rounded || 'md'],
        shadowClasses[component.shadow || 'none']
      )}
    >
      {children}
    </div>
  );
}

function RenderHeading({ component }: { component: HeadingComponent }) {
  const Tag = `h${component.level}` as keyof JSX.IntrinsicElements;

  const sizeClasses: Record<number, string> = {
    1: 'text-4xl md:text-5xl font-bold',
    2: 'text-3xl md:text-4xl font-bold',
    3: 'text-2xl md:text-3xl font-semibold',
    4: 'text-xl md:text-2xl font-semibold',
    5: 'text-lg md:text-xl font-medium',
    6: 'text-base md:text-lg font-medium',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const colorClass = component.color === 'muted'
    ? 'text-white/60'
    : component.color === 'inherit' || !component.color
      ? ''
      : colorMap[component.color]?.text || '';

  return (
    <Tag
      className={cn(
        sizeClasses[component.level],
        alignClasses[component.align || 'left'],
        colorClass,
        component.gradient && 'bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent'
      )}
    >
      {component.text}
    </Tag>
  );
}

function RenderText({ component }: { component: TextComponent }) {
  const variantClasses = {
    body: 'text-base leading-relaxed',
    lead: 'text-lg md:text-xl leading-relaxed',
    small: 'text-sm',
    caption: 'text-xs uppercase tracking-wider',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const colorClass = component.color === 'muted'
    ? 'text-white/60'
    : component.color === 'inherit' || !component.color
      ? ''
      : colorMap[component.color]?.text || '';

  return (
    <p
      className={cn(
        variantClasses[component.variant || 'body'],
        alignClasses[component.align || 'left'],
        weightClasses[component.weight || 'normal'],
        colorClass
      )}
    >
      {component.content}
    </p>
  );
}

function RenderList({ component }: { component: ListComponent }) {
  const Tag = component.variant === 'number' ? 'ol' : 'ul';

  const listStyleClasses = {
    bullet: 'list-disc',
    number: 'list-decimal',
    check: 'list-none',
    none: 'list-none',
  };

  return (
    <Tag className={cn(listStyleClasses[component.variant || 'bullet'], 'ml-4 space-y-1 text-white/80')}>
      {component.items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          {component.variant === 'check' && (
            <Check size={16} className="mt-1 text-emerald-500 flex-shrink-0" />
          )}
          <span>{item}</span>
        </li>
      ))}
    </Tag>
  );
}

function RenderBadge({ component }: { component: BadgeComponent }) {
  const color = colorMap[component.color || 'amber'];

  const variantClasses = {
    solid: cn(color.bg, 'text-black'),
    outline: cn('bg-transparent border', color.border, color.text),
    subtle: cn(color.bg.replace('bg-', 'bg-') + '/20', color.text),
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variantClasses[component.variant || 'subtle'],
        sizeClasses[component.size || 'md']
      )}
    >
      {component.text}
    </span>
  );
}

function RenderDivider({ component }: { component: DividerComponent }) {
  const variantClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  const colorClass = component.color === 'muted' || !component.color
    ? 'border-white/10'
    : colorMap[component.color]?.border || 'border-white/10';

  return (
    <hr
      className={cn(
        'border-t my-4',
        variantClasses[component.variant || 'solid'],
        colorClass
      )}
    />
  );
}

function RenderSpacer({ component }: { component: SpacerComponent }) {
  const heightMap: Record<Size, string> = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
    xl: 'h-8',
    '2xl': 'h-12',
  };

  return <div className={heightMap[component.size]} />;
}

function RenderGrid({ component, children }: { component: GridComponent; children: React.ReactNode }) {
  const colsClasses: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const cols = component.cols ?? 2;
  const gap = component.gap ?? 'md';
  const gapClass = gapMap[gap] ?? 'gap-4';

  return (
    <div className={cn('grid', colsClasses[cols], gapClass)}>
      {children}
    </div>
  );
}

function RenderFlex({ component, children }: { component: FlexComponent; children: React.ReactNode }) {
  const directionClasses: Record<string, string> = {
    row: 'flex-row',
    col: 'flex-col',
  };

  const justifyClasses: Record<string, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  const alignClasses: Record<string, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const direction = component.direction ?? 'row';
  const justify = component.justify ?? 'start';
  const align = component.align ?? 'start';
  const gap = component.gap ?? 'sm';
  const gapClass = gapMap[gap] ?? 'gap-2';

  return (
    <div
      className={cn(
        'flex',
        directionClasses[direction],
        justifyClasses[justify],
        alignClasses[align],
        gapClass,
        component.wrap && 'flex-wrap'
      )}
    >
      {children}
    </div>
  );
}

function RenderIcon({ component }: { component: IconComponent }) {
  const IconComp = iconMap[component.name] || Sparkles;
  const colorClass = component.color ? colorMap[component.color]?.text : '';
  const sizeNum = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    '2xl': 48,
  }[component.size || 'md'];

  return <IconComp size={sizeNum} className={colorClass} />;
}

// ============================================================================
// Main Renderer
// ============================================================================

function RenderComponent({ component }: { component: UIComponent }): React.ReactNode {
  // Get children if present
  const children = 'children' in component && Array.isArray(component.children)
    ? component.children.map((child, i) => <RenderComponent key={i} component={child} />)
    : null;

  switch (component.type) {
    case 'page':
      return <RenderPage component={component}>{children}</RenderPage>;
    case 'section':
      return <RenderSection component={component}>{children}</RenderSection>;
    case 'card':
      return <RenderCard component={component}>{children}</RenderCard>;
    case 'heading':
      return <RenderHeading component={component} />;
    case 'text':
      return <RenderText component={component} />;
    case 'list':
      return <RenderList component={component} />;
    case 'badge':
      return <RenderBadge component={component} />;
    case 'divider':
      return <RenderDivider component={component} />;
    case 'spacer':
      return <RenderSpacer component={component} />;
    case 'grid':
      return <RenderGrid component={component}>{children}</RenderGrid>;
    case 'flex':
      return <RenderFlex component={component}>{children}</RenderFlex>;
    case 'icon':
      return <RenderIcon component={component} />;
    default:
      return null;
  }
}

interface UIRendererProps {
  ui: GeneratedUI;
  className?: string;
}

export function UIRenderer({ ui, className }: UIRendererProps) {
  return (
    <div className={cn('w-full h-full overflow-auto', className)}>
      <RenderComponent component={ui.page} />
    </div>
  );
}

export default UIRenderer;

