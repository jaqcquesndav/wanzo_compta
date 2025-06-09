import React, { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { FormField, Input, Select } from '../../../components/ui/Form';

interface NewDeclarationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewDeclarationModal({ isOpen, onClose }: NewDeclarationModalProps) {
  const [declarationType, setDeclarationType] = useState('TVA');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nouvelle Déclaration"
    >
      <div className="space-y-6">
        <FormField label="Type de déclaration" required>
          <Select
            value={declarationType}
            onChange={(e) => setDeclarationType(e.target.value)}
            options={[
              { value: 'TVA', label: 'TVA' },
              { value: 'IS', label: 'Impôt sur les sociétés' },
              { value: 'TRIMF', label: 'TRIMF' }
            ]}
          />
        </FormField>

        <FormField label="Période" required>
          {declarationType === 'IS' ? (
            <Select
              options={[
                { value: '2024', label: '2024' },
                { value: '2023', label: '2023' }
              ]}
            />
          ) : (
            <Input
              type="month"
              defaultValue={new Date().toISOString().slice(0, 7)}
            />
          )}
        </FormField>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Annuler
          </Button>
          <Button variant="primary">
            Créer
          </Button>
        </div>
      </div>
    </Modal>
  );
}