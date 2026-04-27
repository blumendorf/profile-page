import { type ReactNode, useId } from 'react';
import { cn } from '@/lib/utils';

export interface LabSelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
  id?: string;
  /** Optional help text under the field */
  description?: ReactNode;
  disabled?: boolean;
}

/**
 * Consistent label + full-width `select` for Lab configuration panels.
 */
export const LabSelectField = ({
  label,
  value,
  onChange,
  options,
  className,
  id: idProp,
  description,
  disabled = false,
}: LabSelectFieldProps) => {
  const gen = useId();
  const id = idProp ?? gen;

  return (
    <div className={cn('space-y-1', className)}>
      <label className="block text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        disabled={disabled}
        className="w-full bg-surface border border-border-subtle rounded-md px-3 py-2 text-text-primary
                   focus:outline-hidden focus:ring-2 focus:ring-accent/40 disabled:opacity-60"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {description ? <div className="text-xs text-text-muted">{description}</div> : null}
    </div>
  );
};
