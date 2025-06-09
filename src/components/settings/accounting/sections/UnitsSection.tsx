import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../../ui/Button';
import { AccountingUnitForm } from '../AccountingUnitForm';
import { AccountingUnitList } from '../AccountingUnitList';
import { validateUnit } from '../../../../utils/validation/accountingValidation';
import type { AccountingUnit } from '../../../../types/accounting-levels';

interface UnitsSectionProps {
  units: AccountingUnit[];
  mainCurrency: string;
  onAddUnit: (unit: Omit<AccountingUnit, 'id' | 'currency' | 'isConsolidated'>) => void;
  onRemoveUnit: (id: string) => void;
}

export function UnitsSection({
  units,
  mainCurrency,
  onAddUnit,
  onRemoveUnit
}: UnitsSectionProps) {
  const [newUnit, setNewUnit] = useState<Partial<AccountingUnit>>({
    type: 'headquarters'
  });

  const handleAddUnit = () => {
    if (validateUnit(newUnit)) {
      onAddUnit(newUnit as Omit<AccountingUnit, 'id' | 'currency' | 'isConsolidated'>);
      setNewUnit({ type: 'subsidiary' });
    }
  };

  return (
    <div className="border-t pt-4">
      <h3 className="text-sm font-medium mb-4">Unités comptables</h3>
      
      <AccountingUnitList
        units={units}
        onRemove={onRemoveUnit}
      />

      <div className="mt-4 space-y-4">
        <AccountingUnitForm
          unit={newUnit}
          existingUnits={units}
          onChange={setNewUnit}
        />

        <Button
          variant="secondary"
          icon={Plus}
          onClick={handleAddUnit}
          disabled={!validateUnit(newUnit)}
        >
          Ajouter une unité
        </Button>
      </div>
    </div>
  );
}