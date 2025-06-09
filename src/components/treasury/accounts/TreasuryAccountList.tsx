import React from 'react';
import { Building2, Landmark, Users, CreditCard } from 'lucide-react';
import { TreasuryAccountCard } from './TreasuryAccountCard';
import type { TreasuryAccount } from '../../../types/treasury';

interface TreasuryAccountListProps {
  accounts: TreasuryAccount[];
  onViewDetails: (account: TreasuryAccount) => void;
}

export function TreasuryAccountList({ accounts, onViewDetails }: TreasuryAccountListProps) {
  const getIcon = (type: TreasuryAccount['type']) => {
    switch (type) {
      case 'bank':
        return Building2;
      case 'microfinance':
        return Landmark;
      case 'cooperative':
        return Users;
      case 'vsla':
        return CreditCard;
      default:
        return Building2;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {accounts.map(account => (
        <TreasuryAccountCard
          key={account.id}
          account={account}
          icon={getIcon(account.type)}
          onViewDetails={() => onViewDetails(account)}
        />
      ))}
    </div>
  );
}