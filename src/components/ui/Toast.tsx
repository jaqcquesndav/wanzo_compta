import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  const bgColor = {
    success: 'bg-success',
    error: 'bg-destructive',
    warning: 'bg-warning',
    info: 'bg-primary',
  }[type];

  return (
    <div className={`${bgColor} text-on-primary px-4 py-3 rounded-lg shadow-lg flex items-center justify-between`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 hover:opacity-80">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}