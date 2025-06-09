import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { FormField, Input, Select } from '../ui/Form';
import { Button } from '../ui/Button';
import { Mail, Building } from 'lucide-react';
import { useUserActions } from '../../hooks/useUserActions';
import type { User } from '../../types/auth';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User & { department: string };
}

export function EditUserModal({ isOpen, onClose, user }: EditUserModalProps) {
  const { loading, updateUser } = useUserActions();
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email,
    department: user.department,
    role: user.role
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await updateUser(user.id, formData);
    if (result.success) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Modifier l'utilisateur"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Nom complet" required>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Jean Dupont"
            />
          </FormField>
          <FormField label="Email" required>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              icon={Mail}
              disabled
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Service" required>
            <Select
              value={formData.department}
              onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
              options={[
                { value: 'accounting', label: 'Comptabilité' },
                { value: 'finance', label: 'Finance' },
                { value: 'management', label: 'Direction' }
              ]}
              icon={Building}
            />
          </FormField>
          <FormField label="Rôle" required>
            <Select
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as User['role'] }))}
              options={[
                { value: 'admin', label: 'Administrateur' },
                { value: 'user', label: 'Utilisateur' }
              ]}
              disabled={user.role === 'superadmin'}
            />
          </FormField>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
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
            Enregistrer
          </Button>
        </div>
      </form>
    </Modal>
  );
}