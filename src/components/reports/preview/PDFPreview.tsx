import React from 'react';
import { DocumentHeader } from './DocumentHeader';

interface PDFPreviewProps {
  data: any;
}

export function PDFPreview({ data }: PDFPreviewProps) {
  const mockCompany = {
    name: 'ENTREPRISE ABC SARL',
    address: '123 Avenue du Commerce, Kinshasa',
    registrationNumber: 'CD/KIN/RCCM/22-B-01234'
  };

  const mockDocument = {
    type: 'balance' as const,
    period: 'Exercice 2024',
    generatedBy: 'John Doe',
    generatedAt: new Date().toISOString(),
    isAudited: true
  };

  const mockMetrics = {
    creditScore: 85,
    financialRating: 'A+',
    carbonFootprint: 12.5
  };

  return (
    <div className="h-96 p-6 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <DocumentHeader 
          company={mockCompany}
          document={mockDocument}
          metrics={mockMetrics}
        />

        {/* Contenu du document */}
        <div className="space-y-4">
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

        {/* Pied de page */}
        <div className="text-sm text-gray-500 text-center pt-4 border-t">
          <p>Document généré automatiquement par Kiota Suit Comptabilité</p>
        </div>
      </div>
    </div>
  );
}