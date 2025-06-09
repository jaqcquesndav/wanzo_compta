import React from 'react';
import { Card } from '../ui/Card';
import { Calendar, TrendingUp, DollarSign } from 'lucide-react';
import type { FiscalYear } from '../../hooks/useFiscalYear';

interface FiscalYearSummaryProps {
  fiscalYear: FiscalYear;
  metrics: {
    revenue: number;
    expenses: number;
    result: number;
  };
}

export function FiscalYearSummary({ fiscalYear, metrics }: FiscalYearSummaryProps) {
  const formatAmount = (amount: number) => {
    return amount.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    });
  };

  return (
    <Card title={`Résumé de l'exercice ${fiscalYear.code}`} icon={Calendar}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center text-primary">
              <DollarSign className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Chiffre d'affaires</span>
            </div>
            <p className="mt-1 text-2xl font-bold">
              {formatAmount(metrics.revenue)}
            </p>
          </div>

          <div>
            <div className="flex items-center text-warning">
              <TrendingUp className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Charges</span>
            </div>
            <p className="mt-1 text-2xl font-bold">
              {formatAmount(metrics.expenses)}
            </p>
          </div>

          <div>
            <div className="flex items-center text-success">
              <DollarSign className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Résultat</span>
            </div>
            <p className="mt-1 text-2xl font-bold">
              {formatAmount(metrics.result)}
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Période :</span>
              <span className="ml-2 font-medium">
                {new Date(fiscalYear.startDate).toLocaleDateString('fr-FR')} au{' '}
                {new Date(fiscalYear.endDate).toLocaleDateString('fr-FR')}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Statut :</span>
              <span className={`ml-2 font-medium ${
                fiscalYear.status === 'open' ? 'text-success' : 'text-gray-900'
              }`}>
                {fiscalYear.status === 'open' ? 'Ouvert' : 'Clôturé'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}