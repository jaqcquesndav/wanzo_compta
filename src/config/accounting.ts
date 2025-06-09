export const JOURNAL_TYPES = {
  SALES: {
    code: 'VTE',
    label: 'Journal des Ventes',
    description: 'Factures clients et encaissements',
    defaultAccount: '411000',
    counterpartAccounts: ['7', '445710'],
    requiresReference: true,
    referencePrefix: 'VTE',
    requiresVat: true
  },
  PURCHASE: {
    code: 'ACH',
    label: 'Journal des Achats',
    description: 'Factures fournisseurs et paiements',
    defaultAccount: '401000',
    counterpartAccounts: ['6', '445660'],
    requiresReference: true,
    referencePrefix: 'ACH',
    requiresVat: true
  },
  BANK: {
    code: 'BNK',
    label: 'Journal de Banque',
    description: 'Opérations bancaires',
    defaultAccount: '512000',
    counterpartAccounts: ['411', '401', '53'],
    requiresReference: true,
    referencePrefix: 'BNK'
  },
  CASH: {
    code: 'CSE',
    label: 'Journal de Caisse',
    description: 'Opérations de caisse',
    defaultAccount: '571000',
    counterpartAccounts: ['411', '401'],
    requiresReference: true,
    referencePrefix: 'CSE'
  },
  GENERAL: {
    code: 'OD',
    label: 'Opérations Diverses',
    description: 'Écritures d\'ajustement et autres opérations',
    defaultAccount: '',
    counterpartAccounts: [],
    requiresReference: true,
    referencePrefix: 'OD'
  }
} as const;

export const VAT_CODES = {
  'N18': { rate: 18, account: '445710', description: 'TVA 18%' },
  'N16': { rate: 16, account: '445660', description: 'TVA 16%' },
  'EXO': { rate: 0, account: null, description: 'Exonéré de TVA' }
} as const;

// Create JOURNAL_LABELS from JOURNAL_TYPES
export const JOURNAL_LABELS = Object.fromEntries(
  Object.entries(JOURNAL_TYPES).map(([key, value]) => [key, value.label])
) as Record<keyof typeof JOURNAL_TYPES, string>;

export const ACCOUNT_TYPES = {
  ASSET: 'asset',
  LIABILITY: 'liability',
  EQUITY: 'equity',
  REVENUE: 'revenue',
  EXPENSE: 'expense',
} as const;

export const ACCOUNT_TYPE_LABELS = {
  [ACCOUNT_TYPES.ASSET]: 'Actif',
  [ACCOUNT_TYPES.LIABILITY]: 'Passif',
  [ACCOUNT_TYPES.EQUITY]: 'Capitaux Propres',
  [ACCOUNT_TYPES.REVENUE]: 'Produits',
  [ACCOUNT_TYPES.EXPENSE]: 'Charges',
} as const;