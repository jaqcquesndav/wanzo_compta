import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { FormField, Input, Select } from '../ui/Form';
import { Button } from '../ui/Button';
import { JournalEntryLines } from './JournalEntryLines';
import { useJournalEntry } from '../../hooks/useJournalEntry';
import { JOURNAL_TYPES } from '../../config/accounting';
import type { JournalEntry } from '../../types/accounting';

interface AgentEntryEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: JournalEntry;
  onSave: (entry: JournalEntry) => Promise<void>;
  onValidate: (entry: JournalEntry) => Promise<void>;
}

export function AgentEntryEditModal({
  isOpen,
  onClose,
  entry,
  onSave,
  onValidate
}: AgentEntryEditModalProps) {
  const {
    entry: editedEntry,
    errors,
    totals,
    updateEntry,
    addLine,
    removeLine,
    updateLine,
    validate
  } = useJournalEntry(entry);

  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<'save' | 'validate'>('save');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    if (!validation.isValid) return;

    setLoading(true);
    try {
      if (action === 'validate') {
        await onValidate(editedEntry as JournalEntry);
      } else {
        await onSave(editedEntry as JournalEntry);
      }
      onClose();
    } catch (error) {
      console.error(`Failed to ${action} agent entry:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Modifier l'écriture ${entry.reference} de l'agent comptable`}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Date" required>
            <Input
              type="date"
              value={editedEntry.date || ''}
              onChange={(e) => updateEntry({ date: e.target.value })}
              required
            />
          </FormField>

          <FormField label="Journal" required>
            <Select
              value={editedEntry.journalType || ''}
              onChange={(e) => updateEntry({ journalType: e.target.value as 'sales' | 'purchases' | 'bank' | 'cash' | 'general' })}
              options={Object.entries(JOURNAL_TYPES).map(([key, value]) => ({
                value: key.toLowerCase(),
                label: value.label
              }))}
              required
            />
          </FormField>

          <div className="col-span-2">
            <FormField label="N° Pièce" required>
              <Input
                value={editedEntry.reference || ''}
                onChange={(e) => updateEntry({ reference: e.target.value })}
                required
              />
            </FormField>
          </div>

          <div className="col-span-2">
            <FormField label="Libellé" required>
              <Input
                value={editedEntry.description || ''}
                onChange={(e) => updateEntry({ description: e.target.value })}
                required
              />
            </FormField>
          </div>
        </div>

        <JournalEntryLines
          lines={editedEntry.lines || []}
          onUpdate={updateLine}
          onRemove={removeLine}
          onAdd={addLine}
          totalDebit={totals.totalDebit}
          totalCredit={totals.totalCredit}
          totalVat={totals.totalVat}
        />

        {errors.length > 0 && (
          <div className="bg-red-50 p-4 rounded">
            <h3 className="text-sm font-medium text-red-800">Erreurs</h3>
            <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end space-x-3 border-t pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Annuler
          </Button>
          
          <Button
            type="submit"
            variant="secondary"
            onClick={() => setAction('save')}
            disabled={errors.length > 0 || loading}
            isLoading={loading && action === 'save'}
          >
            Enregistrer
          </Button>
          
          <Button
            type="submit"
            variant="success"
            onClick={() => setAction('validate')}
            disabled={errors.length > 0 || loading}
            isLoading={loading && action === 'validate'}
          >
            Valider et Enregistrer
          </Button>
        </div>
      </form>
    </Modal>
  );
}
