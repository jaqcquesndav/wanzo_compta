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
    <div className={`card ${className}`}>
      <div className="card-header">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-5 w-5 text-primary" />}
            <h2 className="text-lg font-medium text-text-primary">{title}</h2>
          </div>
          {actions && <div className="flex space-x-3">{actions}</div>}
        </div>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}