import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export type IntegrationState = 'connected' | 'disconnected' | 'pending' | 'error';

interface IntegrationStatusProps {
  state: IntegrationState;
  lastSync?: string;
}

export function IntegrationStatus({ state, lastSync }: IntegrationStatusProps) {
  const statusConfig = {
    connected: {
      icon: CheckCircle,
      text: 'Connecté',
      color: 'text-success'
    },
    disconnected: {
      icon: XCircle,
      text: 'Non connecté',
      color: 'text-text-tertiary'
    },
    pending: {
      icon: AlertCircle,
      text: 'En attente de validation',
      color: 'text-warning'
    },
    error: {
      icon: XCircle,
      text: 'Erreur de connexion',
      color: 'text-destructive'
    }
  };

  const { icon: Icon, text, color } = statusConfig[state];

  return (
    <div className="flex items-center justify-between py-2">
      <div className={`flex items-center ${color}`}>
        <Icon className="h-5 w-5 mr-2" />
        <span className="text-sm font-medium">{text}</span>
      </div>
      {lastSync && (
        <span className="text-xs text-text-tertiary">
          Dernière synchro: {new Date(lastSync).toLocaleString('fr-FR')}
        </span>
      )}
    </div>
  );
}