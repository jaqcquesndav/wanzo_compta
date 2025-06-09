import React from 'react';
import { useNotifications } from '../../hooks/useNotifications';

interface NotificationBadgeProps {
  count: number;
}

export function NotificationBadge({ count }: NotificationBadgeProps) {
  if (count === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 h-4 w-4 bg-warning text-white text-xs rounded-full flex items-center justify-center">
      {count > 99 ? '99+' : count}
    </span>
  );
}