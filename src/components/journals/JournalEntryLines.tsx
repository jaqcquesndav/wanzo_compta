import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { JournalEntryLine } from './JournalEntryLine';
import type { JournalLine } from '../../types/accounting';

interface JournalEntryLinesProps {
  lines: JournalLine[];
  onUpdate: (index: number, updates: Partial<JournalLine>) => void;
  onRemove: (index: number) => void;
  onAdd: () => void;
  totalDebit: number;
  totalCredit: number;
  totalVat: number;
}

export function JournalEntryLines({
  lines,
  onUpdate,
  onRemove,
  onAdd,
  totalDebit,
  totalCredit,
  totalVat
}: JournalEntryLinesProps) {
  const formatAmount = (amount: number) => 
    amount.toLocaleString('fr-FR', { minimumFractionDigits: 2 });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">Lignes d'écriture</h3>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          icon={Plus}
          onClick={onAdd}
        >
          Ajouter une ligne
        </Button>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Compte</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Libellé</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">TVA</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Débit</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Crédit</th>
                <th className="px-3 py-2 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {lines.map((line, index) => (
                <JournalEntryLine
                  key={line.id}
                  line={line}
                  onUpdate={(updates) => onUpdate(index, updates)}
                  onRemove={() => onRemove(index)}
                  isRemoveDisabled={lines.length === 1}
                />
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-medium">
                <td colSpan={2} className="px-3 py-2 text-sm text-gray-700">
                  Total
                </td>
                <td className="px-3 py-2 text-sm text-gray-700">
                  {totalVat > 0 && (
                    <span>TVA: {formatAmount(totalVat)}</span>
                  )}
                </td>
                <td className="px-3 py-2 text-right text-sm text-gray-700">
                  {formatAmount(totalDebit)}
                </td>
                <td className="px-3 py-2 text-right text-sm text-gray-700">
                  {formatAmount(totalCredit)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}