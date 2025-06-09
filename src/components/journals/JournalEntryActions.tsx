import React from 'react';
import { Button } from '../ui/Button';
import { Save, Check, X } from 'lucide-react';
import type { JournalValidation } from '../../modules/journal/types';

interface JournalEntryActionsProps {
  validation: JournalValidation;
  onSaveDraft: () => void;
  onValidate: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function JournalEntryActions({
  validation,
  onSaveDraft,
  onValidate,
  onCancel,
  isSubmitting
}: JournalEntryActionsProps) {
  return (
    <div className="flex justify-end space-x-3 pt-4 border-t">
      <Button
        type="button"
        variant="secondary"
        icon={X}
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Annuler
      </Button>

      <Button
        type="button"
        variant="secondary"
        icon={Save}
        onClick={onSaveDraft}
        disabled={isSubmitting}
      >
        Enregistrer le brouillon
      </Button>

      <Button
        type="button"
        variant="primary"
        icon={Check}
        onClick={onValidate}
        disabled={!validation.isValid || isSubmitting}
        isLoading={isSubmitting}
      >
        Valider l'écriture
      </Button>
    </div>
  );
}