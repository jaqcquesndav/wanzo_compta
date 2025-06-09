import React from 'react';
import { StatementSection } from './StatementSection';
import type { CashFlowStatementData } from '../../../types/reports';

interface CashFlowStatementProps {
  data: CashFlowStatementData;
  currency: string;
}

export function CashFlowStatement({ data, currency }: CashFlowStatementProps) {
  return (
    <div className="space-y-8">
      <StatementSection
        title="TABLEAU DES FLUX DE TRÉSORERIE"
        columns={[
          { key: 'current', label: 'N' },
          { key: 'previous', label: 'N-1' },
          { key: 'variation', label: 'Variation' }
        ]}
        sections={[
          {
            title: 'FLUX DE TRÉSORERIE PROVENANT DES ACTIVITÉS OPÉRATIONNELLES',
            items: data.operatingActivities,
            showSubtotal: true
          },
          {
            title: 'FLUX DE TRÉSORERIE PROVENANT DES ACTIVITÉS D\'INVESTISSEMENT',
            items: data.investingActivities,
            showSubtotal: true
          },
          {
            title: 'FLUX DE TRÉSORERIE PROVENANT DU FINANCEMENT',
            items: data.financingActivities,
            showSubtotal: true
          },
          {
            title: 'VARIATION DE LA TRÉSORERIE NETTE DE LA PÉRIODE',
            items: [data.netCashChange],
            highlight: true
          }
        ]}
        currency={currency}
      />
    </div>
  );
}