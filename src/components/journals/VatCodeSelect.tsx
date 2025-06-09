import React from 'react';
import { FormField, Select } from '../ui/Form';
import { VAT_CODES } from '../../config/accounting';

interface VatCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function VatCodeSelect({ value, onChange, disabled }: VatCodeSelectProps) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      options={[
        { value: '', label: 'Sans TVA' },
        ...Object.entries(VAT_CODES).map(([code, details]) => ({
          value: code,
          label: `${code} - ${details.description}`
        }))
      ]}
    />
  );
}