import { type FinancialStatementType } from '../../../types/reports';
import { useCurrency } from '../../../hooks/useCurrency';
import { CurrencyCode } from '../../../config/currency';

interface FinancialStatementPreviewProps {
  type: FinancialStatementType;
  data: any;
  currency?: CurrencyCode;
}

export function FinancialStatementPreview({ type, data, currency }: FinancialStatementPreviewProps) {
  const { format } = useCurrency();
  
  const formatAmount = (amount: number | undefined): string => {
    if (amount === undefined) return '-';
    return format(amount, currency);
  };

  if (!data) return null;

  const renderBalanceSheet = () => {
    const { fixedAssets, currentAssets, equity, grandTotal } = data;

    return (
      <div className="space-y-8">
        {/* Actif */}
        <div>
          <h3 className="text-lg font-bold mb-4 print:text-black">ACTIF</h3>
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200 print:border-gray-300">
            <thead className="bg-muted print:bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border-b border-gray-200 print:border-gray-300">Code</th>
                <th className="px-4 py-2 text-left border-b border-gray-200 print:border-gray-300">Libellé</th>
                <th className="px-4 py-2 text-right border-b border-gray-200 print:border-gray-300">Brut</th>
                <th className="px-4 py-2 text-right border-b border-gray-200 print:border-gray-300">Amort/Prov</th>
                <th className="px-4 py-2 text-right border-b border-gray-200 print:border-gray-300">Net</th>
                <th className="px-4 py-2 text-right border-b border-gray-200 print:border-gray-300">Net N-1</th>
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
                  <td className="px-4 py-2 text-right">{formatAmount(item.brut)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.amort)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.net)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.netN1)}</td>
                </tr>
              ))}
              {fixedAssets.tangibleAssets.map((item: any) => (
                <tr key={item.code}>
                  <td className="px-4 py-2">{item.code}</td>
                  <td className="px-4 py-2">{item.label}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.brut)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.amort)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.net)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.netN1)}</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-medium">
                <td colSpan={2} className="px-4 py-2">Total Actif immobilisé</td>
                <td className="px-4 py-2 text-right">{formatAmount(fixedAssets.total.brut)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(fixedAssets.total.amort)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(fixedAssets.total.net)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(fixedAssets.total.netN1)}</td>
              </tr>

              {/* Actif circulant */}
              <tr className="bg-gray-50 font-medium">
                <td colSpan={6} className="px-4 py-2">Actif circulant</td>
              </tr>
              {currentAssets.inventory.map((item: any) => (
                <tr key={item.code}>
                  <td className="px-4 py-2">{item.code}</td>
                  <td className="px-4 py-2">{item.label}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.brut)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.amort)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.net)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.netN1)}</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-medium">
                <td colSpan={2} className="px-4 py-2">Total Actif circulant</td>
                <td className="px-4 py-2 text-right">{formatAmount(currentAssets.total.brut)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(currentAssets.total.amort)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(currentAssets.total.net)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(currentAssets.total.netN1)}</td>
              </tr>              {/* Total Actif */}
              <tr className="bg-primary print:bg-gray-700 text-white print:text-white font-bold">
                <td colSpan={2} className="px-4 py-2">TOTAL ACTIF</td>
                <td className="px-4 py-2 text-right">{formatAmount(grandTotal.brut)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(grandTotal.amort)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(grandTotal.net)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(grandTotal.netN1)}</td>
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
                  <td className="px-4 py-2 text-right">{formatAmount(item.net)}</td>
                  <td className="px-4 py-2 text-right">{formatAmount(item.netN1)}</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-medium">
                <td colSpan={2} className="px-4 py-2">Total Capitaux propres</td>
                <td className="px-4 py-2 text-right">{formatAmount(equity.total.net)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(equity.total.netN1)}</td>
              </tr>

              {/* Total Passif */}
              <tr className="bg-primary text-white font-bold">
                <td colSpan={2} className="px-4 py-2">TOTAL PASSIF</td>
                <td className="px-4 py-2 text-right">{formatAmount(grandTotal.net)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(grandTotal.netN1)}</td>
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
                <td className="px-4 py-2 text-right">{formatAmount(item.current)}</td>
                <td className="px-4 py-2 text-right">{formatAmount(item.previous)}</td>
                <td className="px-4 py-2 text-right">{item.variation}%</td>
              </tr>
            ))}
            <tr className="bg-gray-100 font-medium">
              <td colSpan={2} className="px-4 py-2">Total Produits d'exploitation</td>
              <td className="px-4 py-2 text-right">{formatAmount(data.operatingIncome.total.current)}</td>
              <td className="px-4 py-2 text-right">{formatAmount(data.operatingIncome.total.previous)}</td>
              <td className="px-4 py-2 text-right">{data.operatingIncome.total.variation}%</td>
            </tr>            {/* Résultat net */}
            <tr className="bg-primary print:bg-gray-700 text-white print:text-white font-bold">
              <td colSpan={2} className="px-4 py-2">RÉSULTAT NET</td>
              <td className="px-4 py-2 text-right">{formatAmount(data.netResult.current)}</td>
              <td className="px-4 py-2 text-right">{formatAmount(data.netResult.previous)}</td>
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
              <td className="px-4 py-2 text-right">{formatAmount(data.operatingActivities.netResult.current)}</td>
              <td className="px-4 py-2 text-right">{formatAmount(data.operatingActivities.netResult.previous)}</td>
            </tr>

            {/* Variation de trésorerie */}
            <tr className="bg-primary text-white font-bold">
              <td colSpan={2} className="px-4 py-2">VARIATION DE TRÉSORERIE</td>
              <td className="px-4 py-2 text-right">{formatAmount(data.netCashChange.current)}</td>
              <td className="px-4 py-2 text-right">{formatAmount(data.netCashChange.previous)}</td>
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