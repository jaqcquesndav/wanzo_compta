import type { Account } from '../types/accounting';

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
  },
  {
    id: '607000',
    code: '607000',
    name: 'Achats de marchandises',
    type: 'expense',
    standard: 'SYSCOHADA',
    isAnalytic: false
  }
];