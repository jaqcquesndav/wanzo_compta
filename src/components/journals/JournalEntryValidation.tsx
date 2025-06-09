import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import type { JournalValidation } from '../../modules/journal/types';

interface JournalEntryValidationProps {
  validation: JournalValidation;
}

export function JournalEntryValidation({ validation }: JournalEntryValidationProps) {
  if (!validation.errors.length && !validation.warnings.length) {
    return null;
  }

  return (
    <div className="space-y-2">
      {validation.errors.map((error, index) => (
        <div key={index} className="flex items-start space-x-2 text-red-600">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      ))}

      {validation.warnings.map((warning, index) => (
        <div key={index} className="flex items-start space-x-2 text-warning">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{warning}</p>
        </div>
      ))}

      {validation.isBalanced && (
        <div className="flex items-start space-x-2 text-success">
          <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">L'écriture est équilibrée</p>
        </div>
      )}
    </div>
  );
}