import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { FormField, Input, Select } from '../ui/Form';
import { Button } from '../ui/Button';
import { JournalEntryLines } from './JournalEntryLines';
import { useJournalEntry } from '../../hooks/useJournalEntry';
import { JOURNAL_TYPES } from '../../config/accounting';
import type { JournalEntry } from '../../types/accounting';

interface JournalEntryEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: JournalEntry;
  onSave: (entry: JournalEntry) => Promise<void>;
}

export function JournalEntryEditModal({ isOpen, onClose, entry, onSave }: JournalEntryEditModalProps) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    if (!validation.isValid) return;

    setLoading(true);
    try {
      await onSave(editedEntry as JournalEntry);
      onClose();
    } catch (error) {
      console.error('Failed to save journal entry:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Modifier l'écriture ${entry.reference}`}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Date" required>
            <Input
              type="date"
              value={editedEntry.date}
              onChange={(e) => updateEntry({ date: e.target.value })}
              required
            />
          </FormField>

          <FormField label="Journal" required>
            <Select
              value={editedEntry.journalType}
              onChange={(e) => updateEntry({ journalType: e.target.value })}
              required
              options={Object.entries(JOURNAL_TYPES).map(([value, config]) => ({
                value,
                label: `${config.code} - ${config.label}`
              }))}
            />
          </FormField>

          <FormField label="N° Pièce" required>
            <Input
              value={editedEntry.reference}
              onChange={(e) => updateEntry({ reference: e.target.value })}
              placeholder="Ex: FAC2024-001"
              required
            />
          </FormField>
        </div>

        <FormField label="Libellé" required>
          <Input
            value={editedEntry.description}
            onChange={(e) => updateEntry({ description: e.target.value })}
            placeholder="Description de l'écriture"
            required
          />
        </FormField>

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
          <div className="space-y-1">
            {errors.map((error, index) => (
              <p key={index} className="text-sm text-red-600">{error}</p>
            ))}
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4 border-t">
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
            isLoading={loading}
            disabled={loading || errors.length > 0}
          >
            Enregistrer les modifications
          </Button>
        </div>
      </form>
    </Modal>
  );
}