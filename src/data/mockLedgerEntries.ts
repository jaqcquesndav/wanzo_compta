import type { JournalEntry } from '../types/accounting';

export const mockLedgerEntries: JournalEntry[] = [
  {
    id: '1',
    date: '2024-03-01',
    journalType: 'sales',
    description: 'Facture client ABC SARL',
    reference: 'FAC2024-001',
    totalDebit: 1180000,
    totalCredit: 1180000,
    status: 'posted',
    lines: [
      {
        id: '1-1',
        accountId: '411000',
        debit: 1180000,
        credit: 0,
        description: 'Client ABC SARL'
      },
      {
        id: '1-2',
        accountId: '707000',
        debit: 0,
        credit: 1000000,
        description: 'Ventes de marchandises'
      }
    ]
  },
  {
    id: '2',
    date: '2024-03-02',
    journalType: 'purchases',
    description: 'Facture fournisseur XYZ SA',
    reference: 'FF2024-001',
    totalDebit: 590000,
    totalCredit: 590000,
    status: 'posted',
    lines: [
      {
        id: '2-1',
        accountId: '607000',
        debit: 500000,
        credit: 0,
        description: 'Achats de marchandises'
      },
      {
        id: '2-2',
        accountId: '401000',
        debit: 0,
        credit: 590000,
        description: 'Fournisseur XYZ SA'
      }
    ]
  },
  {
    id: '3',
    date: '2024-03-03',
    journalType: 'bank',
    description: 'Règlement client ABC SARL',
    reference: 'BNK2024-001',
    totalDebit: 1180000,
    totalCredit: 1180000,
    status: 'posted',
    lines: [
      {
        id: '3-1',
        accountId: '512000',
        debit: 1180000,
        credit: 0,
        description: 'Banque BICIS'
      },
      {
        id: '3-2',
        accountId: '411000',
        debit: 0,
        credit: 1180000,
        description: 'Client ABC SARL'
      }
    ]
  }
];