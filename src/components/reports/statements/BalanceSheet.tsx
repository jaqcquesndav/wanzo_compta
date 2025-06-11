import { StatementSection } from './StatementSection';
import type { BalanceSheetData } from '../../../types/reports';
import { CurrencyCode } from '../../../config/currency';

interface BalanceSheetProps {
  data: BalanceSheetData;
  currency?: CurrencyCode;
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
            items: [
              ...data.fixedAssets.intangibleAssets,
              ...data.fixedAssets.tangibleAssets,
              ...data.fixedAssets.financialAssets,
              data.fixedAssets.total
            ],
            showSubtotal: true
          },
          {
            title: 'ACTIF CIRCULANT',
            items: [
              ...data.currentAssets.inventory,
              ...data.currentAssets.receivables,
              ...data.currentAssets.other,
              data.currentAssets.total
            ],
            showSubtotal: true
          },
          {
            title: 'TRÉSORERIE-ACTIF',
            items: [
              ...data.treasuryAssets.investments,
              ...data.treasuryAssets.banks,
              ...data.treasuryAssets.cashOnHand,
              data.treasuryAssets.total
            ],
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
            items: [
              ...data.equity.capital,
              ...data.equity.reserves,
              ...data.equity.result,
              ...data.equity.other,
              data.equity.total
            ],
            showSubtotal: true
          },
          {
            title: 'DETTES FINANCIÈRES ET RESSOURCES ASSIMILÉES',
            items: [
              ...data.financialDebts.loans,
              ...data.financialDebts.leasing,
              ...data.financialDebts.other,
              data.financialDebts.total
            ],
            showSubtotal: true
          },
          {
            title: 'PASSIF CIRCULANT',
            items: [
              ...data.currentLiabilities.suppliers,
              ...data.currentLiabilities.fiscal,
              ...data.currentLiabilities.social,
              ...data.currentLiabilities.other,
              data.currentLiabilities.total
            ],
            showSubtotal: true
          },
          {
            title: 'TRÉSORERIE-PASSIF',
            items: [
              ...data.treasuryLiabilities.banks,
              ...data.treasuryLiabilities.other,
              data.treasuryLiabilities.total
            ],
            showSubtotal: true
          }
        ]}
        currency={currency}
      />
    </div>
  );
}