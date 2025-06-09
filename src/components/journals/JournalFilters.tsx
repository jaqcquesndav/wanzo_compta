import React from 'react';
import { FormField, Input, Select } from '../ui/Form';
import { Search, Calendar } from 'lucide-react';
import { JOURNAL_TYPES, JOURNAL_LABELS } from '../../config/accounting';
import type { JournalFilters } from '../../hooks/useJournalFilters';

interface JournalFiltersProps {
  onFilterChange: (filters: Partial<JournalFilters>) => void;
}

export function JournalFilters({ onFilterChange }: JournalFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <FormField label="Rechercher">
        <Input
          placeholder="Rechercher..."
          icon={Search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </FormField>

      <FormField label="Journal">
        <Select
          options={[
            { value: 'all', label: 'Tous les journaux' },
            ...Object.entries(JOURNAL_LABELS).map(([value, label]) => ({
              value,
              label
            }))
          ]}
          onChange={(e) => onFilterChange({ journalType: e.target.value })}
        />
      </FormField>

      <FormField label="Date début">
        <Input
          type="date"
          icon={Calendar}
          onChange={(e) => onFilterChange({ startDate: e.target.value })}
        />
      </FormField>

      <FormField label="Date fin">
        <Input
          type="date"
          icon={Calendar}
          onChange={(e) => onFilterChange({ endDate: e.target.value })}
        />
      </FormField>
    </div>
  );
}