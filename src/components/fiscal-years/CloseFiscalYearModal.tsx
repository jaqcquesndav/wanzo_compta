import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import type { FiscalYear } from '../../hooks/useFiscalYear';
import { useFiscalYearActions } from '../../hooks/useFiscalYearActions';

interface CloseFiscalYearModalProps {
  isOpen: boolean;
  onClose: () => void;
  fiscalYear: FiscalYear;
}

export function CloseFiscalYearModal({ isOpen, onClose, fiscalYear }: CloseFiscalYearModalProps) {
  const { loading, closeFiscalYear } = useFiscalYearActions();
  const [result, setResult] = useState<any>(null);

  const handleClose = async () => {
    const result = await closeFiscalYear(fiscalYear);
    setResult(result);
    if (result.success) {
      setTimeout(onClose, 2000);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Clôture de l'exercice ${fiscalYear.code}`}
    >
      <div className="space-y-6">
        <div className="bg-warning/10 p-4 rounded-lg">
          <p className="text-sm text-warning">
            La clôture d'un exercice est une opération irréversible. Assurez-vous d'avoir :
          </p>
          <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
            <li>Validé tous les journaux comptables</li>
            <li>Effectué les rapprochements bancaires</li>
            <li>Généré et sauvegardé les états financiers</li>
            <li>Réalisé une sauvegarde des données</li>
          </ul>
        </div>

        {result && (
          <div className={`p-4 rounded-lg ${
            result.success ? 'bg-success/10' : 'bg-red-50'
          }`}>
            {result.success ? (
              <div className="flex items-center text-success">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>{result.message}</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600">
                <XCircle className="h-5 w-5 mr-2" />
                <span>{result.message}</span>
              </div>
            )}

            {result.checks && (
              <div className="mt-4 space-y-2">
                {result.checks.map((check: any) => (
                  <div key={check.name} className="flex items-center text-sm">
                    {check.passed ? (
                      <CheckCircle className="h-4 w-4 text-success mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600 mr-2" />
                    )}
                    <span>{check.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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
            onClick={handleClose}
            isLoading={loading}
          >
            {loading ? (
              <>
                <Loader className="animate-spin h-4 w-4 mr-2" />
                Clôture en cours...
              </>
            ) : (
              'Clôturer l\'exercice'
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}