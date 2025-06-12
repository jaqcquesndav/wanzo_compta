import { FileText, Download, Eye } from 'lucide-react';
import { Button } from '../ui/Button';
import { JOURNAL_TYPES } from '../../config/accounting';
import type { JournalEntry } from '../../types/accounting';
import { useCurrency } from '../../hooks/useCurrency';

interface JournalEntryViewProps {
  entry: JournalEntry;
  onDownloadAttachment?: (url: string) => void;
  onViewAttachment?: (url: string) => void;
}

export function JournalEntryView({ entry, onDownloadAttachment, onViewAttachment }: JournalEntryViewProps) {
  const { formatConverted } = useCurrency();
  
  const formatAmount = (amount: number) => {
    return formatConverted(amount);
  };
  
  const getJournalLabel = (type: string) => {
    return JOURNAL_TYPES[type as keyof typeof JOURNAL_TYPES]?.label || type;
  };
  
  return (
    <div className="space-y-6">
      {/* En-tête de l'écriture */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-text-tertiary">Journal</p>
          <p className="font-medium text-text-primary">{getJournalLabel(entry.journalType)}</p>
        </div>
        <div>
          <p className="text-sm text-text-tertiary">Date</p>
          <p className="font-medium text-text-primary">{new Date(entry.date).toLocaleDateString('fr-FR')}</p>
        </div>
        <div>
          <p className="text-sm text-text-tertiary">N° Pièce</p>
          <p className="font-medium text-text-primary">{entry.reference}</p>
        </div>
        <div>
          <p className="text-sm text-text-tertiary">Statut</p>
          <p className="font-medium text-text-primary capitalize">{entry.status}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-text-tertiary">Libellé</p>
        <p className="font-medium text-text-primary">{entry.description}</p>
      </div>

      {/* Tableau des lignes d'écriture */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="text-left">Compte</th>
              <th className="text-left">Libellé</th>
              <th className="text-right">TVA</th>
              <th className="text-right">Débit</th>
              <th className="text-right">Crédit</th>
            </tr>
          </thead>
          <tbody>
            {entry.lines.map((line) => (
              <tr key={line.id}>
                <td className="whitespace-nowrap font-medium">
                  {line.accountCode}
                </td>
                <td className="text-text-secondary">
                  {line.description}
                </td>
                <td className="text-right">
                  {line.vatAmount ? (
                    <div>
                      <div>{line.vatCode}</div>
                      <div className="text-xs text-text-tertiary">
                        {formatAmount(line.vatAmount)}
                      </div>
                    </div>
                  ) : '-'}
                </td>
                <td className="text-right">
                  {line.debit > 0 ? formatAmount(line.debit) : ''}
                </td>
                <td className="text-right">
                  {line.credit > 0 ? formatAmount(line.credit) : ''}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-tertiary">
            <tr>
              <td colSpan={2} className="text-sm font-medium">
                Totaux
              </td>
              <td className="text-sm text-right font-medium">
                {entry.totalVat > 0 && formatAmount(entry.totalVat)}
              </td>
              <td className="text-sm text-right font-medium">
                {formatAmount(entry.totalDebit)}
              </td>
              <td className="text-sm text-right font-medium">
                {formatAmount(entry.totalCredit)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Pièces justificatives */}
      {entry.attachments && entry.attachments.length > 0 && (
        <div className="border-t border-primary pt-4">
          <h3 className="text-sm font-medium text-text-primary mb-3">Pièces justificatives</h3>
          <div className="grid grid-cols-2 gap-4">
            {entry.attachments.map(attachment => (
              <div 
                key={attachment.id}
                className="flex items-center justify-between p-3 bg-tertiary rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-text-tertiary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {attachment.name}
                    </p>
                    <p className="text-xs text-text-tertiary">
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