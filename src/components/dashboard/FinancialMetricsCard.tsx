import { Card } from '../ui/Card';
import { Briefcase, Clock, Users, Percent, Scale, Activity } from 'lucide-react';
import { useCurrency } from '../../hooks/useCurrency';

interface FinancialRatiosCardProps {
  grossProfitMargin: number;
  breakEvenPoint: number;
  daysSalesOutstanding: number;
  daysPayableOutstanding: number;
  workingCapital: number;
  currentRatio: number;
}

export function FinancialMetricsCard({
  grossProfitMargin,
  breakEvenPoint,
  daysSalesOutstanding,
  daysPayableOutstanding,
  workingCapital,
  currentRatio
}: FinancialRatiosCardProps) {
  const { format } = useCurrency();

  return (
    <Card title="Ratios Financiers Clés">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Marge Brute */}
        <div className="space-y-2 p-4 bg-background-alt rounded-lg shadow">
          <div className="flex items-center text-primary">
            <Percent className="h-5 w-5 mr-2" />
            <h3 className="text-sm font-medium">Marge Brute</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">{grossProfitMargin}%</p>
          <p className="text-xs text-text-tertiary">Rentabilité sur ventes</p>
        </div>

        {/* Seuil de Rentabilité */}
        <div className="space-y-2 p-4 bg-background-alt rounded-lg shadow">
          <div className="flex items-center text-primary">
            <Scale className="h-5 w-5 mr-2" />
            <h3 className="text-sm font-medium">Seuil de Rentabilité</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">{format(breakEvenPoint)}</p>
          <p className="text-xs text-text-tertiary">Niveau d'activité minimum</p>
        </div>

        {/* DSO */}
        <div className="space-y-2 p-4 bg-background-alt rounded-lg shadow">
          <div className="flex items-center text-primary">
            <Clock className="h-5 w-5 mr-2" />
            <h3 className="text-sm font-medium">Délai Moyen Clients (DSO)</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">{daysSalesOutstanding} jours</p>
          <p className="text-xs text-text-tertiary">Rotation des créances</p>
        </div>

        {/* DPO */}
        <div className="space-y-2 p-4 bg-background-alt rounded-lg shadow">
          <div className="flex items-center text-primary">
            <Users className="h-5 w-5 mr-2" />
            <h3 className="text-sm font-medium">Délai Moyen Fournisseurs (DPO)</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">{daysPayableOutstanding} jours</p>
          <p className="text-xs text-text-tertiary">Rotation des dettes</p>
        </div>

        {/* Besoin en Fonds de Roulement (BFR) */}
        <div className="space-y-2 p-4 bg-background-alt rounded-lg shadow">
          <div className="flex items-center text-primary">
            <Briefcase className="h-5 w-5 mr-2" />
            <h3 className="text-sm font-medium">Besoin en Fonds de Roulement</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">{format(workingCapital)}</p>
          <p className="text-xs text-text-tertiary">Financement du cycle d'exploitation</p>
        </div>

        {/* Ratio de Liquidité Générale */}
        <div className="space-y-2 p-4 bg-background-alt rounded-lg shadow">
          <div className="flex items-center text-primary">
            <Activity className="h-5 w-5 mr-2" />
            <h3 className="text-sm font-medium">Ratio de Liquidité Générale</h3>
          </div>
          <p className="text-2xl font-bold text-text-primary">{currentRatio}</p>
          <p className="text-xs text-text-tertiary">Capacité à couvrir les dettes CT</p>
        </div>
      </div>
    </Card>
  );
}