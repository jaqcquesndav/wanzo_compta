export const ENTRY_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  VALIDATED: 'validated'
} as const;

export const JOURNAL_CODES = {
  BANK: 'BNK',
  PURCHASE: 'ACH',
  SALES: 'VTE',
  CASH: 'CSE',
  GENERAL: 'OD'
} as const;

// Mise à jour des types de journaux avec les comptes SYSCOHADA
export const JOURNAL_TYPES = {
  BANK: {
    code: JOURNAL_CODES.BANK,
    label: 'Journal de Banque',
    description: 'Mouvements bancaires',
    defaultAccount: '521000', // Compte bancaire SYSCOHADA
    counterpartAccounts: ['411', '401', '53'],
    requiresReference: true,
    referencePrefix: 'BNK'
  },
  PURCHASE: {
    code: JOURNAL_CODES.PURCHASE,
    label: 'Journal des Achats',
    description: 'Factures et règlements fournisseurs',
    defaultAccount: '401000',
    counterpartAccounts: ['6', '445660'],
    requiresReference: true,
    referencePrefix: 'FAC',
    requiresVat: true
  },
  SALES: {
    code: JOURNAL_CODES.SALES,
    label: 'Journal des Ventes',
    description: 'Factures clients',
    defaultAccount: '411000',
    counterpartAccounts: ['7', '445710'],
    requiresReference: true,
    referencePrefix: 'FV',
    requiresVat: true
  },
  CASH: {
    code: JOURNAL_CODES.CASH,
    label: 'Journal de Caisse',
    description: 'Encaissements et décaissements en espèces',
    defaultAccount: '571000',
    counterpartAccounts: ['411', '401'],
    requiresReference: true,
    referencePrefix: 'CSE'
  },
  GENERAL: {
    code: JOURNAL_CODES.GENERAL,
    label: 'Opérations Diverses',
    description: 'Écritures d\'ajustement et autres opérations',
    defaultAccount: '',
    counterpartAccounts: [],
    requiresReference: true,
    referencePrefix: 'OD'
  }
} as const;

export const VAT_CODES = {
  'N16': { rate: 16, account: '445660', description: 'TVA 16%' },
  'EXO': { rate: 0, account: null, description: 'Exonéré de TVA' }
} as const;
