import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className = '' }: StatCardProps) {
  return (
    <div className={`card ${className}`}>
      <div className="flex items-center p-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <p className="text-2xl font-semibold text-text-primary">{value}</p>
          {trend && (
            <div className={`flex items-center mt-1 text-sm ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
              <span>{trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%</span>
              <span className="ml-1 text-text-tertiary">vs mois dernier</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}