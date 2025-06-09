import React from 'react';
import { Card } from '../ui/Card';
import { Building2, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';

interface BankAccountCardProps {
  bankName: string;
  accountNumber: string;
  balance: number;
  currency?: string;
  onViewDetails: () => void;
}

export function BankAccountCard({
  bankName,
  accountNumber,
  balance,
  currency = 'XOF',
  onViewDetails
}: BankAccountCardProps) {
  return (
    <Card 
      title={bankName}
      icon={Building2}
      className="h-full"
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">N° Compte</p>
          <p className="font-mono">{accountNumber}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Solde actuel</p>
          <p className="text-2xl font-bold text-gray-900">
            {balance.toLocaleString('fr-FR', { 
              style: 'currency', 
              currency 
            })}
          </p>
        </div>

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