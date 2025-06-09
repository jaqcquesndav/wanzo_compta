import React from 'react';
import { StatementSection } from './StatementSection';
import type { BalanceSheetData } from '../../../types/reports';

interface BalanceSheetProps {
  data: BalanceSheetData;
  currency: string;
}

export function BalanceSheet({ data, currency }: BalanceSheetProps) {
  return (
    <div className="space-y-8">
      {/* Actif */}
      <StatementSection
        title="ACTIF"
        columns={[
          { key: 'brut', label: 'Brut' },
          { key: 'amort', label: 'Amort/Prov' },
          { key: 'net', label: 'Net' },
          { key: 'netN1', label: 'Net N-1' }
        ]}
        sections={[
          {
            title: 'ACTIF IMMOBILISÉ',
            items: data.fixedAssets,
            showSubtotal: true
          },
          {
            title: 'ACTIF CIRCULANT',
            items: data.currentAssets,
            showSubtotal: true
          },
          {
            title: 'TRÉSORERIE-ACTIF',
            items: data.cashAssets,
            showSubtotal: true
          }
        ]}
        currency={currency}
      />

      {/* Passif */}
      <StatementSection
        title="PASSIF"
        columns={[
          { key: 'net', label: 'Net' },
          { key: 'netN1', label: 'Net N-1' }
        ]}
        sections={[
          {
            title: 'CAPITAUX PROPRES ET RESSOURCES ASSIMILÉES',
            items: data.equity,
            showSubtotal: true
          },
          {
            title: 'DETTES FINANCIÈRES ET RESSOURCES ASSIMILÉES',
            items: data.longTermDebt,
            showSubtotal: true
          },
          {
            title: 'PASSIF CIRCULANT',
            items: data.currentLiabilities,
            showSubtotal: true
          },
          {
            title: 'TRÉSORERIE-PASSIF',
            items: data.cashLiabilities,
            showSubtotal: true
          }
        ]}
        currency={currency}
      />
    </div>
  );
}