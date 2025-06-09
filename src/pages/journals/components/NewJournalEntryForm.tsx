import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { JournalEntryLine } from './JournalEntryLine';
import { useJournalEntry } from '../../../lib/hooks/useJournalEntry';
import { JOURNAL_TYPES, JOURNAL_LABELS } from '../../../lib/constants/accounting';

interface NewJournalEntryFormProps {
  onClose: () => void;
  onSubmit?: (entry: any) => Promise<void>;
}

export function NewJournalEntryForm({ onClose, onSubmit }: NewJournalEntryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    lines,
    addLine,
    removeLine,
    updateLine,
    isBalanced,
    totalDebit,
    totalCredit
  } = useJournalEntry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isBalanced) return;

    setIsSubmitting(true);
    try {
      // Handle submission
      await onSubmit?.({
        lines,
        totalDebit,
        totalCredit
      });
      onClose();
    } catch (error) {
      console.error('Failed to submit journal entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Journal
          </label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            {Object.entries(JOURNAL_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Libellé
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="Description de l'écriture"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700">Lignes d'écriture</h3>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            icon={Plus}
            onClick={addLine}
          >
            Ajouter une ligne
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Compte</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Libellé</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Débit</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Crédit</th>
                <th className="px-3 py-2 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {lines.map((line, index) => (
                <JournalEntryLine
                  key={line.id}
                  line={line}
                  onUpdate={(updates) => updateLine(index, updates)}
                  onRemove={() => removeLine(index)}
                  isRemoveDisabled={lines.length === 1}
                />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} className="px-3 py-2 text-sm font-medium text-gray-700">
                  Total
                </td>
                <td className="px-3 py-2 text-right text-sm font-medium text-gray-700">
                  {totalDebit.toFixed(2)}
                </td>
                <td className="px-3 py-2 text-right text-sm font-medium text-gray-700">
                  {totalCredit.toFixed(2)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {!isBalanced && (
          <p className="mt-2 text-sm text-red-600">
            L'écriture n'est pas équilibrée. La différence est de {Math.abs(totalDebit - totalCredit).toFixed(2)}.
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={!isBalanced || isSubmitting}
          isLoading={isSubmitting}
        >
          Enregistrer
        </Button>
      </div>
    </form>
  );
}