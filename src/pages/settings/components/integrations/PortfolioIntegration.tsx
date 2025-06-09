import React, { useState } from 'react';
import { Card } from '../../../../components/ui/Card';
import { FormField, Select, Input } from '../../../../components/ui/Form';
import { Button } from '../../../../components/ui/Button';
import { Briefcase } from 'lucide-react';

interface PortfolioProvider {
  id: string;
  name: string;
}

export function PortfolioIntegration() {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const providers: PortfolioProvider[] = [
    { id: 'bloomberg', name: 'Bloomberg Terminal' },
    { id: 'reuters', name: 'Refinitiv Eikon' },
    { id: 'factset', name: 'FactSet' }
  ];

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // TODO: Implémenter la connexion au gestionnaire de portefeuille
      await new Promise(resolve => setTimeout(resolve, 1500));
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Card title="Gestion de Portefeuille" icon={Briefcase}>
      <div className="space-y-6">
        <FormField label="Fournisseur de données">
          <Select
            options={providers.map(provider => ({
              value: provider.id,
              label: provider.name
            }))}
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
          />
        </FormField>

        <FormField label="Clé API">
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Entrez votre clé API"
          />
        </FormField>

        <div className="space-y-2">
          <Button
            onClick={handleConnect}
            isLoading={isConnecting}
            disabled={!selectedProvider || !apiKey}
            className="w-full"
          >
            Connecter le portefeuille
          </Button>
          <p className="text-sm text-gray-500 text-center">
            Synchronisez vos données de portefeuille en temps réel
          </p>
        </div>
      </div>
    </Card>
  );
}