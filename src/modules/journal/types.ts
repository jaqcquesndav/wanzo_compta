export interface JournalEntry {
  id: string;
  journalCode: string;
  journalType: 'BANK' | 'PURCHASE' | 'SALES' | 'CASH' | 'GENERAL';
  date: string;
  reference: string;
  description: string;
  status: 'draft' | 'pending' | 'validated';
  lines: JournalLine[];
  totalDebit: number;
  totalCredit: number;
  attachments?: string[];
  createdAt: string;
  createdBy: string;
  validatedAt?: string;
  validatedBy?: string;
}

export interface JournalLine {
  id: string;
  accountId: string;
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
  description: string;
  analyticalCode?: string;
  vatCode?: string;
  dueDate?: string;
}

export interface JournalValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  totalDebit: number;
  totalCredit: number;
  isBalanced: boolean;
}

export interface JournalFormData {
  journalType: string;
  date: string;
  reference: string;
  description: string;
}