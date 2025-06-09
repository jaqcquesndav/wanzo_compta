import React from 'react';
import { FormField, Select } from '../../../ui/Form';
import type { AccountingLevel } from '../../../../types/accounting-levels';

interface AccountingTypeSelectorProps {
  value: AccountingLevel;
  onChange: (value: AccountingLevel) => void;
}

export function AccountingTypeSelector({ value, onChange }: AccountingTypeSelectorProps) {
  return (
    <FormField label="Type de comptabilité">
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value as AccountingLevel)}
        options={[
          { value: 'single', label: 'Comptabilité unique' },
          { value: 'multi', label: 'Comptabilité multi-niveaux' }
        ]}
      />
    </FormField>
  );
}