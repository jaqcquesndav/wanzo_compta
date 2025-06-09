import React from 'react';
import { Button } from '../../../ui/Button';
import { Trash2 } from 'lucide-react';
import type { AccountingUnit } from '../../../../types/accounting-levels';

interface UnitListItemProps {
  unit: AccountingUnit;
  onRemove: () => void;
}

export function UnitListItem({ unit, onRemove }: UnitListItemProps) {
  const getTypeLabel = (type: AccountingUnit['type']) => {
    switch (type) {
      case 'headquarters': return 'Siège';
      case 'subsidiary': return 'Filiale';
      case 'branch': return 'Succursale';
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <p className="font-medium">{unit.name}</p>
        <p className="text-sm text-gray-500">
          {unit.code} - {getTypeLabel(unit.type)}
        </p>
      </div>
      <Button
        variant="warning"
        size="sm"
        icon={Trash2}
        onClick={onRemove}
      >
        Supprimer
      </Button>
    </div>
  );
}