import React from 'react';
import { FormField, Select } from '../../../components/ui/Form';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { CURRENCIES } from '../../../config/currency';

export function GeneralSettings() {
  return (
    <div className="space-y-6">
      <Card title="Préférences générales">
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <FormField label="Langue par défaut">
              <Select
                options={[
                  { value: 'fr', label: 'Français' },
                  { value: 'en', label: 'English' }
                ]}
              />
            </FormField>

            <FormField label="Fuseau horaire">
              <Select
                options={[
                  { value: 'CAT', label: 'CAT (UTC+2)' }
                ]}
              />
            </FormField>

            <FormField label="Format de date">
              <Select
                options={[
                  { value: 'DD/MM/YYYY', label: 'JJ/MM/AAAA' },
                  { value: 'YYYY-MM-DD', label: 'AAAA-MM-JJ' }
                ]}
              />
            </FormField>

            <FormField label="Devise par défaut">
              <Select
                options={Object.values(CURRENCIES).map(currency => ({
                  value: currency.code,
                  label: `${currency.name} (${currency.symbol})`
                }))}
              />
            </FormField>
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              Enregistrer les préférences
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}