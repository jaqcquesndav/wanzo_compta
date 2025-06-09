import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CashFlowCardProps {
  title: string;
  amount: number;
  trend?: {
    percentage: number;
    isPositive: boolean;
  };
  type: 'inflow' | 'outflow';
}

export function CashFlowCard({ title, amount, trend, type }: CashFlowCardProps) {
  const Icon = type === 'inflow' ? TrendingUp : TrendingDown;
  const colorClass = type === 'inflow' ? 'text-success' : 'text-red-600';

  return (
    <Card title={title} icon={Icon} className="h-full">
      <div className="space-y-2">
        <p className={`text-2xl font-bold ${colorClass}`}>
          {amount.toLocaleString('fr-FR', { 
            style: 'currency', 
            currency: 'XOF' 
          })}
        </p>
        
        {trend && (
          <p className={`text-sm flex items-center ${trend.isPositive ? 'text-success' : 'text-red-600'}`}>
            <span className="mr-1">
              {trend.isPositive ? '+' : '-'}{Math.abs(trend.percentage)}%
            </span>
            <span className="text-gray-500">vs mois dernier</span>
          </p>
        )}
      </div>
    </Card>
  );
}