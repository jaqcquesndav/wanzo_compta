import { JOURNAL_TYPES } from '../constants';

/**
 * Génère une référence unique pour une écriture comptable
 * Format: {PREFIX}{ANNÉE}{MOIS}{JOUR}-{SEQUENCE}
 * Exemple: VTE20240301-001
 */
export function generateReference(
  type: keyof typeof JOURNAL_TYPES,
  date: Date
): string {
  // Récupérer le préfixe du type de journal
  const prefix = JOURNAL_TYPES[type].referencePrefix;

  // Formater la date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // Générer un numéro de séquence (à remplacer par une vraie séquence en production)
  const sequence = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');

  return `${prefix}${year}${month}${day}-${sequence}`;
}

// Alias pour la compatibilité avec l'ancien nom
export const generateJournalReference = generateReference;

/**
 * Valide le format d'une référence d'écriture
 */
export function validateReference(reference: string): boolean {
  // Format attendu: 3 lettres + 8 chiffres + tiret + 3 chiffres
  const pattern = /^[A-Z]{3}\d{8}-\d{3}$/;
  return pattern.test(reference);
}

/**
 * Extrait les informations d'une référence
 */
export function parseReference(reference: string): {
  type: string;
  date: Date;
  sequence: number;
} | null {
  if (!validateReference(reference)) {
    return null;
  }

  const prefix = reference.slice(0, 3);
  const year = parseInt(reference.slice(3, 7));
  const month = parseInt(reference.slice(7, 9)) - 1;
  const day = parseInt(reference.slice(9, 11));
  const sequence = parseInt(reference.slice(12));

  return {
    type: Object.entries(JOURNAL_TYPES).find(
      ([_, config]) => config.referencePrefix === prefix
    )?.[0] || '',
    date: new Date(year, month, day),
    sequence
  };
}