import React from 'react';
import { FormField, Select } from '../../ui/Form';
import type { AccountingUnit } from '../../../types/accounting-levels';

interface AccountingUnitFormProps {
  unit: Partial<AccountingUnit>;
  existingUnits: AccountingUnit[];
  onChange: (unit: Partial<AccountingUnit>) => void;
}

export function AccountingUnitForm({ unit, existingUnits, onChange }: AccountingUnitFormProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField label="Nom">
        <input
          type="text"
          value={unit.name || ''}
          onChange={(e) => onChange({ ...unit, name: e.target.value })}
          className="form-input"
          placeholder="Nom de l'unité"
        />
      </FormField>

      <FormField label="Code">
        <input
          type="text"
          value={unit.code || ''}
          onChange={(e) => onChange({ ...unit, code: e.target.value })}
          className="form-input"
          placeholder="Code unique"
        />
      </FormField>

      <FormField label="Type">
        <Select
          value={unit.type}
          onChange={(e) => onChange({ ...unit, type: e.target.value as AccountingUnit['type'] })}
          options={[
            { value: 'headquarters', label: 'Siège' },
            { value: 'subsidiary', label: 'Filiale' },
            { value: 'branch', label: 'Succursale' }
          ]}
        />
      </FormField>

      {unit.type !== 'headquarters' && (
        <FormField label="Rattachement">
          <Select
            value={unit.parentId}
            onChange={(e) => onChange({ ...unit, parentId: e.target.value })}
            options={[
              { value: '', label: 'Sélectionner...' },
              ...existingUnits
                .filter(u => u.type === 'headquarters')
                .map(u => ({ value: u.id, label: u.name }))
            ]}
          />
        </FormField>
      )}
    </div>
  );
}