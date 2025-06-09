import React from 'react';
import { Trash2 } from 'lucide-react';
import { Input } from '../ui/Form';
import { AccountLookup } from './AccountLookup';
import { VatCodeSelect } from './VatCodeSelect';
import { VAT_CODES } from '../../config/accounting';
import type { JournalLine } from '../../types/accounting';

interface JournalEntryLineProps {
  line: JournalLine;
  onUpdate: (updates: Partial<JournalLine>) => void;
  onRemove: () => void;
  isRemoveDisabled?: boolean;
  showVat?: boolean;
}

export function JournalEntryLine({
  line,
  onUpdate,
  onRemove,
  isRemoveDisabled,
  showVat = true
}: JournalEntryLineProps) {
  const handleVatChange = (vatCode: string) => {
    const updates: Partial<JournalLine> = { vatCode };
    
    // Calculer la TVA si un montant existe déjà
    if (line.debit > 0 || line.credit > 0) {
      const amount = line.debit || line.credit;
      const vatRate = vatCode ? VAT_CODES[vatCode]?.rate || 0 : 0;
      const vatAmount = amount * (vatRate / 100);
      
      updates.vatAmount = vatAmount;
    }
    
    onUpdate(updates);
  };

  const handleAmountChange = (field: 'debit' | 'credit', value: string) => {
    const amount = parseFloat(value) || 0;
    const updates: Partial<JournalLine> = {
      [field]: amount,
      [field === 'debit' ? 'credit' : 'debit']: 0
    };

    // Recalculer la TVA si un code TVA est sélectionné
    if (line.vatCode) {
      const vatRate = VAT_CODES[line.vatCode]?.rate || 0;
      updates.vatAmount = amount * (vatRate / 100);
    }

    onUpdate(updates);
  };

  return (
    <tr className="group hover:bg-gray-50">
      <td className="px-3 py-2">
        <AccountLookup
          value={line.accountCode || ''}
          onChange={(account) => onUpdate({
            accountId: account.id,
            accountCode: account.code,
            accountName: account.name
          })}
          className="w-full"
        />
      </td>
      <td className="px-3 py-2">
        <Input
          value={line.description || ''}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Libellé"
          className="w-full"
        />
      </td>
      {showVat && (
        <td className="px-3 py-2 w-48">
          <div className="space-y-1">
            <VatCodeSelect
              value={line.vatCode || ''}
              onChange={handleVatChange}
            />
            {line.vatAmount > 0 && (
              <div className="text-xs text-gray-500">
                TVA: {line.vatAmount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} XOF
              </div>
            )}
          </div>
        </td>
      )}
      <td className="px-3 py-2 w-40">
        <Input
          type="number"
          value={line.debit || ''}
          onChange={(e) => handleAmountChange('debit', e.target.value)}
          className="text-right"
          placeholder="0.00"
          min="0"
          step="0.01"
        />
      </td>
      <td className="px-3 py-2 w-40">
        <Input
          type="number"
          value={line.credit || ''}
          onChange={(e) => handleAmountChange('credit', e.target.value)}
          className="text-right"
          placeholder="0.00"
          min="0"
          step="0.01"
        />
      </td>
      <td className="px-3 py-2 w-10">
        <button
          type="button"
          onClick={onRemove}
          disabled={isRemoveDisabled}
          className={`text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity ${
            isRemoveDisabled ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
}