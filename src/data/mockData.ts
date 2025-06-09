import { JournalEntry, Account } from '../types/accounting';
import { JOURNAL_TYPES } from '../config/accounting';

// Mock data pour les comptes
export const mockAccounts: Account[] = [
  {
    id: '411000',
    code: '411000',
    name: 'Clients',
    type: 'asset',
    standard: 'SYSCOHADA',
    isAnalytic: false
  },
  {
    id: '401000',
    code: '401000',
    name: 'Fournisseurs',
    type: 'liability',
    standard: 'SYSCOHADA',
    isAnalytic: false
  },
  {
    id: '512000',
    code: '512000',
    name: 'Banques',
    type: 'asset',
    standard: 'SYSCOHADA',
    isAnalytic: false
  },
  {
    id: '707000',
    code: '707000',
    name: 'Ventes de marchandises',
    type: 'revenue',
    standard: 'SYSCOHADA',
    isAnalytic: false
  }
];

// Mock data pour les écritures comptables
export const mockJournalEntries: JournalEntry[] = [
  {
    id: '1',
    date: '2024-03-01',
    journalType: 'sales',
    description: 'Facture client ABC SARL',
    reference: 'VTE2024001',
    totalDebit: 1180000,
    totalCredit: 1180000,
    totalVat: 180000,
    status: 'posted',
    lines: [
      {
        id: '1-1',
        accountId: '411000',
        accountCode: '411000',
        accountName: 'Clients',
        debit: 1180000,
        credit: 0,
        description: 'Client ABC SARL',
        vatCode: 'N18',
        vatAmount: 180000
      },
      {
        id: '1-2',
        accountId: '707000',
        accountCode: '707000',
        accountName: 'Ventes de marchandises',
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
    reference: 'ACH2024001',
    totalDebit: 590000,
    totalCredit: 590000,
    totalVat: 90000,
    status: 'posted',
    lines: [
      {
        id: '2-1',
        accountId: '607000',
        accountCode: '607000',
        accountName: 'Achats de marchandises',
        debit: 500000,
        credit: 0,
        description: 'Achats de marchandises',
        vatCode: 'N18',
        vatAmount: 90000
      },
      {
        id: '2-2',
        accountId: '401000',
        accountCode: '401000',
        accountName: 'Fournisseurs',
        debit: 0,
        credit: 590000,
        description: 'Fournisseur XYZ SA'
      }
    ]
  }
];