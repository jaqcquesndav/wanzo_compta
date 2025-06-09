import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { UserX, UserCheck } from 'lucide-react';
import type { UserWithDetails } from '../../hooks/useUsers';

interface UserStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: UserWithDetails;
}

export function UserStatusModal({ isOpen, onClose, onConfirm, user }: UserStatusModalProps) {
  const isDeactivating = user.status === 'active';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${isDeactivating ? 'Désactivation' : 'Activation'} de l'utilisateur`}
    >
      <div className="space-y-4">
        <div className={`p-4 rounded-lg ${
          isDeactivating ? 'bg-red-50' : 'bg-green-50'
        }`}>
          <div className="flex items-center">
            {isDeactivating ? (
              <UserX className="h-5 w-5 text-red-600 mr-2" />
            ) : (
              <UserCheck className="h-5 w-5 text-success mr-2" />
            )}
            <p className={`text-sm ${
              isDeactivating ? 'text-red-600' : 'text-success'
            }`}>
              Êtes-vous sûr de vouloir {isDeactivating ? 'désactiver' : 'activer'} l'utilisateur <strong>{user.name}</strong> ?
            </p>
          </div>
        </div>

        {isDeactivating && (
          <div className="text-sm text-gray-600">
            <p>La désactivation d'un utilisateur :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Empêche toute connexion à l'application</li>
              <li>Conserve l'historique des actions</li>
              <li>Peut être annulée à tout moment</li>
            </ul>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Annuler
          </Button>
          <Button
            variant={isDeactivating ? 'warning' : 'success'}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {isDeactivating ? 'Désactiver' : 'Activer'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}