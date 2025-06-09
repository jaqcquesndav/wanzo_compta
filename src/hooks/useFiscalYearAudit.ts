import { useState } from 'react';
import type { FiscalYear, AuditorCredentials, AuditValidation } from '../types/fiscal-year';

export function useFiscalYearAudit() {
  const [loading, setLoading] = useState(false);

  const validateAudit = async (fiscalYear: FiscalYear, credentials: AuditorCredentials): Promise<AuditValidation> => {
    setLoading(true);
    try {
      // Simuler la validation du token
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Vérifier le token (dans un vrai cas, ceci serait fait côté serveur)
      if (credentials.token !== '123456') {
        return {
          success: false,
          message: 'Token invalide',
          errors: ['Le token fourni n\'est pas valide']
        };
      }

      return {
        success: true,
        message: 'Audit validé avec succès'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la validation',
        errors: ['Une erreur est survenue lors de la validation']
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    validateAudit
  };
}