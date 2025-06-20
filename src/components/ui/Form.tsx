import React, { forwardRef, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes, InputHTMLAttributes } from 'react';
import { LucideIcon, AlertTriangle, ChevronDown } from 'lucide-react';

interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  children: ReactNode;
  error?: string | null;
  className?: string;
  labelClassName?: string;
  showOptionalText?: boolean;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  children,
  error,
  className = '',
  labelClassName = '',
  showOptionalText = false,
  required = false,
}) => {
  return (
    <div className={`mb-4 ${className}`}>      {label && (
        <label
          htmlFor={htmlFor}
          className={`block text-sm font-medium text-foreground mb-1 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
          {showOptionalText && <span className="text-muted-foreground ml-1">(Optional)</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="mt-1 text-xs text-destructive flex items-center">
          <AlertTriangle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  error?: string | null;
  inputClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', icon: Icon, error, className = '', inputClassName = '', ...props }, ref) => {
    const hasError = !!error;
    return (      <div className={`relative ${className}`}>
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className={`h-5 w-5 ${hasError ? 'text-destructive' : 'text-muted-foreground'}`} />
          </div>
        )}
        <input
          type={type}
          ref={ref}
          className={`form-input ${Icon ? 'pl-10' : ''} ${hasError ? 'border-destructive focus:ring-destructive focus:border-destructive' : 'border-input focus:ring-ring focus:border-primary'} ${inputClassName}`}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon?: LucideIcon;
  error?: string | null;
  containerClassName?: string;
  options?: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ icon: Icon, error, children, className = '', containerClassName = '', options, ...props }, ref) => {
    const hasError = !!error;
    return (      <div className={`relative ${containerClassName}`}>
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className={`h-5 w-5 ${hasError ? 'text-destructive' : 'text-muted-foreground'}`} />
          </div>
        )}
        <select
          ref={ref}
          className={`form-select appearance-none ${Icon ? 'pl-10' : 'pr-10'} ${hasError ? 'border-destructive focus:ring-destructive focus:border-destructive' : 'border-input focus:ring-ring focus:border-primary'} ${className}`}
          {...props}
        >
          {options ? (
            <>
              <option value="">Sélectionner...</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </>
          ) : (
            children
          )}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDown className={`h-5 w-5 ${hasError ? 'text-destructive' : 'text-text-tertiary'}`} />
        </div>
      </div>
    );
  }
);
Select.displayName = 'Select';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string | null;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className = '', ...props }, ref) => {
    const hasError = !!error;
    return (
      <textarea
        ref={ref}
        className={`form-textarea ${hasError ? 'border-destructive focus:ring-destructive focus:border-destructive' : 'border-primary focus:ring-primary focus:border-primary'} ${className}`}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';