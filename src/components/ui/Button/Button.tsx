import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn-primary focus-ring',
  secondary: 'btn-secondary focus-ring',
  ghost: 'btn-ghost focus-ring',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, type = 'button', children, ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(variantClass[variant], className)}
      {...rest}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';
