import React from 'react';
import { Trash2, Clock } from 'lucide-react';
import type { CalculatorOperation } from '../../types/calculator';

interface CalculatorHistoryProps {
  operations: CalculatorOperation[];
  onClear: () => void;
  onSelect: (operation: CalculatorOperation) => void;
}

export function CalculatorHistory({ operations, onClear, onSelect }: CalculatorHistoryProps) {
  if (operations.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500 dark:text-gray-400">
        <Clock className="h-5 w-5 mx-auto mb-2" />
        <p className="text-sm">Aucun historique</p>
      </div>
    );
  }

  return (
    <div className="border-t dark:border-dark-DEFAULT">
      <div className="p-2 flex justify-between items-center">
        <h3 className="text-sm font-medium dark:text-white">Historique</h3>
        <button
          onClick={onClear}
          className="p-1 hover:bg-gray-100 dark:hover:bg-dark-hover rounded"
          title="Effacer l'historique"
        >
          <Trash2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      <div className="max-h-[200px] overflow-y-auto">
        {operations.map((op) => (
          <button
            key={op.id}
            onClick={() => onSelect(op)}
            className="w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
          >
            <div className="text-sm text-gray-600 dark:text-gray-400">{op.expression}</div>
            <div className="text-sm font-medium dark:text-white">{op.result.toLocaleString('fr-FR')}</div>
          </button>
        ))}
      </div>
    </div>
  );
}