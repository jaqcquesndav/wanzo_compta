import React from 'react';
import { FormField, Select } from '../../ui/Form';
import { Calendar } from 'lucide-react';

interface AnalyticDateFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function AnalyticDateFilter({ value, onChange }: AnalyticDateFilterProps) {
  return (
    <FormField label="Période" icon={Calendar}>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={[
          { value: 'today', label: 'Aujourd\'hui' },
          { value: 'week', label: 'Cette semaine' },
          { value: 'month', label: 'Ce mois' },
          { value: 'quarter', label: 'Ce trimestre' },
          { value: 'year', label: 'Cette année' },
          { value: 'custom', label: 'Période personnalisée' }
        ]}
      />
    </FormField>
  );
}