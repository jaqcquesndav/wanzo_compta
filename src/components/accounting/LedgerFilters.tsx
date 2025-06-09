import React from 'react';
import { FormField, Input, Select } from '../ui/Form';
import { Search, Calendar } from 'lucide-react';
import { ACCOUNT_TYPES, ACCOUNT_TYPE_LABELS } from '../../config/accounting';

interface LedgerFiltersProps {
  onFilterChange: (filters: LedgerFilters) => void;
}

export interface LedgerFilters {
  search: string;
  accountType: string;
  startDate: string;
  endDate: string;
  balanceType: 'all' | 'debit' | 'credit';
}

export function LedgerFilters({ onFilterChange }: LedgerFiltersProps) {
  const handleChange = (field: keyof LedgerFilters, value: string) => {
    onFilterChange({
      search: '',
      accountType: 'all',
      startDate: '',
      endDate: '',
      balanceType: 'all',
      [field]: value
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      <FormField label="Rechercher">
        <Input
          placeholder="Code ou libellé..."
          icon={Search}
          onChange={(e) => handleChange('search', e.target.value)}
        />
      </FormField>

      <FormField label="Type de compte">
        <Select
          options={[
            { value: 'all', label: 'Tous les types' },
            ...Object.entries(ACCOUNT_TYPE_LABELS).map(([value, label]) => ({
              value,
              label
            }))
          ]}
          onChange={(e) => handleChange('accountType', e.target.value)}
        />
      </FormField>

      <FormField label="Date début">
        <Input
          type="date"
          icon={Calendar}
          onChange={(e) => handleChange('startDate', e.target.value)}
        />
      </FormField>

      <FormField label="Date fin">
        <Input
          type="date"
          icon={Calendar}
          onChange={(e) => handleChange('endDate', e.target.value)}
        />
      </FormField>

      <FormField label="Type de solde">
        <Select
          options={[
            { value: 'all', label: 'Tous les soldes' },
            { value: 'debit', label: 'Solde débiteur' },
            { value: 'credit', label: 'Solde créditeur' }
          ]}
          onChange={(e) => handleChange('balanceType', e.target.value as LedgerFilters['balanceType'])}
        />
      </FormField>
    </div>
  );
}