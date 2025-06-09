import type { AccountingUnit } from '../../types/accounting-levels';

export const validateUnit = (unit: Partial<AccountingUnit>): boolean => {
  if (!unit.name?.trim() || !unit.code?.trim()) {
    return false;
  }

  if (unit.type !== 'headquarters' && !unit.parentId) {
    return false;
  }

  return true;
};

export const validateUnitCode = (code: string, existingUnits: AccountingUnit[]): boolean => {
  return !existingUnits.some(unit => unit.code === code);
};