import React from 'react';
import type { User } from '../../types/auth';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
}

export function UserAvatar({ user, size = 'md' }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg'
  };

  return (
    <div className={`
      ${sizeClasses[size]} 
      rounded-full bg-primary text-white 
      flex items-center justify-center font-medium
    `}>
      {user.name?.charAt(0).toUpperCase()}
    </div>
  );
}