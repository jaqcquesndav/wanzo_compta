import React from 'react';
import { FormField, Select } from '../../../ui/Form';
import type { AccountingUnit } from '../../../../types/accounting-levels';

interface UnitFormFieldsProps {
  unit: Partial<AccountingUnit>;
  existingUnits: AccountingUnit[];
  onChange: (field: keyof AccountingUnit, value: string) => void;
}

export function UnitFormFields({ unit, existingUnits, onChange }: UnitFormFieldsProps) {
  return (
    <>
      <FormField label="Nom">
        <input
          type="text"
          value={unit.name || ''}
          onChange={(e) => onChange('name', e.target.value)}
          className="form-input"
          placeholder="Nom de l'unité"
        />
      </FormField>

      <FormField label="Code">
        <input
          type="text"
          value={unit.code || ''}
          onChange={(e) => onChange('code', e.target.value)}
          className="form-input"
          placeholder="Code unique"
        />
      </FormField>

      <FormField label="Type">
        <Select
          value={unit.type}
          onChange={(e) => onChange('type', e.target.value)}
          options={[
            { value: 'headquarters', label: 'Siège' },
            { value: 'subsidiary', label: 'Filiale' },
            { value: 'branch', label: 'Succursale' }
          ]}
        />
      </FormField>
    </>
  );
}