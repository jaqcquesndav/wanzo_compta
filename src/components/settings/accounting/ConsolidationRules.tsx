import React from 'react';
import { Toggle } from '../../ui/Toggle';
import type { AccountingLevelSettings } from '../../../types/accounting-levels';

interface ConsolidationRulesProps {
  rules: AccountingLevelSettings['consolidationRules'];
  onChange: (rules: AccountingLevelSettings['consolidationRules']) => void;
}

export function ConsolidationRules({ rules, onChange }: ConsolidationRulesProps) {
  if (!rules) return null;

  return (
    <div className="space-y-4 border-t pt-4">
      <h3 className="text-sm font-medium">Règles de consolidation</h3>
      <Toggle
        label="Éliminer les opérations intra-groupe"
        checked={rules.eliminateIntercompany}
        onChange={(checked) => onChange({ ...rules, eliminateIntercompany: checked })}
      />
      <Toggle
        label="Conversion des devises"
        checked={rules.convertCurrency}
        onChange={(checked) => onChange({ ...rules, convertCurrency: checked })}
      />
      <Toggle
        label="Ajustements de consolidation"
        checked={rules.adjustments}
        onChange={(checked) => onChange({ ...rules, adjustments: checked })}
      />
    </div>
  );
}