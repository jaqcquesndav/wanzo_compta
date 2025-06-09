import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { AccountingTypeSelector } from './sections/AccountingTypeSelector';
import { ConsolidationSection } from './sections/ConsolidationSection';
import { UnitsSection } from './sections/UnitsSection';
import { useAccountingLevels } from '../../../utils/hooks/useAccountingLevels';

export function AccountingLevelSettings() {
  const { settings, updateSettings, addUnit, removeUnit } = useAccountingLevels();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement settings save
    console.log('Saving settings:', settings);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card title="Configuration des niveaux de comptabilité">
        <div className="space-y-6">
          <AccountingTypeSelector
            value={settings.type}
            onChange={(type) => updateSettings({ type })}
          />

          {settings.type === 'multi' && (
            <>
              <ConsolidationSection
                consolidation={settings.consolidation}
                rules={settings.consolidationRules}
                onConsolidationChange={(consolidation) => updateSettings({ consolidation })}
                onRulesChange={(rules) => updateSettings({ consolidationRules: rules })}
              />

              <UnitsSection
                units={settings.units}
                mainCurrency={settings.mainCurrency}
                onAddUnit={addUnit}
                onRemoveUnit={removeUnit}
              />
            </>
          )}

          <div className="flex justify-end border-t pt-4">
            <Button type="submit">
              Enregistrer les paramètres
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
}