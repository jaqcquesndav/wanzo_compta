import React, { useState } from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Table } from '../../ui/Table';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { Modal } from '../../ui/Modal';
import { AccountingUnitForm } from './AccountingUnitForm';
import type { AccountingUnit } from '../../../types/accounting-levels';

interface AccountingLevelManagerProps {
  units: AccountingUnit[];
  onViewUnit: (unit: AccountingUnit) => void;
  onEditUnit: (unit: AccountingUnit) => void;
  onDeleteUnit: (unitId: string) => void;
}

export function AccountingLevelManager({
  units,
  onViewUnit,
  onEditUnit,
  onDeleteUnit
}: AccountingLevelManagerProps) {
  const [selectedUnit, setSelectedUnit] = useState<AccountingUnit | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const columns = [
    { header: 'Nom', accessor: 'name' },
    { header: 'Code', accessor: 'code' },
    {
      header: 'Type',
      accessor: (unit: AccountingUnit) => ({
        headquarters: 'Siège',
        subsidiary: 'Filiale',
        branch: 'Succursale'
      }[unit.type])
    },
    {
      header: 'Actions',
      accessor: (unit: AccountingUnit) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Eye}
            onClick={() => onViewUnit(unit)}
          >
            Voir
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Edit2}
            onClick={() => {
              setSelectedUnit(unit);
              setIsEditModalOpen(true);
            }}
          >
            Modifier
          </Button>
          <Button
            variant="warning"
            size="sm"
            icon={Trash2}
            onClick={() => onDeleteUnit(unit.id)}
          >
            Supprimer
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Card title="Gestion des niveaux de comptabilité">
        <Table
          columns={columns}
          data={units}
          emptyMessage="Aucune unité comptable configurée"
        />
      </Card>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUnit(null);
        }}
        title="Modifier l'unité comptable"
      >
        {selectedUnit && (
          <AccountingUnitForm
            unit={selectedUnit}
            existingUnits={units.filter(u => u.id !== selectedUnit.id)}
            onChange={(updatedUnit) => {
              onEditUnit(updatedUnit as AccountingUnit);
              setIsEditModalOpen(false);
            }}
          />
        )}
      </Modal>
    </div>
  );
}