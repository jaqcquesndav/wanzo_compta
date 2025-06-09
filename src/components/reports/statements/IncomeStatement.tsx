import React from 'react';
import { StatementSection } from './StatementSection';
import type { IncomeStatementData } from '../../../types/reports';

interface IncomeStatementProps {
  data: IncomeStatementData;
  currency: string;
}

export function IncomeStatement({ data, currency }: IncomeStatementProps) {
  return (
    <div className="space-y-8">
      <StatementSection
        title="COMPTE DE RÉSULTAT"
        columns={[
          { key: 'current', label: 'N' },
          { key: 'previous', label: 'N-1' },
          { key: 'variation', label: 'Variation' }
        ]}
        sections={[
          {
            title: 'PRODUITS D\'EXPLOITATION',
            items: data.operatingIncome,
            showSubtotal: true
          },
          {
            title: 'CHARGES D\'EXPLOITATION',
            items: data.operatingExpenses,
            showSubtotal: true,
            isNegative: true
          },
          {
            title: 'RÉSULTAT D\'EXPLOITATION',
            items: [data.operatingResult],
            highlight: true
          },
          {
            title: 'RÉSULTAT FINANCIER',
            items: [data.financialResult]
          },
          {
            title: 'RÉSULTAT DES ACTIVITÉS ORDINAIRES',
            items: [data.ordinaryResult],
            highlight: true
          },
          {
            title: 'RÉSULTAT NET',
            items: [data.netResult],
            highlight: true
          }
        ]}
        currency={currency}
      />
    </div>
  );
}