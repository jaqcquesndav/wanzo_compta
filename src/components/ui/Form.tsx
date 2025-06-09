import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
  icon?: LucideIcon;
}

export function FormField({ label, error, children, required, icon: Icon }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mt-1 relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        {children}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  error?: string;
}

export function Input({ icon: Icon, error, className = '', ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`
        appearance-none block w-full px-3 py-2 border rounded-md shadow-sm 
        placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm
        ${Icon ? 'pl-10' : ''}
        ${error ? 'border-red-300' : 'border-gray-300'}
        dark:bg-dark-secondary dark:border-dark-DEFAULT dark:text-dark-primary
        dark:placeholder-gray-500 dark:focus:ring-primary dark:focus:border-primary
        ${className}
      `}
    />
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon?: LucideIcon;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export function Select({ icon: Icon, error, options, className = '', ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={`
        block w-full px-3 py-2 border rounded-md shadow-sm 
        focus:outline-none focus:ring-primary focus:border-primary sm:text-sm
        ${Icon ? 'pl-10' : ''}
        ${error ? 'border-red-300' : 'border-gray-300'}
        dark:bg-dark-secondary dark:border-dark-DEFAULT dark:text-dark-primary
        ${className}
      `}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export function Textarea({ error, className = '', ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`
        block w-full px-3 py-2 border rounded-md shadow-sm 
        placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm
        ${error ? 'border-red-300' : 'border-gray-300'}
        dark:bg-dark-secondary dark:border-dark-DEFAULT dark:text-dark-primary
        dark:placeholder-gray-500 dark:focus:ring-primary dark:focus:border-primary
        resize-none
        ${className}
      `}
    />
  );
}