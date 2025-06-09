// Journal Types
export const JOURNAL_TYPES = {
  SALES: 'sales',
  PURCHASES: 'purchases',
  BANK: 'bank',
  CASH: 'cash',
  GENERAL: 'general',
} as const;

export const JOURNAL_LABELS = {
  [JOURNAL_TYPES.SALES]: 'Journal des Ventes',
  [JOURNAL_TYPES.PURCHASES]: 'Journal des Achats',
  [JOURNAL_TYPES.BANK]: 'Journal de Banque',
  [JOURNAL_TYPES.CASH]: 'Journal de Caisse',
  [JOURNAL_TYPES.GENERAL]: 'Journal des Opérations Diverses',
} as const;