import React from 'react';
import { Trash2 } from 'lucide-react';
import type { JournalLine } from '../../../types/accounting';

interface JournalEntryLineProps {
  line: JournalLine;
  onUpdate: (line: Partial<JournalLine>) => void;
  onRemove: () => void;
  isRemoveDisabled?: boolean;
}

export function JournalEntryLine({
  line,
  onUpdate,
  onRemove,
  isRemoveDisabled
}: JournalEntryLineProps) {
  return (
    <tr>
      <td className="px-3 py-2">
        <input
          type="text"
          value={line.accountId}
          onChange={(e) => onUpdate({ accountId: e.target.value })}
          className="block w-full rounded-md border-gray-300 shadow-sm text-sm"
          placeholder="411"
        />
      </td>
      <td className="px-3 py-2">
        <input
          type="text"
          value={line.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          className="block w-full rounded-md border-gray-300 shadow-sm text-sm"
          placeholder="Libellé"
        />
      </td>
      <td className="px-3 py-2">
        <input
          type="number"
          value={line.debit || ''}
          onChange={(e) => onUpdate({ debit: parseFloat(e.target.value) || 0 })}
          className="block w-full rounded-md border-gray-300 shadow-sm text-sm text-right"
          placeholder="0.00"
        />
      </td>
      <td className="px-3 py-2">
        <input
          type="number"
          value={line.credit || ''}
          onChange={(e) => onUpdate({ credit: parseFloat(e.target.value) || 0 })}
          className="block w-full rounded-md border-gray-300 shadow-sm text-sm text-right"
          placeholder="0.00"
        />
      </td>
      <td className="px-3 py-2">
        <button
          type="button"
          onClick={onRemove}
          disabled={isRemoveDisabled}
          className={`text-red-500 hover:text-red-700 ${isRemoveDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
}