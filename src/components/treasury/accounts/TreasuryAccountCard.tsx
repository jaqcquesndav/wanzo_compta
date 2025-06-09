import React from 'react';
import { ExternalLink, type LucideIcon } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import type { TreasuryAccount } from '../../../types/treasury';

interface TreasuryAccountCardProps {
  account: TreasuryAccount;
  icon: LucideIcon;
  onViewDetails: () => void;
}

export function TreasuryAccountCard({
  account,
  icon: Icon,
  onViewDetails
}: TreasuryAccountCardProps) {
  return (
    <Card 
      title={account.provider}
      icon={Icon}
      className="h-full"
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">N° Compte</p>
          <p className="font-mono">{account.accountNumber}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Solde actuel</p>
          <p className="text-2xl font-bold text-gray-900">
            {account.balance.toLocaleString('fr-FR', { 
              style: 'currency', 
              currency: account.currency 
            })}
          </p>
        </div>

        {account.lastReconciliation && (
          <div>
            <p className="text-sm text-gray-600">Dernier rapprochement</p>
            <p className="text-sm">
              {new Date(account.lastReconciliation).toLocaleDateString('fr-FR')}
            </p>
          </div>
        )}

        <Button
          variant="secondary"
          icon={ExternalLink}
          onClick={onViewDetails}
          className="w-full"
        >
          Voir les mouvements
        </Button>
      </div>
    </Card>
  );
}