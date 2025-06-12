import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Checkbox } from './Checkbox';

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export function ConsentModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Consentement de partage de données",
  description = "En acceptant de partager vos données, vous contribuez à améliorer les services financiers pour votre entreprise."
}: ConsentModalProps) {
  const [acceptTerms, setAcceptTerms] = React.useState(false);

  const handleConfirm = () => {
    if (acceptTerms) {
      onConfirm();
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <div className="space-y-4">
        <p className="text-text-secondary">
          {description}
        </p>
        
        <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 text-sm text-text-secondary">
          <h3 className="font-semibold mb-2">Pourquoi partager vos données ?</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Facilite l'analyse pour un meilleur accès aux solutions de financement</li>
            <li>Permet d'évaluer précisément la cote de crédit de votre entreprise</li>
            <li>Contribue à l'amélioration des modèles d'intelligence artificielle de nos assistants</li>
            <li>Aide à personnaliser les conseils financiers, fiscaux et juridiques</li>
          </ul>
          <p className="mt-3">Ces données ne seront jamais utilisées à des fins qui vont à l'encontre des intérêts de votre entreprise.</p>
        </div>
        
        <Checkbox
          id="consent-checkbox"
          label="J'accepte le partage de mes données selon les termes décrits"
          checked={acceptTerms}
          onChange={e => setAcceptTerms(e.target.checked)}
          className="mt-2"
        />
        
        <div className="flex justify-end space-x-3 pt-2">
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!acceptTerms}
          >
            Confirmer
          </Button>
        </div>
      </div>
    </Modal>
  );
}
