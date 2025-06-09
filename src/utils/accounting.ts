import type { JournalEntry, JournalLine } from '../types/accounting';

export function validateJournalEntry(entry: Partial<JournalEntry>): boolean {
  if (!entry.date || !entry.journalType || !entry.description || !entry.lines) {
    return false;
  }

  const totalDebit = entry.lines.reduce((sum, line) => sum + (line.debit || 0), 0);
  const totalCredit = entry.lines.reduce((sum, line) => sum + (line.credit || 0), 0);

  return Math.abs(totalDebit - totalCredit) < 0.01;
}

export function generateReference(type: string, date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  // Get prefix based on journal type
  const prefix = type.toUpperCase().slice(0, 3);
  
  // Generate a random sequence number (in production this should come from a sequence generator)
  const sequence = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
  
  return `${prefix}${year}${month}${day}-${sequence}`;
}

export function formatJournalReference(type: string, date: Date): string {
  return generateReference(type, date);
}