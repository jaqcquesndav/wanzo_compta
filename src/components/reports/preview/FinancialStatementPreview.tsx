import React from 'react';
import type { FinancialStatementType } from '../../../types/reports';

interface FinancialStatementPreviewProps {
  type: FinancialStatementType;
  data: any;
  currency?: 'USD' | 'CDF';
}

function formatAmount(amount: number | undefined, currency: 'USD' | 'CDF' = 'CDF'): string {
  if (amount === undefined) return '-';
  return new Intl.NumberFormat('fr-CD', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  }).format(amount);
}

export function FinancialStatementPreview({ type, data, currency = 'CDF' }: FinancialStatementPreviewProps) {
  if (!data) return null;

  const renderBalanceSheet = () => {
    const { fixedAssets, currentAssets, treasuryAssets, equity, financialDebts, currentLiabilities } = data;

    return (
      <div className="space-y-8">
        {/* Actif */}
        <div>
          <h3 className="text-lg font-bold mb-4">ACTIF</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Code</th>
                <th className="px-4 py-2 text-left">Libellé</th>
                <th className="px-4 py-2 text-right">Brut</th>
                <th className="px-4 py-2 text-right">Amort/Prov</th>
                <th className="px-4 py-2 text-right">Net</th>
                <th className="px-4 py-2 text-right">Net N-1</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Actif immobilisé */}
              <tr className="bg-gray-50 font-medium">
                <td colSpan={6} className="px-4 py-2">Actif immobilisé</td>
              </tr>
              {fixedAssets.intangibleAssets.map((item: any) => (
                <tr key={item.code}>
                  <td className="px-4 py-2">{item.code}</td>
                  <td className="px-4 py-2">{item.label}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.brut, currency)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.amort, currency)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.net, currency)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.netN1, currency)}</td>
                </tr>
              ))}
              {fixedAssets.tangibleAssets.map((item: any) => (
                <tr key={item.code}>
                  <td className="px-4 py-2">{item.code}</td>
                  <td className="px-4 py-2">{item.label}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.brut, currency)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.amort, currency)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.net, currency)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.netN1, currency)}</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-medium">
                <td colSpan={2} className="px-4 py-2">Total Actif immobilisé</td>
                <td className="px-4 py-2 text-right">{formatAmount(fixedAssets.total.brut, currency)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(fixedAssets.total.amort, currency)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(fixedAssets.total.net, currency)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(fixedAssets.total.netN1, currency)}</td>
              </tr>

              {/* Actif circulant */}
              <tr className="bg-gray-50 font-medium">
                <td colSpan={6} className="px-4 py-2">Actif circulant</td>
              </tr>
              {currentAssets.inventory.map((item: any) => (
                <tr key={item.code}>
                  <td className="px-4 py-2">{item.code}</td>
                  <td className="px-4 py-2">{item.label}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.brut, currency)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.amort, currency)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.net, currency)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.netN1, currency)}</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-medium">
                <td colSpan={2} className="px-4 py-2">Total Actif circulant</td>
                <td className="px-4 py-2 text-right">{formatAmount(currentAssets.total.brut, currency)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(currentAssets.total.amort, currency)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(currentAssets.total.net, currency)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(currentAssets.total.netN1, currency)}</td>
              </tr>

              {/* Total Actif */}
              <tr className="bg-primary text-white font-bold">
                <td colSpan={2} className="px-4 py-2">TOTAL ACTIF</td>
                <td className="px-4 py-2 text-right">{formatAmount(data.grandTotal.brut, currency)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(data.grandTotal.amort, currency)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(data.grandTotal.net, currency)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(data.grandTotal.netN1, currency)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Passif */}
        <div>
          <h3 className="text-lg font-bold mb-4">PASSIF</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Code</th>
                <th className="px-4 py-2 text-left">Libellé</th>
                <th className="px-4 py-2 text-right">Net</th>
                <th className="px-4 py-2 text-right">Net N-1</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Capitaux propres */}
              <tr className="bg-gray-50 font-medium">
                <td colSpan={4} className="px-4 py-2">Capitaux propres</td>
              </tr>
              {equity.capital.map((item: any) => (
                <tr key={item.code}>
                  <td className="px-4 py-2">{item.code}</td>
                  <td className="px-4 py-2">{item.label}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.net, currency)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.netN1, currency)}</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-medium">
                <td colSpan={2} className="px-4 py-2">Total Capitaux propres</td>
                <td className="px-4 py-2 text-right">{formatAmount(equity.total.net, currency)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(equity.total.netN1, currency)}</td>
              </tr>

              {/* Total Passif */}
              <tr className="bg-primary text-white font-bold">
                <td colSpan={2} className="px-4 py-2">TOTAL PASSIF</td>
                <td className="px-4 py-2 text-right">{formatAmount(data.grandTotal.net, currency)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(data.grandTotal.netN1, currency)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderIncomeStatement = () => {
    return (
      <div className="space-y-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Code</th>
              <th className="px-4 py-2 text-left">Libellé</th>
              <th className="px-4 py-2 text-right">N</th>
              <th className="px-4 py-2 text-right">N-1</th>
              <th className="px-4 py-2 text-right">Variation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Produits d'exploitation */}
            <tr className="bg-gray-50 font-medium">
              <td colSpan={5} className="px-4 py-2">Produits d'exploitation</td>
            </tr>
            {data.operatingIncome.sales.map((item: any) => (
              <tr key={item.code}>
                <td className="px-4 py-2">{item.code}</td>
                <td className="px-4 py-2">{item.label}</td>
                <td className="px-4 py-2 text-right">{formatAmount(item.current, currency)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(item.previous, currency)}</td>
                <td className="px-4 py-2 text-right">{item.variation}%</td>
              </tr>
            ))}
            <tr className="bg-gray-100 font-medium">
              <td colSpan={2} className="px-4 py-2">Total Produits d'exploitation</td>
              <td className="px-4 py-2 text-right">{formatAmount(data.operatingIncome.total.current, currency)}</td>
              <td className="px-4 py-2 text-right">{formatAmount(data.operatingIncome.total.previous, currency)}</td>
              <td className="px-4 py-2 text-right">{data.operatingIncome.total.variation}%</td>
            </tr>

            {/* Résultat net */}
            <tr className="bg-primary text-white font-bold">
              <td colSpan={2} className="px-4 py-2">RÉSULTAT NET</td>
              <td className="px-4 py-2 text-right">{formatAmount(data.netResult.current, currency)}</td>
              <td className="px-4 py-2 text-right">{formatAmount(data.netResult.previous, currency)}</td>
              <td className="px-4 py-2 text-right">{data.netResult.variation}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const renderCashFlow = () => {
    return (
      <div className="space-y-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Code</th>
              <th className="px-4 py-2 text-left">Libellé</th>
              <th className="px-4 py-2 text-right">N</th>
              <th className="px-4 py-2 text-right">N-1</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Flux d'exploitation */}
            <tr className="bg-gray-50 font-medium">
              <td colSpan={4} className="px-4 py-2">Flux de trésorerie liés à l'exploitation</td>
            </tr>
            <tr>
              <td className="px-4 py-2">{data.operatingActivities.netResult.code}</td>
              <td className="px-4 py-2">{data.operatingActivities.netResult.label}</td>
              <td className="px-4 py-2 text-right">{formatAmount(data.operatingActivities.netResult.current, currency)}</td>
              <td className="px-4 py-2 text-right">{formatAmount(data.operatingActivities.netResult.previous, currency)}</td>
            </tr>

            {/* Variation de trésorerie */}
            <tr className="bg-primary text-white font-bold">
              <td colSpan={2} className="px-4 py-2">VARIATION DE TRÉSORERIE</td>
              <td className="px-4 py-2 text-right">{formatAmount(data.netCashChange.current, currency)}</td>
              <td className="px-4 py-2 text-right">{formatAmount(data.netCashChange.previous, currency)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  switch (type) {
    case 'balance':
      return renderBalanceSheet();
    case 'income':
      return renderIncomeStatement();
    case 'cashflow':
      return renderCashFlow();
    default:
      return <div>Type d'état non supporté</div>;
  }
}