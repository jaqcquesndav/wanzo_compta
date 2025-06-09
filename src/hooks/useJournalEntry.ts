import { useState } from 'react';
import { JOURNAL_TYPES, VAT_CODES } from '../config/accounting';
import { validateJournalEntry } from '../utils/validation/journalValidation';
import { generateReference } from '../utils/accounting';
import type { JournalEntry, JournalLine } from '../types/accounting';

const createEmptyLine = (description: string = ''): JournalLine => ({
  id: crypto.randomUUID(),
  accountId: '',
  accountCode: '',
  accountName: '',
  debit: 0,
  credit: 0,
  description
});

export function useJournalEntry(initialEntry?: Partial<JournalEntry>) {
  const [entry, setEntry] = useState<Partial<JournalEntry>>({
    date: new Date().toISOString().split('T')[0],
    journalType: initialEntry?.journalType || '',
    reference: initialEntry?.reference || '',
    description: initialEntry?.description || '',
    status: initialEntry?.status || 'draft',
    lines: initialEntry?.lines || [createEmptyLine()],
    attachments: initialEntry?.attachments || []
  });

  const calculateTotals = () => {
    const lines = entry.lines || [];
    const totalDebit = lines.reduce((sum, line) => sum + (line.debit || 0), 0);
    const totalCredit = lines.reduce((sum, line) => sum + (line.credit || 0), 0);
    const totalVat = lines.reduce((sum, line) => sum + (line.vatAmount || 0), 0);
    return { totalDebit, totalCredit, totalVat };
  };

  const updateEntry = (updates: Partial<JournalEntry>) => {
    setEntry(prev => {
      const updated = { ...prev, ...updates };
      
      // Générer une nouvelle référence si le type de journal change
      if (updates.journalType && updates.journalType !== prev.journalType) {
        updated.reference = generateReference(updates.journalType, new Date(updated.date || ''));
      }
      
      return updated;
    });
  };

  const addLine = () => {
    setEntry(prev => ({
      ...prev,
      lines: [...(prev.lines || []), createEmptyLine(prev.description)]
    }));
  };

  const removeLine = (index: number) => {
    if ((entry.lines?.length || 0) <= 1) return;
    
    setEntry(prev => ({
      ...prev,
      lines: prev.lines?.filter((_, i) => i !== index)
    }));
  };

  const updateLine = (index: number, updates: Partial<JournalLine>) => {
    setEntry(prev => {
      const newLines = [...(prev.lines || [])];
      newLines[index] = { ...newLines[index], ...updates };
      
      // Recalculer la TVA si nécessaire
      if (updates.vatCode || updates.debit || updates.credit) {
        const line = newLines[index];
        const amount = line.debit || line.credit || 0;
        const vatRate = line.vatCode ? VAT_CODES[line.vatCode]?.rate || 0 : 0;
        line.vatAmount = amount * (vatRate / 100);
      }
      
      return { ...prev, lines: newLines };
    });
  };

  const addAttachment = (attachment: JournalEntry['attachments'][0]) => {
    setEntry(prev => ({
      ...prev,
      attachments: [...(prev.attachments || []), attachment]
    }));
  };

  const removeAttachment = (id: string) => {
    setEntry(prev => ({
      ...prev,
      attachments: prev.attachments?.filter(a => a.id !== id) || []
    }));
  };

  const validate = () => {
    const validation = validateJournalEntry(entry);
    return validation;
  };

  const reset = () => {
    setEntry({
      date: new Date().toISOString().split('T')[0],
      journalType: '',
      reference: '',
      description: '',
      status: 'draft',
      lines: [createEmptyLine()],
      attachments: []
    });
  };

  return {
    entry,
    errors: validate().errors,
    totals: calculateTotals(),
    updateEntry,
    addLine,
    removeLine,
    updateLine,
    addAttachment,
    removeAttachment,
    validate,
    reset
  };
}