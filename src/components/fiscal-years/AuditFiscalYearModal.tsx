import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { FormField, Input } from '../ui/Form';
import { Button } from '../ui/Button';
import { AlertCircle, CheckCircle } from 'lucide-react';
import type { FiscalYear, AuditorCredentials } from '../../types/fiscal-year';

interface AuditFiscalYearModalProps {
  isOpen: boolean;
  onClose: () => void;
  fiscalYear: FiscalYear;
  onConfirm: (credentials: AuditorCredentials) => Promise<void>;
}

export function AuditFiscalYearModal({ 
  isOpen, 
  onClose, 
  fiscalYear,
  onConfirm 
}: AuditFiscalYearModalProps) {
  const [credentials, setCredentials] = useState<AuditorCredentials>({
    name: '',
    registrationNumber: '',
    token: ''
  });
  const [loading, setLoading] = useState(false);
  const [tokenSent, setTokenSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestToken = async () => {
    if (!credentials.name || !credentials.registrationNumber) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      // Simuler l'envoi du token par email
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTokenSent(true);
      setError(null);
    } catch (error) {
      setError('Erreur lors de l\'envoi du token');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.token) {
      setError('Le token est requis');
      return;
    }

    setLoading(true);
    try {
      await onConfirm(credentials);
      onClose();
    } catch (error) {
      setError('Token invalide');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Audit de l'exercice ${fiscalYear.code}`}
    >
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center text-blue-700">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p className="text-sm">
              L'audit d'un exercice nécessite une validation par un auditeur agréé.
              Veuillez saisir vos informations d'auditeur pour recevoir un token de validation.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Nom de l'auditeur" required>
            <Input
              value={credentials.name}
              onChange={(e) => setCredentials(prev => ({ ...prev, name: e.target.value }))}
              placeholder="John Doe"
              disabled={tokenSent}
              required
            />
          </FormField>

          <FormField label="Numéro de matricule" required>
            <Input
              value={credentials.registrationNumber}
              onChange={(e) => setCredentials(prev => ({ ...prev, registrationNumber: e.target.value }))}
              placeholder="AUD-2024-001"
              disabled={tokenSent}
              required
            />
          </FormField>

          {!tokenSent ? (
            <Button
              type="button"
              onClick={handleRequestToken}
              isLoading={loading}
              className="w-full"
            >
              Demander un token
            </Button>
          ) : (
            <>
              <div className="flex items-center text-success bg-success/10 p-3 rounded-lg">
                <CheckCircle className="h-5 w-5 mr-2" />
                <p className="text-sm">
                  Un token a été envoyé à votre adresse email.
                </p>
              </div>

              <FormField label="Token de validation" required>
                <Input
                  type="text"
                  value={credentials.token}
                  onChange={(e) => setCredentials(prev => ({ ...prev, token: e.target.value }))}
                  placeholder="Entrez le token reçu par email"
                  required
                />
              </FormField>

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
                  Valider l'audit
                </Button>
              </div>
            </>
          )}

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
        </form>
      </div>
    </Modal>
  );
}