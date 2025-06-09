import { useState } from 'react';
import { JOURNAL_TYPES, ENTRY_STATUS } from '../constants';
import { validateJournalEntry } from '../utils/validation';
import { generateReference } from '../utils/reference';
import { saveDraftEntry } from '../services/journalService';
import type { JournalEntry, JournalLine, JournalValidation } from '../types';

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
    status: initialEntry?.status || ENTRY_STATUS.DRAFT,
    lines: initialEntry?.lines || [createEmptyLine()]
  });

  const updateEntry = (updates: Partial<JournalEntry>) => {
    setEntry(prev => ({ ...prev, ...updates }));
  };

  const addLine = () => {
    setEntry(prev => ({
      ...prev,
      lines: [...(prev.lines || []), createEmptyLine(prev.description)]
    }));
  };

  const removeLine = (index: number) => {
    if ((entry.lines?.length || 0) > 1) {
      setEntry(prev => ({
        ...prev,
        lines: prev.lines?.filter((_, i) => i !== index)
      }));
    }
  };

  const updateLine = (index: number, updates: Partial<JournalLine>) => {
    setEntry(prev => ({
      ...prev,
      lines: prev.lines?.map((line, i) => 
        i === index ? { ...line, ...updates } : line
      )
    }));
  };

  const validate = (): JournalValidation => {
    const validation = validateJournalEntry(entry);
    
    if (validation.isValid && !entry.reference && entry.journalType && entry.date) {
      const reference = generateReference(
        entry.journalType as keyof typeof JOURNAL_TYPES,
        new Date(entry.date)
      );
      updateEntry({ reference });
    }

    return validation;
  };

  const saveDraft = async () => {
    if (!entry.lines?.length) {
      throw new Error('No lines to save');
    }

    try {
      const draftEntry = {
        ...entry,
        status: ENTRY_STATUS.DRAFT,
        createdAt: new Date().toISOString(),
        createdBy: 'current-user', // TODO: Get from auth context
        totalDebit: entry.lines.reduce((sum, line) => sum + (line.debit || 0), 0),
        totalCredit: entry.lines.reduce((sum, line) => sum + (line.credit || 0), 0)
      };

      const savedDraft = await saveDraftEntry(draftEntry);
      updateEntry(savedDraft);
      return savedDraft;
    } catch (error) {
      console.error('Failed to save draft:', error);
      throw error;
    }
  };

  const submit = async () => {
    const validation = validate();
    if (!validation.isValid) {
      throw new Error(validation.errors.join('\n'));
    }

    // TODO: Implement entry submission
    throw new Error('Not implemented');
  };

  return {
    entry,
    updateEntry,
    addLine,
    removeLine,
    updateLine,
    validate,
    saveDraft,
    submit
  };
}