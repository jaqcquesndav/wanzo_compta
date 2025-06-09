import React from 'react';
import { FormField, Select } from '../../ui/Form';
import { Tag } from 'lucide-react';

interface AnalyticCategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
  type: 'sales' | 'expenses';
}

export function AnalyticCategoryFilter({ value, onChange, categories, type }: AnalyticCategoryFilterProps) {
  return (
    <FormField 
      label={type === 'sales' ? 'Catégorie de vente' : 'Catégorie de dépense'} 
      icon={Tag}
    >
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={[
          { value: '', label: 'Toutes les catégories' },
          ...categories.map(category => ({
            value: category,
            label: category
          }))
        ]}
      />
    </FormField>
  );
}