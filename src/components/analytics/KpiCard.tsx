import React from 'react';
import { Card } from '../ui/Card';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

export function KpiCard({ title, value, icon: Icon, trend, description }: KpiCardProps) {
  return (
    <Card title={title} icon={Icon} className="h-full">
      <div className="space-y-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        
        {trend && (
          <p className={`text-sm flex items-center ${trend.isPositive ? 'text-success' : 'text-red-600'}`}>
            <span className="mr-1">
              {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
            </span>
            <span className="text-gray-500">vs période précédente</span>
          </p>
        )}
        
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>
    </Card>
  );
}