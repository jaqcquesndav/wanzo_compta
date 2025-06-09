import React from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  const bgColor = {
    success: 'bg-[var(--color-success)]',
    error: 'bg-red-500',
    warning: 'bg-[var(--color-warning)]',
    info: 'bg-[var(--color-primary)]',
  }[type];

  return (
    <div className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 hover:opacity-80">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}