import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertCircle, Unlock, Loader } from 'lucide-react';
import type { FiscalYear } from '../../hooks/useFiscalYear';

interface ReopenFiscalYearModalProps {
  isOpen: boolean;
  onClose: () => void;
  fiscalYear: FiscalYear;
  onConfirm: () => Promise<void>;
}

export function ReopenFiscalYearModal({ 
  isOpen, 
  onClose, 
  fiscalYear,
  onConfirm 
}: ReopenFiscalYearModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Réouverture de l'exercice ${fiscalYear.code}`}
    >
      <div className="space-y-6">
        <div className="bg-warning/10 p-4 rounded-lg">
          <div className="flex items-center text-warning">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p className="text-sm">
              La réouverture d'un exercice est une opération sensible qui nécessite des précautions :
            </p>
          </div>
          <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>Les écritures de clôture seront annulées</li>
            <li>Les reports à nouveau seront recalculés</li>
            <li>Les états financiers devront être régénérés</li>
            <li>Les déclarations fiscales pourraient nécessiter une révision</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            Assurez-vous d'avoir :
          </p>
          <ul className="mt-2 text-sm text-blue-600 list-disc list-inside space-y-1">
            <li>L'autorisation de votre hiérarchie</li>
            <li>Sauvegardé les états financiers actuels</li>
            <li>Documenté les raisons de cette réouverture</li>
            <li>Prévu les impacts sur les exercices suivants</li>
          </ul>
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            variant="warning"
            icon={loading ? Loader : Unlock}
            onClick={handleConfirm}
            isLoading={loading}
          >
            {loading ? 'Réouverture en cours...' : 'Réouvrir l\'exercice'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}