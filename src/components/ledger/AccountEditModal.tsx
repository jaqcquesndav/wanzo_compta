import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { FormField, Input, Select } from '../ui/Form';
import { Button } from '../ui/Button';
import { useAccountingStore } from '../../stores/accountingStore';
import type { Account } from '../../types/accounting';

interface AccountEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  account?: Account | null;
  onSave: (data: Partial<Account>) => Promise<void>;
}

export function AccountEditModal({ isOpen, onClose, account, onSave }: AccountEditModalProps) {
  const { mode } = useAccountingStore();
  const [formData, setFormData] = useState<Partial<Account>>(account || {
    code: '',
    name: '',
    type: 'asset',
    standard: mode,
    isAnalytic: false
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={account ? 'Modifier le compte' : 'Nouveau compte'}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Code" labelClassName="flex items-center">
            <span className="text-destructive ml-1">*</span>
            <Input
              value={formData.code}
              onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
              placeholder="411000"
              required
            />
          </FormField>

          <FormField label="Type" labelClassName="flex items-center">
            <span className="text-destructive ml-1">*</span>
            <Select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Account['type'] }))}
            >
              <option value="asset">Actif</option>
              <option value="liability">Passif</option>
              <option value="equity">Capitaux propres</option>
              <option value="revenue">Produits</option>
              <option value="expense">Charges</option>
            </Select>
          </FormField>
        </div>

        <FormField label="Libellé" labelClassName="flex items-center">
          <span className="text-destructive ml-1">*</span>
          <Input
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Clients"
            required
          />
        </FormField>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isAnalytic"
            checked={formData.isAnalytic}
            onChange={(e) => setFormData(prev => ({ ...prev, isAnalytic: e.target.checked }))}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="isAnalytic" className="text-sm text-gray-700">
            Compte analytique
          </label>
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            isLoading={loading}
          >
            {account ? 'Modifier' : 'Créer'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}