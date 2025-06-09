import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface UserStatusBadgeProps {
  status: 'active' | 'inactive';
  className?: string;
}

export function UserStatusBadge({ status, className = '' }: UserStatusBadgeProps) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      {status === 'active' ? (
        <CheckCircle className="h-4 w-4 text-success mr-1" />
      ) : (
        <XCircle className="h-4 w-4 text-red-600 mr-1" />
      )}
      <span className={`text-sm ${
        status === 'active' ? 'text-success' : 'text-red-600'
      }`}>
        {status === 'active' ? 'Actif' : 'Inactif'}
      </span>
    </div>
  );
}