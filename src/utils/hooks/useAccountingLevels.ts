import { useState } from 'react';
import type { AccountingLevelSettings, AccountingUnit } from '../../types/accounting-levels';

const DEFAULT_SETTINGS: AccountingLevelSettings = {
  type: 'single',
  consolidation: false,
  mainCurrency: 'XOF',
  units: [],
  consolidationRules: {
    eliminateIntercompany: true,
    convertCurrency: true,
    adjustments: true
  }
};

export function useAccountingLevels() {
  const [settings, setSettings] = useState<AccountingLevelSettings>(DEFAULT_SETTINGS);

  const addUnit = (unit: Omit<AccountingUnit, 'id' | 'currency' | 'isConsolidated'>) => {
    setSettings(prev => ({
      ...prev,
      units: [...prev.units, {
        id: crypto.randomUUID(),
        ...unit,
        currency: settings.mainCurrency,
        isConsolidated: true
      }]
    }));
  };

  const removeUnit = (id: string) => {
    setSettings(prev => ({
      ...prev,
      units: prev.units.filter(unit => unit.id !== id)
    }));
  };

  const updateSettings = (updates: Partial<AccountingLevelSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return {
    settings,
    addUnit,
    removeUnit,
    updateSettings
  };
}