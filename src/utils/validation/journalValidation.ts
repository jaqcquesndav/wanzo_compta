import type { JournalEntry } from '../../types/accounting';
import { JOURNAL_TYPES } from '../../config/accounting';

export interface JournalValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  isBalanced: boolean;
  totalDebit: number;
  totalCredit: number;
  totalVat: number;
}

export function validateJournalEntry(entry: Partial<JournalEntry>): JournalValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  let totalDebit = 0;
  let totalCredit = 0;
  let totalVat = 0;

  // Validation des champs obligatoires
  if (!entry.date) errors.push('La date est requise');
  if (!entry.journalType) errors.push('Le type de journal est requis');
  if (!entry.description) errors.push('Le libellé est requis');
  if (!entry.reference) errors.push('Le numéro de pièce est requis');

  // Validation des lignes
  if (!entry.lines || entry.lines.length === 0) {
    errors.push('Au moins une ligne d\'écriture est requise');
    return {
      isValid: false,
      errors,
      warnings,
      isBalanced: false,
      totalDebit: 0,
      totalCredit: 0,
      totalVat: 0
    };
  }

  let hasDebitLine = false;
  let hasCreditLine = false;

  // Validation des lignes individuelles
  for (const line of entry.lines) {
    if (!line.accountCode) {
      errors.push('Le numéro de compte est requis pour toutes les lignes');
      continue;
    }

    if (line.debit < 0 || line.credit < 0) {
      errors.push('Les montants ne peuvent pas être négatifs');
    }

    if (line.debit > 0 && line.credit > 0) {
      errors.push('Une ligne ne peut pas avoir à la fois un débit et un crédit');
    }

    if (line.debit === 0 && line.credit === 0) {
      errors.push('Chaque ligne doit avoir soit un débit soit un crédit');
    }

    totalDebit += line.debit || 0;
    totalCredit += line.credit || 0;
    totalVat += line.vatAmount || 0;

    if (line.debit > 0) hasDebitLine = true;
    if (line.credit > 0) hasCreditLine = true;
  }

  // Validation de la partie double
  if (!hasDebitLine || !hasCreditLine) {
    errors.push('L\'écriture doit avoir au moins une ligne au débit et une ligne au crédit');
  }

  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01;
  if (!isBalanced) {
    errors.push(`L'écriture n'est pas équilibrée (différence: ${Math.abs(totalDebit - totalCredit).toFixed(2)})`);
  }

  // Validation de la TVA pour les journaux qui la requièrent
  if (entry.journalType && JOURNAL_TYPES[entry.journalType]?.requiresVat) {
    const hasVatLine = entry.lines.some(line => line.vatCode);
    if (!hasVatLine) {
      warnings.push('Ce type de journal requiert généralement un code TVA');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    isBalanced,
    totalDebit,
    totalCredit,
    totalVat
  };
}