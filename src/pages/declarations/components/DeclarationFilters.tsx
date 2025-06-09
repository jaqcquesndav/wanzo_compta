import React from 'react';
import { FormField, Select } from '../../../components/ui/Form';

export function DeclarationFilters() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormField label="Type">
        <Select
          options={[
            { value: 'all', label: 'Tous les types' },
            { value: 'TVA', label: 'TVA' },
            { value: 'IS', label: 'Impôt sur les sociétés' },
            { value: 'TRIMF', label: 'TRIMF' }
          ]}
        />
      </FormField>

      <FormField label="Période">
        <Select
          options={[
            { value: 'all', label: 'Toutes les périodes' },
            { value: 'current', label: 'Période en cours' },
            { value: 'last', label: 'Période précédente' }
          ]}
        />
      </FormField>

      <FormField label="Statut">
        <Select
          options={[
            { value: 'all', label: 'Tous les statuts' },
            { value: 'draft', label: 'Brouillon' },
            { value: 'pending', label: 'À soumettre' },
            { value: 'submitted', label: 'Soumise' }
          ]}
        />
      </FormField>
    </div>
  );
}