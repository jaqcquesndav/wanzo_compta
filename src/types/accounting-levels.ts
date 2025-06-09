export type AccountingLevel = 'single' | 'multi';

export interface AccountingUnit {
  id: string;
  name: string;
  code: string;
  parentId?: string;
  type: 'headquarters' | 'subsidiary' | 'branch';
  currency: string;
  isConsolidated: boolean;
}

export interface AccountingLevelSettings {
  type: AccountingLevel;
  consolidation: boolean;
  mainCurrency: string;
  units: AccountingUnit[];
  consolidationRules?: {
    eliminateIntercompany: boolean;
    convertCurrency: boolean;
    adjustments: boolean;
  };
}