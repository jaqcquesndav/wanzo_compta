import React from 'react';

interface CalculatorDisplayProps {
  expression: string;
  value: string;
  memory: number | null;
}

export function CalculatorDisplay({ expression, value, memory }: CalculatorDisplayProps) {
  return (
    <div className="space-y-1">
      {memory !== null && (
        <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
          M: {memory.toLocaleString('fr-FR')}
        </div>
      )}
      <div className="bg-gray-100 dark:bg-dark-hover p-4 rounded-lg shadow-inner">
        <div className="text-sm text-gray-500 dark:text-gray-400 text-right h-5">
          {expression}
        </div>
        <div className="font-mono text-3xl text-right truncate dark:text-white">
          {parseFloat(value).toLocaleString('fr-FR')}
        </div>
      </div>
    </div>
  );
}