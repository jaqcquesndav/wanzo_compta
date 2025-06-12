import { Card } from '../ui/Card';
import { Star, TrendingUp, Leaf } from 'lucide-react';

interface FinancialMetricsCardProps {
  creditScore: number;
  financialRating: string;
  carbonFootprint: number;
}

export function FinancialMetricsCard({
  creditScore,
  financialRating,
  carbonFootprint
}: FinancialMetricsCardProps) {
  return (
    <Card title="Indicateurs Financiers">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex items-center text-primary">
            <Star className="h-5 w-5 mr-2" />
            <h3 className="text-sm font-medium">Cote de Crédit</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">{creditScore}/100</p>
          <p className="text-sm text-text-tertiary">Excellente solvabilité</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-primary">
            <TrendingUp className="h-5 w-5 mr-2" />
            <h3 className="text-sm font-medium">Note Financière</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">{financialRating}</p>
          <p className="text-sm text-text-tertiary">Perspective stable</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-success">
            <Leaf className="h-5 w-5 mr-2" />
            <h3 className="text-sm font-medium">Empreinte Carbone</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">{carbonFootprint}t</p>
          <p className="text-sm text-text-tertiary">CO₂ émis en 2024</p>
        </div>
      </div>
    </Card>
  );
}