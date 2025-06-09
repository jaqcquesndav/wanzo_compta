import React from 'react';
import { FormField, Input } from '../ui/Form';
import { JournalSelector } from './JournalSelector';
import { generateJournalReference } from '../../modules/journal/utils/reference';

interface JournalEntryHeaderProps {
  journalType: string;
  date: string;
  reference: string;
  description: string;
  onChange: (field: string, value: string) => void;
}

export function JournalEntryHeader({
  journalType,
  date,
  reference,
  description,
  onChange
}: JournalEntryHeaderProps) {
  const handleJournalChange = (value: string) => {
    onChange('journalType', value);
    if (!reference) {
      const newReference = generateJournalReference(value, new Date(date));
      onChange('reference', newReference);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <JournalSelector
          value={journalType}
          onChange={handleJournalChange}
        />

        <FormField label="Date" required>
          <Input
            type="date"
            value={date}
            onChange={(e) => onChange('date', e.target.value)}
            required
          />
        </FormField>

        <FormField label="N° Pièce" required>
          <Input
            value={reference}
            onChange={(e) => onChange('reference', e.target.value)}
            placeholder="Ex: FAC2024-001"
            required
          />
        </FormField>
      </div>

      <FormField label="Libellé" required>
        <Input
          value={description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Description de l'écriture"
          required
        />
      </FormField>
    </div>
  );
}
