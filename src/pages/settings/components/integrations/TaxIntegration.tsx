import React, { useState } from 'react';
import { Card } from '../../../../components/ui/Card';
import { FormField, Input } from '../../../../components/ui/Form';
import { Button } from '../../../../components/ui/Button';
import { Building } from 'lucide-react';

export function TaxIntegration() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // TODO: Implémenter la connexion aux impôts
      await new Promise(resolve => setTimeout(resolve, 1500));
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Card title="Intégration Impôts" icon={Building}>
      <div className="space-y-6">
        <FormField label="Identifiant DGID">
          <Input
            value={credentials.username}
            onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
            placeholder="Numéro NINEA"
          />
        </FormField>

        <FormField label="Mot de passe">
          <Input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
            placeholder="Mot de passe DGID"
          />
        </FormField>

        <div className="space-y-2">
          <Button
            onClick={handleConnect}
            isLoading={isConnecting}
            disabled={!credentials.username || !credentials.password}
            className="w-full"
          >
            Connecter aux Impôts
          </Button>
          <p className="text-sm text-gray-500 text-center">
            Accédez à vos déclarations fiscales en ligne
          </p>
        </div>
      </div>
    </Card>
  );
}