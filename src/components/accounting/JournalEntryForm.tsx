import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { FormField, Input, Select } from '../ui/Form';
import { Card } from '../ui/Card';
import { useJournalEntry } from '../../hooks/useJournalEntry';
import { JOURNAL_TYPES, JOURNAL_LABELS } from '../../config/accounting';

interface JournalEntryFormProps {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export function JournalEntryForm({ onSubmit, onCancel }: JournalEntryFormProps) {
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
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      date: formData.get('date'),
      journalType: formData.get('journalType'),
      description: formData.get('description'),
      lines,
      totalDebit,
      totalCredit
    };

    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Date" required>
          <Input
            type="date"
            name="date"
            required
          />
        </FormField>

        <FormField label="Journal" required>
          <Select
            name="journalType"
            required
            options={Object.entries(JOURNAL_LABELS).map(([value, label]) => ({
              value,
              label
            }))}
          />
        </FormField>
      </div>

      <FormField label="Libellé" required>
        <Input
          name="description"
          required
          placeholder="Description de l'écriture"
        />
      </FormField>

      <Card title="Lignes d'écriture" className="mt-6">
        <div className="space-y-4">
          <div className="flex justify-end">
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
                  <tr key={line.id}>
                    <td className="px-3 py-2">
                      <Input
                        value={line.accountId}
                        onChange={(e) => updateLine(index, { accountId: e.target.value })}
                        placeholder="411"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <Input
                        value={line.description}
                        onChange={(e) => updateLine(index, { description: e.target.value })}
                        placeholder="Libellé"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <Input
                        type="number"
                        value={line.debit || ''}
                        onChange={(e) => updateLine(index, { debit: parseFloat(e.target.value) || 0 })}
                        className="text-right"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <Input
                        type="number"
                        value={line.credit || ''}
                        onChange={(e) => updateLine(index, { credit: parseFloat(e.target.value) || 0 })}
                        className="text-right"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        onClick={() => removeLine(index)}
                        disabled={lines.length === 1}
                        className="text-red-500 hover:text-red-700 disabled:opacity-50"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </td>
                  </tr>
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
      </Card>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={!isBalanced}
        >
          Enregistrer
        </Button>
      </div>
    </form>
  );
}