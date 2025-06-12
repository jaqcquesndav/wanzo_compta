import React from 'react';
import { FormField, Input, Select } from '../ui/Form';
import { Button } from '../ui/Button';
import { ACCOUNT_TYPE_LABELS } from '../../config/accounting';
import type { Account } from '../../types/accounting';

interface AccountFormProps {
  account?: Partial<Account>;
  onSubmit: (data: Partial<Account>) => Promise<void>;
  onCancel: () => void;
}

export function AccountForm({ account, onSubmit, onCancel }: AccountFormProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const data = {
      code: formData.get('code') as string,
      name: formData.get('name') as string,
      type: formData.get('type') as Account['type'],
      isAnalytic: formData.get('isAnalytic') === 'true'
    };

    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Code" labelClassName="flex items-center">
          <span className="text-destructive ml-1">*</span>
          <Input
            name="code"
            defaultValue={account?.code}
            placeholder="411"
          />
        </FormField>

        <FormField label="Type" labelClassName="flex items-center">
          <span className="text-destructive ml-1">*</span>
          <Select
            name="type"
            defaultValue={account?.type}
          >
            {Object.entries(ACCOUNT_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
        </FormField>
      </div>

      <FormField label="Nom" labelClassName="flex items-center">
        <span className="text-destructive ml-1">*</span>
        <Input
          name="name"
          defaultValue={account?.name}
          placeholder="Clients"
        />
      </FormField>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isAnalytic"
          name="isAnalytic"
          defaultChecked={account?.isAnalytic}
          className="h-4 w-4 text-primary focus:ring-primary border-secondary rounded"
        />
        <label htmlFor="isAnalytic" className="ml-2 block text-sm text-text-secondary">
          Compte analytique
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Annuler
        </Button>
        <Button type="submit">
          {account ? 'Modifier' : 'Créer'}
        </Button>
      </div>
    </form>
  );
}