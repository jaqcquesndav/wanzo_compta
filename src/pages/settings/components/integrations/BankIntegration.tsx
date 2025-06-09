import React, { useState } from 'react';
import { Card } from '../../../../components/ui/Card';
import { FormField, Select } from '../../../../components/ui/Form';
import { Button } from '../../../../components/ui/Button';
import { Building2 } from 'lucide-react';
import { IntegrationStatus, type IntegrationState } from '../../../../components/ui/IntegrationStatus';

interface Bank {
  id: string;
  name: string;
  logo?: string;
}

export function BankIntegration() {
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [integrationState, setIntegrationState] = useState<IntegrationState>('disconnected');
  const [lastSync, setLastSync] = useState<string>();

  const banks: Bank[] = [
    { id: 'bicis', name: 'BICIS' },
    { id: 'boa', name: 'Bank Of Africa' },
    { id: 'sgbs', name: 'Société Générale' },
    { id: 'ecobank', name: 'Ecobank' }
  ];

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIntegrationState('pending');
      setLastSync(new Date().toISOString());
    } finally {
      setIsConnecting(false);
    }
  };

  const handleValidate = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIntegrationState('connected');
    } catch {
      setIntegrationState('error');
    }
  };

  return (
    <Card title="Intégration Bancaire" icon={Building2}>
      <div className="space-y-6">
        <IntegrationStatus state={integrationState} lastSync={lastSync} />

        <FormField label="Sélectionner une banque">
          <Select
            options={banks.map(bank => ({
              value: bank.id,
              label: bank.name
            }))}
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
          />
        </FormField>

        <div className="space-y-2">
          {integrationState === 'pending' ? (
            <Button
              onClick={handleValidate}
              variant="success"
              className="w-full"
            >
              Valider la connexion
            </Button>
          ) : (
            <Button
              onClick={handleConnect}
              isLoading={isConnecting}
              disabled={!selectedBank}
              className="w-full"
            >
              {integrationState === 'connected' ? 'Reconnecter' : 'Connecter'} le compte bancaire
            </Button>
          )}
          <p className="text-sm text-gray-500 text-center">
            Vos informations bancaires sont sécurisées et cryptées
          </p>
        </div>
      </div>
    </Card>
  );
}