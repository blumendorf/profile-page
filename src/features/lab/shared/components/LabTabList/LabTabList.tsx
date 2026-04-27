import { type ComponentType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type IconComp = ComponentType<{ size?: number; className?: string }>;

export interface LabTabItem {
  id: string;
  label: string;
  icon: IconComp;
  /** Extra suffix e.g. log count */
  suffix?: ReactNode;
}

export interface LabTabListProps<T extends string = string> {
  tabs: Array<LabTabItem & { id: T }>;
  active: T;
  onChange: (id: T) => void;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

const defaultActive = 'bg-cyan-500/20 text-cyan-500';
const defaultInactive = 'text-text-muted hover:text-text-primary';

/**
 * Horizontal tab row (HTML Playground, similar patterns).
 */
export const LabTabList = <T extends string>({
  tabs,
  active,
  onChange,
  className,
  activeClassName = defaultActive,
  inactiveClassName = defaultInactive,
}: LabTabListProps<T>) => (
  <div className={cn('flex gap-2', className)}>
    {tabs.map((tab) => {
      const Icon = tab.icon;
      const isOn = active === tab.id;
      return (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors',
            isOn ? activeClassName : inactiveClassName
          )}
        >
          <Icon size={16} />
          {tab.label}
          {tab.suffix}
        </button>
      );
    })}
  </div>
);
