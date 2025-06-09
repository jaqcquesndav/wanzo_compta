import React from 'react';
import { Button } from '../../ui/Button';
import { Trash2 } from 'lucide-react';
import type { AccountingUnit } from '../../../types/accounting-levels';

interface AccountingUnitListProps {
  units: AccountingUnit[];
  onRemove: (id: string) => void;
}

export function AccountingUnitList({ units, onRemove }: AccountingUnitListProps) {
  return (
    <div className="space-y-4">
      {units.map(unit => (
        <div key={unit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium">{unit.name}</p>
            <p className="text-sm text-gray-500">
              {unit.code} - {unit.type === 'headquarters' ? 'Siège' : unit.type === 'subsidiary' ? 'Filiale' : 'Succursale'}
            </p>
          </div>
          <Button
            variant="warning"
            size="sm"
            icon={Trash2}
            onClick={() => onRemove(unit.id)}
          >
            Supprimer
          </Button>
        </div>
      ))}
    </div>
  );
}