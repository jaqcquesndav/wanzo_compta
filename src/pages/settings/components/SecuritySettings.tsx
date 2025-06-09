import React, { useState } from 'react';
import { FormField, Select, Input } from '../../../components/ui/Form';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Toggle } from '../../../components/ui/Toggle';
import { Radio } from '../../../components/ui/Radio';

interface SecuritySettings {
  passwordPolicy: {
    requireSpecialChars: boolean;
    requireNumbers: boolean;
    requireMixedCase: boolean;
    minLength: boolean;
  };
  twoFactorAuth: 'disabled' | 'optional' | 'required';
  sessionDuration: number;
}

export function SecuritySettings() {
  const [settings, setSettings] = useState<SecuritySettings>({
    passwordPolicy: {
      requireSpecialChars: true,
      requireNumbers: true,
      requireMixedCase: true,
      minLength: true
    },
    twoFactorAuth: 'optional',
    sessionDuration: 60
  });

  const handlePasswordPolicyChange = (key: keyof SecuritySettings['passwordPolicy']) => {
    setSettings(prev => ({
      ...prev,
      passwordPolicy: {
        ...prev.passwordPolicy,
        [key]: !prev.passwordPolicy[key]
      }
    }));
  };

  const handleTwoFactorChange = (value: SecuritySettings['twoFactorAuth']) => {
    setSettings(prev => ({
      ...prev,
      twoFactorAuth: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement settings update
    console.log('Updated settings:', settings);
  };

  return (
    <div className="space-y-6">
      <Card title="Sécurité et authentification">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <FormField label="Politique de mot de passe">
              <div className="space-y-3">
                <Toggle
                  label="Exiger des caractères spéciaux"
                  checked={settings.passwordPolicy.requireSpecialChars}
                  onChange={() => handlePasswordPolicyChange('requireSpecialChars')}
                />
                <Toggle
                  label="Exiger des chiffres"
                  checked={settings.passwordPolicy.requireNumbers}
                  onChange={() => handlePasswordPolicyChange('requireNumbers')}
                />
                <Toggle
                  label="Exiger des majuscules et minuscules"
                  checked={settings.passwordPolicy.requireMixedCase}
                  onChange={() => handlePasswordPolicyChange('requireMixedCase')}
                />
                <Toggle
                  label="Longueur minimale de 8 caractères"
                  checked={settings.passwordPolicy.minLength}
                  onChange={() => handlePasswordPolicyChange('minLength')}
                />
              </div>
            </FormField>

            <FormField label="Double authentification">
              <div className="space-y-3">
                <Radio
                  label="Désactivée"
                  checked={settings.twoFactorAuth === 'disabled'}
                  onChange={() => handleTwoFactorChange('disabled')}
                  name="2fa"
                />
                <Radio
                  label="Optionnelle"
                  checked={settings.twoFactorAuth === 'optional'}
                  onChange={() => handleTwoFactorChange('optional')}
                  name="2fa"
                />
                <Radio
                  label="Obligatoire"
                  checked={settings.twoFactorAuth === 'required'}
                  onChange={() => handleTwoFactorChange('required')}
                  name="2fa"
                />
              </div>
            </FormField>

            <FormField label="Durée de session (minutes)">
              <Input
                type="number"
                min="5"
                max="480"
                value={settings.sessionDuration}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  sessionDuration: parseInt(e.target.value, 10)
                }))}
              />
            </FormField>
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              Mettre à jour la sécurité
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}