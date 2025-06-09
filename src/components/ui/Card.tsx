import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  className?: string;
}

export function Card({ title, children, icon: Icon, actions, className = '' }: CardProps) {
  return (
    <div className={`bg-white dark:bg-dark-secondary rounded-lg shadow-sm ${className}`}>
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-DEFAULT">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-5 w-5 text-primary dark:text-primary" />}
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h2>
          </div>
          {actions && <div className="flex space-x-3">{actions}</div>}
        </div>
      </div>
      <div className="p-6 dark:text-gray-300">{children}</div>
    </div>
  );
}