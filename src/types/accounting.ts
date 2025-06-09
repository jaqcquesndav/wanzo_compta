// Mise à jour des types
export interface JournalEntry {
  id: string;
  date: string;
  journalType: 'sales' | 'purchases' | 'bank' | 'cash' | 'general';
  description: string;
  reference: string;
  totalDebit: number;
  totalCredit: number;
  totalVat: number;
  status: 'draft' | 'pending' | 'approved' | 'posted';
  source?: 'manual' | 'agent'; // Source de l'entrée (manuelle ou agent comptable)
  agentId?: string; // ID de l'agent comptable qui a généré cette entrée
  validationStatus?: 'pending' | 'validated' | 'rejected'; // Statut de validation pour les entrées provenant de l'agent
  validatedBy?: string; // Utilisateur qui a validé l'entrée
  validatedAt?: string; // Date de validation
  lines: JournalLine[];
  attachments?: {
    id: string;
    name: string;
    url?: string;
    localUrl?: string;
    status: 'pending' | 'uploading' | 'uploaded' | 'error';
  }[];
}

export interface JournalLine {
  id: string;
  accountId: string;
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
  description: string;
  vatCode?: string;
  vatAmount?: number;
  analyticCode?: string;
}