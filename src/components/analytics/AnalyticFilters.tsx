import React from 'react';
import { FormField, Select } from '../ui/Form';

interface AnalyticFiltersProps {
  onFilterChange: (filters: AnalyticFilters) => void;
}

interface AnalyticFilters {
  period: string;
  groupBy: string;
}

export function AnalyticFilters({ onFilterChange }: AnalyticFiltersProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField label="Période">
        <Select
          name="period"
          options={[
            { value: 'month', label: 'Ce mois' },
            { value: 'quarter', label: 'Ce trimestre' },
            { value: 'year', label: 'Cette année' }
          ]}
          onChange={(e) => onFilterChange({ 
            period: e.target.value,
            groupBy: 'month'
          })}
        />
      </FormField>

      <FormField label="Regrouper par">
        <Select
          name="groupBy"
          options={[
            { value: 'day', label: 'Jour' },
            { value: 'week', label: 'Semaine' },
            { value: 'month', label: 'Mois' }
          ]}
          onChange={(e) => onFilterChange({ 
            period: 'month',
            groupBy: e.target.value
          })}
        />
      </FormField>
    </div>
  );
}