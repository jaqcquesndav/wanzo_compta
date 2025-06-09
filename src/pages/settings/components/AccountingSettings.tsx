import React from 'react';
import { FormField, Select } from '../../../components/ui/Form';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

export function AccountingSettings() {
  return (
    <div className="space-y-6">
      <Card title="Configuration comptable">
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <FormField label="Plan comptable">
              <Select
                options={[
                  { value: 'SYSCOHADA', label: 'SYSCOHADA' },
                  { value: 'IFRS', label: 'IFRS' }
                ]}
              />
            </FormField>

            <FormField label="Méthode d'amortissement par défaut">
              <Select
                options={[
                  { value: 'linear', label: 'Linéaire' },
                  { value: 'degressive', label: 'Dégressif' }
                ]}
              />
            </FormField>

            <FormField label="TVA par défaut">
              <Select
                options={[
                  { value: '18', label: '18%' },
                  { value: '0', label: '0%' }
                ]}
              />
            </FormField>

            <FormField label="Validation des écritures">
              <Select
                options={[
                  { value: 'auto', label: 'Automatique' },
                  { value: 'manual', label: 'Manuelle' }
                ]}
              />
            </FormField>
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              Enregistrer la configuration
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}