import React, { useState } from 'react';
import { Card } from '../../../../components/ui/Card';
import { FormField, Input } from '../../../../components/ui/Form';
import { Button } from '../../../../components/ui/Button';
import { FileText } from 'lucide-react';

export function EInvoiceIntegration() {
  const [apiKey, setApiKey] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // TODO: Implémenter la connexion E-Facture
      await new Promise(resolve => setTimeout(resolve, 1500));
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Card title="Intégration E-Facture" icon={FileText}>
      <div className="space-y-6">
        <FormField label="Clé API E-Facture">
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
            disabled={!apiKey}
            className="w-full"
          >
            Connecter E-Facture
          </Button>
          <p className="text-sm text-gray-500 text-center">
            Connectez-vous au système national de facturation électronique
          </p>
        </div>
      </div>
    </Card>
  );
}