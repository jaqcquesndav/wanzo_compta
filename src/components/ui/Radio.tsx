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
            w-4 h-4 text-primary border-gray-300 
            focus:ring-primary focus:ring-offset-0
            dark:border-dark-DEFAULT dark:bg-dark-secondary dark:checked:bg-primary
            ${className}
          `}
        />
        <div className="absolute w-4 h-4 pointer-events-none" />
      </div>
      <span className="text-sm text-gray-700 dark:text-gray-300 select-none">{label}</span>
    </label>
  );
}