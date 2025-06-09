import React from 'react';
import { FormField, Select } from '../ui/Form';

interface ReportFiltersProps {
  onFilterChange: (filters: ReportFilters) => void;
}

interface ReportFilters {
  period: string;
  format: 'pdf' | 'excel' | 'json';
}

export function ReportFilters({ onFilterChange }: ReportFiltersProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField label="Période">
        <Select
          name="period"
          options={[
            { value: 'current', label: 'Exercice en cours' },
            { value: 'last', label: 'Exercice précédent' },
            { value: 'custom', label: 'Période personnalisée' }
          ]}
          onChange={(e) => onFilterChange({ 
            period: e.target.value,
            format: 'pdf'
          })}
        />
      </FormField>

      <FormField label="Format">
        <Select
          name="format"
          options={[
            { value: 'pdf', label: 'PDF' },
            { value: 'excel', label: 'Excel' },
            { value: 'json', label: 'JSON' }
          ]}
          onChange={(e) => onFilterChange({ 
            period: 'current',
            format: e.target.value as 'pdf' | 'excel' | 'json'
          })}
        />
      </FormField>
    </div>
  );
}