import type { JournalEntry } from '../types/accounting';

export const mockAgentEntries: JournalEntry[] = [
  {
    id: 'agent-1',
    date: '2025-06-01',
    journalType: 'sales',
    description: 'Facture client XYZ SARL (via agent)',
    reference: 'AI-FAC2025-001',
    totalDebit: 1180000,
    totalCredit: 1180000,
    totalVat: 180000,
    status: 'pending',
    source: 'agent',
    agentId: 'adha-agent-1',
    validationStatus: 'pending',
    lines: [
      {
        id: 'agent-1-1',
        accountId: '411000',
        accountCode: '411000',
        accountName: 'Clients',
        debit: 1180000,
        credit: 0,
        description: 'Client XYZ SARL'
      },
      {
        id: 'agent-1-2',
        accountId: '707000',
        accountCode: '707000',
        accountName: 'Ventes de marchandises',
        debit: 0,
        credit: 1000000,
        description: 'Ventes de marchandises'
      },
      {
        id: 'agent-1-3',
        accountId: '445700',
        accountCode: '445700',
        accountName: 'TVA collectée',
        debit: 0,
        credit: 180000,
        description: 'TVA collectée'
      }
    ]
  },
  {
    id: 'agent-2',
    date: '2025-06-03',
    journalType: 'purchases',
    description: 'Facture fournisseur ABC SA (via agent)',
    reference: 'AI-FF2025-001',
    totalDebit: 590000,
    totalCredit: 590000,
    totalVat: 90000,
    status: 'pending',
    source: 'agent',
    agentId: 'adha-agent-1',
    validationStatus: 'pending',
    lines: [
      {
        id: 'agent-2-1',
        accountId: '607000',
        accountCode: '607000',
        accountName: 'Achats de marchandises',
        debit: 500000,
        credit: 0,
        description: 'Achats de marchandises'
      },
      {
        id: 'agent-2-2',
        accountId: '445660',
        accountCode: '445660',
        accountName: 'TVA déductible',
        debit: 90000,
        credit: 0,
        description: 'TVA déductible'
      },
      {
        id: 'agent-2-3',
        accountId: '401000',
        accountCode: '401000',
        accountName: 'Fournisseurs',
        debit: 0,
        credit: 590000,
        description: 'Fournisseur ABC SA'
      }
    ]
  },
  {
    id: 'agent-3',
    date: '2025-06-05',
    journalType: 'bank',
    description: 'Règlement client XYZ SARL (via agent)',
    reference: 'AI-BNK2025-001',
    totalDebit: 1180000,
    totalCredit: 1180000,
    totalVat: 0,
    status: 'pending',
    source: 'agent',
    agentId: 'adha-agent-1',
    validationStatus: 'pending',
    lines: [
      {
        id: 'agent-3-1',
        accountId: '512000',
        accountCode: '512000',
        accountName: 'Banques',
        debit: 1180000,
        credit: 0,
        description: 'Règlement client XYZ SARL'
      },
      {
        id: 'agent-3-2',
        accountId: '411000',
        accountCode: '411000',
        accountName: 'Clients',
        debit: 0,
        credit: 1180000,
        description: 'Client XYZ SARL'
      }
    ]
  }
];
