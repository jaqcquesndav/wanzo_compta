import { StatementSection } from './StatementSection';
import type { CashFlowStatementData } from '../../../types/reports';
import { CurrencyCode } from '../../../config/currency';

interface CashFlowStatementProps {
  data: CashFlowStatementData;
  currency?: CurrencyCode;
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
            items: [
              data.operatingActivities.netResult,
              ...data.operatingActivities.adjustments,
              ...data.operatingActivities.workingCapital,
              data.operatingActivities.total
            ],
            showSubtotal: true
          },
          {
            title: 'FLUX DE TRÉSORERIE PROVENANT DES ACTIVITÉS D\'INVESTISSEMENT',
            items: [
              ...data.investingActivities.acquisitions,
              ...data.investingActivities.disposals,
              data.investingActivities.total
            ],
            showSubtotal: true
          },
          {
            title: 'FLUX DE TRÉSORERIE PROVENANT DU FINANCEMENT',
            items: [
              ...data.financingActivities.capital,
              ...data.financingActivities.loans,
              ...data.financingActivities.repayments,
              ...data.financingActivities.dividends,
              data.financingActivities.total
            ],
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