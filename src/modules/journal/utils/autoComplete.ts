import { determineEntryType, suggestCounterpart } from './accountNature';
import { VAT_CODES } from '../constants';
import type { JournalLine } from '../types';

interface AutoCompleteOptions {
  journalType: string;
  vatCode?: string;
}

export function autoCompleteEntry(
  mainLine: JournalLine,
  options: AutoCompleteOptions
): JournalLine[] {
  const lines: JournalLine[] = [];
  const amount = mainLine.debit || mainLine.credit || 0;
  
  // Si pas de montant, on ne peut rien faire
  if (amount === 0) return [mainLine];

  // Détermine si c'est une augmentation basée sur le type de compte
  const isIncrease = mainLine.debit > 0;
  
  // Ajoute la ligne principale
  lines.push(mainLine);

  // Ajoute la TVA si nécessaire
  if (options.vatCode && VAT_CODES[options.vatCode]) {
    const vatRate = VAT_CODES[options.vatCode].rate;
    const vatAmount = amount * (vatRate / 100);
    const vatAccount = VAT_CODES[options.vatCode].account;

    if (vatAccount) {
      const vatEntryType = determineEntryType(vatAccount, isIncrease);
      lines.push({
        id: crypto.randomUUID(),
        accountCode: vatAccount,
        accountName: 'TVA',
        [vatEntryType]: vatAmount,
        description: `TVA ${vatRate}%`
      });
    }
  }

  // Suggère la contrepartie
  const counterpartCode = suggestCounterpart(options.journalType, mainLine.accountCode);
  if (counterpartCode) {
    const counterpartEntryType = determineEntryType(counterpartCode, !isIncrease);
    const totalAmount = amount + (lines[1]?.debit || lines[1]?.credit || 0);
    
    lines.push({
      id: crypto.randomUUID(),
      accountCode: counterpartCode,
      accountName: '',
      [counterpartEntryType]: totalAmount,
      description: mainLine.description
    });
  }

  return lines;
}