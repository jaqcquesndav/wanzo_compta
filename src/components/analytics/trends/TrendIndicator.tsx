import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TrendIndicatorProps {
  value: number;
  showIcon?: boolean;
  className?: string;
}

export function TrendIndicator({ value, showIcon = true, className = '' }: TrendIndicatorProps) {
  const isPositive = value >= 0;
  const formattedValue = `${isPositive ? '+' : ''}${value.toFixed(1)}%`;

  return (
    <div className={`flex items-center ${className}`}>
      {showIcon && (
        isPositive ? (
          <TrendingUp className="h-4 w-4 text-success mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
        )
      )}
      <span className={`text-sm ${isPositive ? 'text-success' : 'text-red-600'}`}>
        {formattedValue}
      </span>
    </div>
  );
}