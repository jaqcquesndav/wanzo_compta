import { Card } from '../../ui/Card';
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';
import { useCurrency } from '../../../hooks/useCurrency';

interface TrendCardProps {
  title: string;
  currentValue: number;
  previousValue: number;
  icon: LucideIcon;
  period: string;
}

export function TrendCard({
  title,
  currentValue,
  previousValue,
  icon: Icon,
  period
}: TrendCardProps) {
  const { formatConverted } = useCurrency();
  const variation = ((currentValue - previousValue) / previousValue) * 100;
  const isPositive = variation >= 0;

  return (
    <Card title={title} icon={Icon}>
      <div className="space-y-4">
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {formatConverted(currentValue)}
          </p>
          <div className="flex items-center mt-1">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-success mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
            )}
            <span className={`text-sm ${isPositive ? 'text-success' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{variation.toFixed(1)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">
              vs {period}
            </span>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          <div className="flex justify-between items-center">
            <span>Période actuelle</span>
            <span className="font-medium text-gray-900">
              {formatConverted(currentValue)}
            </span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span>Période précédente</span>
            <span className="font-medium text-gray-900">
              {formatConverted(previousValue)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}