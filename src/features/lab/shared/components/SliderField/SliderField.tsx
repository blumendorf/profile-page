import { useId } from 'react';
import { cn } from '@/lib/utils';

export interface SliderFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  formatValue?: (v: number) => string;
  className?: string;
  id?: string;
  disabled?: boolean;
}

/**
 * Label + value readout + range input (generation settings, etc.).
 */
export const SliderField = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  formatValue = (v) => String(v),
  className,
  id: idProp,
  disabled = false,
}: SliderFieldProps) => {
  const gen = useId();
  const id = idProp ?? gen;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-text-primary" htmlFor={id}>
          {label}
        </label>
        <span className="text-xs font-mono text-cyan-500">{formatValue(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-surface rounded-lg appearance-none cursor-pointer accent-cyan-500 disabled:opacity-50"
      />
    </div>
  );
};
