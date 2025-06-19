import { useEffect, useState } from 'react';
import { CurrencyCode } from '../../config/currency';
import { FinancialStatementType } from '../../types/reports';
import { QRCodeSVG } from 'qrcode.react';
import { useCurrency } from '../../hooks/useCurrency';

interface PrintableReportProps {
  data: any;
  type: FinancialStatementType;
  title: string;
  organization: any;
  generatedBy: string;
  currency: CurrencyCode;
  date: string;
}

export function PrintableReport({
  data,
  type,
  title,
  organization,
  generatedBy,
  currency,
  date
}: PrintableReportProps) {
  const [qrValue, setQrValue] = useState('');
  const { format } = useCurrency();
  
  // Générer une valeur pour le QR code d'authentification
  useEffect(() => {
    // Créer une chaîne unique avec des informations d'authentification
    const authString = JSON.stringify({
      org: organization.registrationNumber,
      type: type,
      date: new Date().toISOString(),
      generator: generatedBy,
      hash: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    });
    
    // Encoder en base64 pour un QR code plus compact
    const encodedAuth = btoa(authString);
    setQrValue(`https://verify.wanzo.cd/auth/${encodedAuth}`);
  }, [organization, type, generatedBy]);

  // Formatter pour les montants
  const formatAmount = (amount: number | undefined): string => {
    if (amount === undefined) return '-';
    return format(amount, currency);
  };

  const renderBalanceSheet = () => {
    if (!data || !data.fixedAssets || !data.currentAssets || !data.equity) {
      return <div>Données insuffisantes pour le bilan</div>;
    }

    return (
      <>
        {/* Actif */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-black">ACTIF</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Code</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Libellé</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Brut</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Amort/Prov</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Net</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Net N-1</th>
              </tr>
            </thead>
            <tbody>
              {/* Actif immobilisé */}
              <tr className="bg-gray-50">
                <td colSpan={6} className="border border-gray-300 px-4 py-2 font-medium">Actif immobilisé</td>
              </tr>
              {data.fixedAssets.intangibleAssets.map((item: any, index: number) => (
                <tr key={`intangible-${index}`}>
                  <td className="border border-gray-300 px-4 py-2">{item.code}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.label}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(item.brut)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(item.amort)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(item.net)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(item.netN1)}</td>
                </tr>
              ))}
              {data.fixedAssets.tangibleAssets.map((item: any, index: number) => (
                <tr key={`tangible-${index}`}>
                  <td className="border border-gray-300 px-4 py-2">{item.code}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.label}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(item.brut)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(item.amort)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(item.net)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(item.netN1)}</td>
                </tr>
              ))}
              <tr className="bg-gray-100">
                <td colSpan={2} className="border border-gray-300 px-4 py-2 font-medium">Total Actif immobilisé</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-medium">{formatAmount(data.fixedAssets.total.brut)}</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-medium">{formatAmount(data.fixedAssets.total.amort)}</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-medium">{formatAmount(data.fixedAssets.total.net)}</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-medium">{formatAmount(data.fixedAssets.total.netN1)}</td>
              </tr>

              {/* Actif circulant */}
              <tr className="bg-gray-50">
                <td colSpan={6} className="border border-gray-300 px-4 py-2 font-medium">Actif circulant</td>
              </tr>
              {data.currentAssets.inventory.map((item: any, index: number) => (
                <tr key={`inventory-${index}`}>
                  <td className="border border-gray-300 px-4 py-2">{item.code}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.label}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(item.brut)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(item.amort)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(item.net)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(item.netN1)}</td>
                </tr>
              ))}
              <tr className="bg-gray-100">
                <td colSpan={2} className="border border-gray-300 px-4 py-2 font-medium">Total Actif circulant</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-medium">{formatAmount(data.currentAssets.total.brut)}</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-medium">{formatAmount(data.currentAssets.total.amort)}</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-medium">{formatAmount(data.currentAssets.total.net)}</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-medium">{formatAmount(data.currentAssets.total.netN1)}</td>
              </tr>

              {/* Total Actif */}
              <tr className="bg-gray-700 text-white">
                <td colSpan={2} className="border border-gray-300 px-4 py-2 font-bold">TOTAL ACTIF</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-bold">{formatAmount(data.grandTotal.brut)}</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-bold">{formatAmount(data.grandTotal.amort)}</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-bold">{formatAmount(data.grandTotal.net)}</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-bold">{formatAmount(data.grandTotal.netN1)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Passif */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-black">PASSIF</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Code</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Libellé</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Net</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Net N-1</th>
              </tr>
            </thead>
            <tbody>
              {/* Capitaux propres */}
              <tr className="bg-gray-50">
                <td colSpan={4} className="border border-gray-300 px-4 py-2 font-medium">Capitaux propres</td>
              </tr>
              {data.equity.capital.map((item: any, index: number) => (
                <tr key={`capital-${index}`}>
                  <td className="border border-gray-300 px-4 py-2">{item.code}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.label}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(item.net)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(item.netN1)}</td>
                </tr>
              ))}
              <tr className="bg-gray-100">
                <td colSpan={2} className="border border-gray-300 px-4 py-2 font-medium">Total Capitaux propres</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-medium">{formatAmount(data.equity.total.net)}</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-medium">{formatAmount(data.equity.total.netN1)}</td>
              </tr>

              {/* Total Passif */}
              <tr className="bg-gray-700 text-white">
                <td colSpan={2} className="border border-gray-300 px-4 py-2 font-bold">TOTAL PASSIF</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-bold">{formatAmount(data.grandTotal.net)}</td>
                <td className="border border-gray-300 px-4 py-2 text-right font-bold">{formatAmount(data.grandTotal.netN1)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const renderIncomeStatement = () => {
    if (!data || !data.operatingIncome || !data.operatingExpenses || !data.netResult) {
      return <div>Données insuffisantes pour le compte de résultat</div>;
    }

    return (
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Code</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Libellé</th>
            <th className="border border-gray-300 px-4 py-2 text-right">N</th>
            <th className="border border-gray-300 px-4 py-2 text-right">N-1</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Variation</th>
          </tr>
        </thead>
        <tbody>
          {/* Produits d'exploitation */}
          <tr className="bg-gray-50">
            <td colSpan={5} className="border border-gray-300 px-4 py-2 font-medium">Produits d'exploitation</td>
          </tr>
          {data.operatingIncome.sales.map((item: any, index: number) => (
            <tr key={`sales-${index}`}>
              <td className="border border-gray-300 px-4 py-2">{item.code}</td>
              <td className="border border-gray-300 px-4 py-2">{item.label}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(item.current)}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(item.previous)}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{item.variation}%</td>
            </tr>
          ))}
          <tr className="bg-gray-100">
            <td colSpan={2} className="border border-gray-300 px-4 py-2 font-medium">Total Produits d'exploitation</td>
            <td className="border border-gray-300 px-4 py-2 text-right font-medium">{formatAmount(data.operatingIncome.total.current)}</td>
            <td className="border border-gray-300 px-4 py-2 text-right font-medium">{formatAmount(data.operatingIncome.total.previous)}</td>
            <td className="border border-gray-300 px-4 py-2 text-right font-medium">{data.operatingIncome.total.variation}%</td>
          </tr>

          {/* Charges d'exploitation */}
          <tr className="bg-gray-50">
            <td colSpan={5} className="border border-gray-300 px-4 py-2 font-medium">Charges d'exploitation</td>
          </tr>
          {data.operatingExpenses.purchases.map((item: any, index: number) => (
            <tr key={`purchases-${index}`}>
              <td className="border border-gray-300 px-4 py-2">{item.code}</td>
              <td className="border border-gray-300 px-4 py-2">{item.label}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(item.current)}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(item.previous)}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{item.variation}%</td>
            </tr>
          ))}
          <tr className="bg-gray-100">
            <td colSpan={2} className="border border-gray-300 px-4 py-2 font-medium">Total Charges d'exploitation</td>
            <td className="border border-gray-300 px-4 py-2 text-right font-medium">{formatAmount(data.operatingExpenses.total.current)}</td>
            <td className="border border-gray-300 px-4 py-2 text-right font-medium">{formatAmount(data.operatingExpenses.total.previous)}</td>
            <td className="border border-gray-300 px-4 py-2 text-right font-medium">{data.operatingExpenses.total.variation}%</td>
          </tr>

          {/* Résultat net */}
          <tr className="bg-gray-700 text-white">
            <td colSpan={2} className="border border-gray-300 px-4 py-2 font-bold">RÉSULTAT NET</td>
            <td className="border border-gray-300 px-4 py-2 text-right font-bold">{formatAmount(data.netResult.current)}</td>
            <td className="border border-gray-300 px-4 py-2 text-right font-bold">{formatAmount(data.netResult.previous)}</td>
            <td className="border border-gray-300 px-4 py-2 text-right font-bold">{data.netResult.variation}%</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const renderCashFlow = () => {
    if (!data || !data.operatingActivities || !data.netCashChange) {
      return <div>Données insuffisantes pour le tableau des flux</div>;
    }

    return (
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Code</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Libellé</th>
            <th className="border border-gray-300 px-4 py-2 text-right">N</th>
            <th className="border border-gray-300 px-4 py-2 text-right">N-1</th>
          </tr>
        </thead>
        <tbody>
          {/* Flux d'exploitation */}
          <tr className="bg-gray-50">
            <td colSpan={4} className="border border-gray-300 px-4 py-2 font-medium">Flux de trésorerie liés à l'exploitation</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">{data.operatingActivities.netResult.code}</td>
            <td className="border border-gray-300 px-4 py-2">{data.operatingActivities.netResult.label}</td>
            <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(data.operatingActivities.netResult.current)}</td>
            <td className="border border-gray-300 px-4 py-2 text-right">{formatAmount(data.operatingActivities.netResult.previous)}</td>
          </tr>

          {/* Variation de trésorerie */}
          <tr className="bg-gray-700 text-white">
            <td colSpan={2} className="border border-gray-300 px-4 py-2 font-bold">VARIATION DE TRÉSORERIE</td>
            <td className="border border-gray-300 px-4 py-2 text-right font-bold">{formatAmount(data.netCashChange.current)}</td>
            <td className="border border-gray-300 px-4 py-2 text-right font-bold">{formatAmount(data.netCashChange.previous)}</td>
          </tr>
        </tbody>
      </table>
    );
  };  return (
    <div className="printable-report bg-white p-8">
      {/* En-tête du rapport avec les informations de l'organisation - réduit en hauteur */}
      <div className="mb-4">        <div className="flex justify-between items-center">
          {/* Logo et informations de l'organisation (alignés à gauche) */}
          <div className="flex items-center space-x-3 w-2/3">
            {/* Logo de l'entreprise */}
            {organization.logo ? (
              <img 
                src={organization.logo} 
                alt={`${organization.name} Logo`} 
                className="h-12 w-auto object-contain"
                style={{ maxWidth: '45px' }}
              />
            ) : (
              <div className="h-12 w-12 bg-gray-100 flex items-center justify-center border border-gray-300 rounded">
                <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
            )}
            
            {/* Informations de l'organisation - Compactes */}
            <div>
              <h1 className="text-lg font-bold">{organization.name || 'Nom de l\'entreprise non défini'}</h1>
              <div className="flex flex-wrap text-xs space-x-2">
                {organization.registrationNumber && <span>RCCM: {organization.registrationNumber}</span>}
                {organization.taxId && <span>NINEA: {organization.taxId}</span>}
                {organization.phone && <span>Tél: {organization.phone}</span>}
              </div>
              <div className="text-xs text-gray-600">
                {organization.address && <span>{organization.address}</span>}
                {organization.email && <span className="ml-2">{organization.email}</span>}
              </div>
            </div>
          </div>          {/* QR Code d'authentification (aligné à droite) */}
          <div className="w-1/3 flex justify-end">
            <div className="text-right flex flex-col items-end">
              <QRCodeSVG 
                value={qrValue}
                size={60}
                level="H"
              />
              <p className="text-xs text-gray-500 mt-1">Authentification</p>
            </div>
          </div>
        </div>
          {/* Titre et exercice juste en dessous */}
        <div className="mt-3 mb-3 text-center border-t border-gray-200 pt-2">
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-sm">Exercice {date}</p>
          <p className="text-xs text-gray-500 mt-1">Document généré le {new Date().toLocaleDateString('fr-FR')} par {generatedBy}</p>
        </div>
      </div>

      {/* Contenu du rapport selon le type */}
      <div className="mb-8">
        {type === 'balance' && renderBalanceSheet()}
        {type === 'income' && renderIncomeStatement()}
        {type === 'cashflow' && renderCashFlow()}
      </div>      {/* Pied de page */}
      <div className="mt-8 pt-4 border-t border-gray-300 text-gray-600 text-sm">
        <div className="flex justify-between items-center">
          <p>Document certifié conforme aux données comptables</p>
          <p>{organization.name} &copy; {new Date().getFullYear()}</p>
        </div>
        <div className="text-center text-xs text-gray-500 mt-2">
          &copy; Produit par Wanzo, développé par i-kiotahub
        </div>
      </div>
    </div>
  );
}
