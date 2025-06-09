import React from 'react';
import { FormField, Select } from '../ui/Form';
import { JOURNAL_TYPES } from '../../modules/journal/constants';

interface JournalSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function JournalSelector({ value, onChange }: JournalSelectorProps) {
  return (
    <FormField label="Journal" required>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={Object.entries(JOURNAL_TYPES).map(([key, journal]) => ({
          value: key,
          label: `${journal.code} - ${journal.label}`
        }))}
      />
      {value && (
        <p className="mt-1 text-sm text-gray-500">
          {JOURNAL_TYPES[value as keyof typeof JOURNAL_TYPES].description}
        </p>
      )}
    </FormField>
  );
}