export type AccountingLevel = 'single' | 'multi';

import { CurrencyCode } from '../config/currency';

export interface AccountingUnit {
  id: string;
  name: string;
  code: string;
  parentId?: string;
  type: 'headquarters' | 'subsidiary' | 'branch';
  currency: CurrencyCode;
  isConsolidated: boolean;
}

export interface AccountingLevelSettings {
  type: AccountingLevel;
  consolidation: boolean;
  mainCurrency: CurrencyCode;
  units: AccountingUnit[];
  consolidationRules?: {
    eliminateIntercompany: boolean;
    convertCurrency: boolean;
    adjustments: boolean;
  };
}