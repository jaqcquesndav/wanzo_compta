import React from 'react';
import { FormField, Input } from '../../ui/Form';
import { DollarSign } from 'lucide-react';

interface AnalyticAmountFilterProps {
  minValue: string;
  maxValue: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}

export function AnalyticAmountFilter({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange
}: AnalyticAmountFilterProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField label="Montant minimum" icon={DollarSign}>
        <Input
          type="number"
          value={minValue}
          onChange={(e) => onMinChange(e.target.value)}
          placeholder="0"
        />
      </FormField>
      <FormField label="Montant maximum" icon={DollarSign}>
        <Input
          type="number"
          value={maxValue}
          onChange={(e) => onMaxChange(e.target.value)}
          placeholder="999999999"
        />
      </FormField>
    </div>
  );
}