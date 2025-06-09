import type { JournalEntry, JournalValidation } from '../types';
import { JOURNAL_TYPES } from '../constants';

export function validateJournalEntry(entry: Partial<JournalEntry>): JournalValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validation des champs obligatoires
  if (!entry.date) errors.push('La date est requise');
  if (!entry.journalType) errors.push('Le type de journal est requis');
  if (!entry.description) errors.push('Le libellé est requis');

  // Validation des lignes
  if (!entry.lines || entry.lines.length === 0) {
    errors.push('Au moins une ligne d\'écriture est requise');
    return {
      isValid: false,
      errors,
      warnings,
      totalDebit: 0,
      totalCredit: 0,
      isBalanced: false
    };
  }

  // Validation des comptes et montants
  let hasDebitLine = false;
  let hasCreditLine = false;
  let totalDebit = 0;
  let totalCredit = 0;

  for (const line of entry.lines) {
    // Validation du compte
    if (!line.accountCode) {
      errors.push('Le numéro de compte est requis pour toutes les lignes');
      continue;
    }

    // Validation des montants
    if (line.debit < 0 || line.credit < 0) {
      errors.push('Les montants ne peuvent pas être négatifs');
    }

    if (line.debit > 0 && line.credit > 0) {
      errors.push('Une ligne ne peut pas avoir à la fois un débit et un crédit');
    }

    if (line.debit === 0 && line.credit === 0) {
      errors.push('Chaque ligne doit avoir soit un débit soit un crédit');
    }

    // Mise à jour des totaux
    totalDebit += line.debit || 0;
    totalCredit += line.credit || 0;

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

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    totalDebit,
    totalCredit,
    isBalanced
  };
}