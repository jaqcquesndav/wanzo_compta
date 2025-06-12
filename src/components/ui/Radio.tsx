import React from 'react';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export function Radio({ label, className = '', ...props }: RadioProps) {
  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <div className="relative flex items-center">
        <input
          type="radio"
          {...props}
          className={`
            w-4 h-4 text-primary border-secondary 
            focus:ring-primary focus:ring-offset-0
            ${className}
          `}
        />
        <div className="absolute w-4 h-4 pointer-events-none" />
      </div>
      <span className="text-sm text-text-secondary select-none">{label}</span>
    </label>
  );
}