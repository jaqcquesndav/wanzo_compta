import React from 'react';
import { DocumentHeader } from './DocumentHeader';

interface PrintableReportProps {
  data: any;
  type: 'balance' | 'income' | 'cashflow';
}

export function PrintableReport({ data, type }: PrintableReportProps) {
  const titles = {
    balance: 'Bilan',
    income: 'Compte de Résultat',
    cashflow: 'Tableau des Flux de Trésorerie'
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white print:p-0">
      <DocumentHeader
        company={{
          name: 'ENTREPRISE ABC SARL',
          address: '123 Avenue du Commerce, Kinshasa',
          registrationNumber: 'CD/KIN/RCCM/22-B-01234'
        }}
        document={{
          type,
          period: 'Exercice 2024',
          generatedBy: 'John Doe',
          generatedAt: new Date().toISOString(),
          isAudited: true
        }}
        metrics={{
          creditScore: 85,
          financialRating: 'A+',
          carbonFootprint: 12.5
        }}
      />

      <div className="mt-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          {titles[type]}
        </h1>

        {/* Contenu du rapport selon le type */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left">Rubrique</th>
              <th className="border p-2 text-right">Montant</th>
            </tr>
          </thead>
          <tbody>
            {data?.items?.map((item: any, index: number) => (
              <tr key={index} className="border-b">
                <td className="border p-2">{item.label}</td>
                <td className="border p-2 text-right">
                  {new Intl.NumberFormat('fr-CD', {
                    style: 'currency',
                    currency: 'CDF'
                  }).format(item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-sm text-gray-500 text-center">
        <p>Document généré le {new Date().toLocaleDateString('fr-FR')}</p>
        <p>Kiota Suit Comptabilité</p>
      </div>
    </div>
  );
}