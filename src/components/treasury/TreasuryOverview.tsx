import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../ui/Card';
import { useTreasury } from '../../hooks/useTreasury';

export function TreasuryOverview() {
  const { getBalance } = useTreasury();
  const balance = getBalance('all');

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('fr-FR', { 
      style: 'currency', 
      currency: balance.currency 
    });
  };

  return (
    <Card title="Vue d'ensemble de la trésorerie">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-600">Solde d'ouverture</p>
          <p className="text-2xl font-bold">{formatAmount(balance.opening)}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Solde actuel</p>
          <p className="text-2xl font-bold text-primary">
            {formatAmount(balance.current)}
          </p>
          <p className="text-sm text-success flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />
            +15% vs mois dernier
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Solde prévisionnel</p>
          <p className="text-2xl font-bold">{formatAmount(balance.projected)}</p>
          <p className="text-sm text-gray-500">
            À 30 jours
          </p>
        </div>
      </div>
    </Card>
  );
}