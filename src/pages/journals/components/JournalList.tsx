import React from 'react';
import type { JournalEntry } from '../../../types/accounting';

interface JournalListProps {
  entries: JournalEntry[];
}

export function JournalList({ entries }: JournalListProps) {
  const formatAmount = (amount: number) => {
    return amount.toLocaleString('fr-FR', { 
      style: 'currency', 
      currency: 'XOF' 
    });
  };

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              N° Pièce
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Journal
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Libellé
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Débit
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Crédit
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entries.length === 0 ? (
            <tr>
              <td className="px-6 py-4 text-sm text-gray-500" colSpan={6}>
                Aucune écriture trouvée
              </td>
            </tr>
          ) : (
            entries.map(entry => (
              <React.Fragment key={entry.id}>
                <tr className="bg-gray-50">
                  <td className="px-6 py-2 text-sm font-medium text-gray-900">
                    {new Date(entry.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-900">
                    {entry.reference}
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-900">
                    {entry.journalType.toUpperCase()}
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-900" colSpan={3}>
                    {entry.description}
                  </td>
                </tr>
                {entry.lines.map(line => (
                  <tr key={line.id}>
                    <td className="px-6 py-2 text-sm text-gray-500" colSpan={3}>
                    </td>
                    <td className="px-6 py-2 text-sm text-gray-500">
                      {line.accountId} - {line.description}
                    </td>
                    <td className="px-6 py-2 text-sm text-gray-900 text-right">
                      {line.debit > 0 ? formatAmount(line.debit) : ''}
                    </td>
                    <td className="px-6 py-2 text-sm text-gray-900 text-right">
                      {line.credit > 0 ? formatAmount(line.credit) : ''}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}