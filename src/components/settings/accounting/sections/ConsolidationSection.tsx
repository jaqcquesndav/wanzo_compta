import React from 'react';
import { Toggle } from '../../../ui/Toggle';
import { ConsolidationRules } from '../ConsolidationRules';
import type { AccountingLevelSettings } from '../../../../types/accounting-levels';

interface ConsolidationSectionProps {
  consolidation: boolean;
  rules?: AccountingLevelSettings['consolidationRules'];
  onConsolidationChange: (value: boolean) => void;
  onRulesChange: (rules: AccountingLevelSettings['consolidationRules']) => void;
}

export function ConsolidationSection({
  consolidation,
  rules,
  onConsolidationChange,
  onRulesChange
}: ConsolidationSectionProps) {
  return (
    <div className="space-y-4">
      <Toggle
        label="Activer la consolidation"
        checked={consolidation}
        onChange={onConsolidationChange}
      />

      {consolidation && rules && (
        <ConsolidationRules
          rules={rules}
          onChange={onRulesChange}
        />
      )}
    </div>
  );
}