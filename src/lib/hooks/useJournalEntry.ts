import { useState } from 'react';
import type { JournalEntry, JournalLine } from '../../types/accounting';

interface UseJournalEntryReturn {
  lines: JournalLine[];
  addLine: () => void;
  removeLine: (index: number) => void;
  updateLine: (index: number, line: Partial<JournalLine>) => void;
  isBalanced: boolean;
  totalDebit: number;
  totalCredit: number;
}

export function useJournalEntry(): UseJournalEntryReturn {
  const [lines, setLines] = useState<JournalLine[]>([{
    id: crypto.randomUUID(),
    accountId: '',
    debit: 0,
    credit: 0,
    description: ''
  }]);

  const addLine = () => {
    setLines([...lines, {
      id: crypto.randomUUID(),
      accountId: '',
      debit: 0,
      credit: 0,
      description: ''
    }]);
  };

  const removeLine = (index: number) => {
    if (lines.length > 1) {
      setLines(lines.filter((_, i) => i !== index));
    }
  };

  const updateLine = (index: number, line: Partial<JournalLine>) => {
    setLines(lines.map((l, i) => i === index ? { ...l, ...line } : l));
  };

  const totalDebit = lines.reduce((sum, line) => sum + (line.debit || 0), 0);
  const totalCredit = lines.reduce((sum, line) => sum + (line.credit || 0), 0);
  const isBalanced = totalDebit === totalCredit;

  return {
    lines,
    addLine,
    removeLine,
    updateLine,
    isBalanced,
    totalDebit,
    totalCredit
  };
}