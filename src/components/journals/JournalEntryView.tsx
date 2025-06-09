import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { Button } from '../ui/Button';
import { JOURNAL_TYPES } from '../../config/accounting';
import type { JournalEntry } from '../../types/accounting';

interface JournalEntryViewProps {
  entry: JournalEntry;
  onDownloadAttachment?: (url: string) => void;
  onViewAttachment?: (url: string) => void;
}

export function JournalEntryView({ entry, onDownloadAttachment, onViewAttachment }: JournalEntryViewProps) {
  const formatAmount = (amount: number) => {
    return amount.toLocaleString('fr-FR', { 
      style: 'currency', 
      currency: 'XOF' 
    });
  };
  
  const getJournalLabel = (type: string) => {
    return JOURNAL_TYPES[type as keyof typeof JOURNAL_TYPES]?.label || type;
  };
  
  return (
    <div className="space-y-6">
      {/* En-tête de l'écriture */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Journal</p>
          <p className="font-medium">{getJournalLabel(entry.journalType)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p className="font-medium">{new Date(entry.date).toLocaleDateString('fr-FR')}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">N° Pièce</p>
          <p className="font-medium">{entry.reference}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Statut</p>
          <p className="font-medium capitalize">{entry.status}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500">Libellé</p>
        <p className="font-medium">{entry.description}</p>
      </div>

      {/* Tableau des lignes d'écriture */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Compte</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Libellé</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">TVA</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Débit</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Crédit</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entry.lines.map((line) => (
              <tr key={line.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {line.accountCode}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {line.description}
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">
                  {line.vatAmount ? (
                    <div>
                      <div>{line.vatCode}</div>
                      <div className="text-xs text-gray-500">
                        {formatAmount(line.vatAmount)}
                      </div>
                    </div>
                  ) : '-'}
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">
                  {line.debit > 0 ? formatAmount(line.debit) : ''}
                </td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">
                  {line.credit > 0 ? formatAmount(line.credit) : ''}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={2} className="px-6 py-3 text-sm font-medium text-gray-900">
                Totaux
              </td>
              <td className="px-6 py-3 text-sm text-right font-medium text-gray-900">
                {entry.totalVat > 0 && formatAmount(entry.totalVat)}
              </td>
              <td className="px-6 py-3 text-sm text-right font-medium text-gray-900">
                {formatAmount(entry.totalDebit)}
              </td>
              <td className="px-6 py-3 text-sm text-right font-medium text-gray-900">
                {formatAmount(entry.totalCredit)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Pièces justificatives */}
      {entry.attachments && entry.attachments.length > 0 && (
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Pièces justificatives</h3>
          <div className="grid grid-cols-2 gap-4">
            {entry.attachments.map(attachment => (
              <div 
                key={attachment.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {attachment.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {attachment.status === 'uploaded' ? 'Téléchargé' : attachment.status}
                    </p>
                  </div>
                </div>
                {attachment.url && (
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Eye}
                      onClick={() => onViewAttachment?.(attachment.url!)}
                    >
                      Voir
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Download}
                      onClick={() => onDownloadAttachment?.(attachment.url!)}
                    >
                      Télécharger
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}