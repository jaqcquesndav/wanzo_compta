import React from 'react';
import { type LucideIcon } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'tertiary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  isLoading?: boolean;
  asChild?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  isLoading,
  asChild = false,
  className = '',
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }[size];

  return (
    <Comp
      className={`btn-${variant} ${sizeStyles} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : Icon ? (
        <Icon className="h-5 w-5 mr-2" />
      ) : null}
      {children}
    </Comp>
  );
}