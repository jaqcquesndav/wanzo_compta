import { useState } from 'react';
import { generateJournalReference } from '../utils/reference';
import { validateJournalEntry } from '../utils/validation';
import type { JournalFormData, JournalLine } from '../types';

export function useJournalForm() {
  const [formData, setFormData] = useState<JournalFormData>({
    date: new Date().toISOString().split('T')[0],
    journalType: '',
    reference: '',
    description: ''
  });

  const [lines, setLines] = useState<JournalLine[]>([{
    id: crypto.randomUUID(),
    accountId: '',
    accountName: '',
    debit: 0,
    credit: 0,
    description: ''
  }]);

  const addLine = () => {
    setLines(prev => [...prev, {
      id: crypto.randomUUID(),
      accountId: '',
      accountName: '',
      debit: 0,
      credit: 0,
      description: formData.description
    }]);
  };

  const removeLine = (index: number) => {
    if (lines.length > 1) {
      setLines(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateLine = (index: number, updates: Partial<JournalLine>) => {
    setLines(prev => prev.map((line, i) => 
      i === index ? { ...line, ...updates } : line
    ));
  };

  const validate = () => {
    const validation = validateJournalEntry(formData, lines);
    
    if (validation.isValid && !formData.reference) {
      const reference = generateJournalReference(formData.journalType, new Date(formData.date));
      setFormData(prev => ({ ...prev, reference }));
    }

    return validation;
  };

  return {
    formData,
    setFormData,
    lines,
    addLine,
    removeLine,
    updateLine,
    validate
  };
}