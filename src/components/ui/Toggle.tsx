import React from 'react';

interface ToggleProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function Toggle({ label, checked = false, onChange, disabled = false }: ToggleProps) {
  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <div className="relative inline-block w-10 mr-2 align-middle select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          className={`
            absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer
            transition-all duration-200 ease-in-out
            peer
            checked:right-0 checked:border-primary
            right-4
            dark:bg-dark-secondary dark:border-dark-DEFAULT dark:checked:border-primary
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        />
        <div className={`
          block overflow-hidden h-6 rounded-full bg-gray-300
          transition-colors duration-200 ease-in-out
          peer-checked:bg-primary
          dark:bg-dark-DEFAULT dark:peer-checked:bg-primary
          peer-disabled:opacity-50
        `} />
      </div>
      <span className={`
        text-sm text-gray-700 dark:text-gray-300 select-none
        ${disabled ? 'opacity-50' : ''}
      `}>
        {label}
      </span>
    </label>
  );
}