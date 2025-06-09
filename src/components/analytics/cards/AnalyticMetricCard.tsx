import React from 'react';
import { Card } from '../../ui/Card';
import { LucideIcon } from 'lucide-react';
import { formatCurrency } from '../../../utils/currency';

interface AnalyticMetricCardProps {
  title: string;
  value: number;
  previousValue?: number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function AnalyticMetricCard({
  title,
  value,
  previousValue,
  icon: Icon,
  trend
}: AnalyticMetricCardProps) {
  const variation = previousValue 
    ? ((value - previousValue) / previousValue) * 100
    : 0;

  return (
    <Card title={title} icon={Icon}>
      <div className="space-y-2">
        <p className="text-2xl font-bold text-gray-900">
          {formatCurrency(value, 'XOF')}
        </p>
        
        {previousValue && (
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${variation >= 0 ? 'text-success' : 'text-red-600'}`}>
              {variation >= 0 ? '+' : ''}{variation.toFixed(1)}%
            </span>
            <span className="text-sm text-gray-500">
              vs période précédente
            </span>
          </div>
        )}

        {trend && (
          <div className={`text-sm ${trend.isPositive ? 'text-success' : 'text-red-600'}`}>
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}% tendance
          </div>
        )}
      </div>
    </Card>
  );
}