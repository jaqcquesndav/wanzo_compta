import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { FormField, Select, Input } from '../ui/Form';
import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';
import type { FinancialStatementType } from '../../types/reports';

interface ReportConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (config: ReportConfig) => void;
}

export interface ReportConfig {
  type: FinancialStatementType;
  period: string;
  format: 'pdf' | 'excel';
  showComparison: boolean;
  showAnalytics: boolean;
  currency: string;
  template: string;
}

const STATEMENT_TYPES = {
  'balance': 'Bilan',
  'income': 'Compte de Résultat',
  'cashflow': 'Tableau des Flux de Trésorerie',
  'equity-changes': 'Tableau de Variation des Capitaux Propres',
  'notes': 'Notes Annexes',
  'reconciliation': 'État de Rapprochement',
  'analytical': 'État Analytique',
  'social': 'Bilan Social',
  'statistics': 'État Statistique'
} as const;

export function ReportConfigModal({ isOpen, onClose, onSubmit }: ReportConfigModalProps) {
  const [config, setConfig] = useState<ReportConfig>({
    type: 'balance',
    period: new Date().getFullYear().toString(),
    format: 'pdf',
    showComparison: true,
    showAnalytics: true,
    currency: 'CDF',
    template: 'syscohada'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(config);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configuration de l'état financier"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="Type d'état" required>
          <Select
            value={config.type}
            onChange={(e) => setConfig({ ...config, type: e.target.value as FinancialStatementType })}
            options={Object.entries(STATEMENT_TYPES).map(([value, label]) => ({
              value,
              label
            }))}
          />
          <p className="mt-1 text-sm text-gray-500">
            {getStateDescription(config.type)}
          </p>
        </FormField>

        <FormField label="Période" required>
          {config.type === 'balance' || config.type === 'notes' ? (
            <Input
              type="date"
              value={config.period}
              onChange={(e) => setConfig({ ...config, period: e.target.value })}
              required
            />
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                placeholder="Date début"
                onChange={(e) => setConfig({ ...config, period: e.target.value })}
                required
              />
              <Input
                type="date"
                placeholder="Date fin"
                onChange={(e) => setConfig({ ...config, period: e.target.value })}
                required
              />
            </div>
          )}
        </FormField>

        <FormField label="Format de sortie" required>
          <Select
            value={config.format}
            onChange={(e) => setConfig({ ...config, format: e.target.value as 'pdf' | 'excel' })}
            options={[
              { value: 'pdf', label: 'PDF' },
              { value: 'excel', label: 'Excel' }
            ]}
          />
        </FormField>

        <FormField label="Devise" required>
          <Select
            value={config.currency}
            onChange={(e) => setConfig({ ...config, currency: e.target.value })}
            options={[
              { value: 'CDF', label: 'Franc Congolais (CDF)' },
              { value: 'USD', label: 'Dollar Américain (USD)' }
            ]}
          />
        </FormField>

        <FormField label="Référentiel" required>
          <Select
            value={config.template}
            onChange={(e) => setConfig({ ...config, template: e.target.value })}
            options={[
              { value: 'syscohada', label: 'SYSCOHADA Révisé' },
              { value: 'ohada', label: 'OHADA' },
              { value: 'ifrs', label: 'IFRS' }
            ]}
          />
        </FormField>

        <div className="space-y-4">
          <Toggle
            label="Inclure la comparaison N-1"
            checked={config.showComparison}
            onChange={(checked) => setConfig({ ...config, showComparison: checked })}
          />
          <Toggle
            label="Afficher les indicateurs analytiques"
            checked={config.showAnalytics}
            onChange={(checked) => setConfig({ ...config, showAnalytics: checked })}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Annuler
          </Button>
          <Button type="submit">
            Générer
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function getStateDescription(type: FinancialStatementType): string {
  switch (type) {
    case 'balance':
      return 'État de la situation financière présentant l\'actif, le passif et les capitaux propres';
    case 'income':
      return 'État des produits et charges présentant la performance financière';
    case 'cashflow':
      return 'État des entrées et sorties de trésorerie';
    case 'equity-changes':
      return 'État de l\'évolution des capitaux propres';
    case 'notes':
      return 'Informations complémentaires sur les états financiers';
    case 'reconciliation':
      return 'État de rapprochement des soldes bancaires';
    case 'analytical':
      return 'État détaillé par centres de coûts et activités';
    case 'social':
      return 'État des indicateurs sociaux et RH';
    case 'statistics':
      return 'État des données statistiques et ratios';
    default:
      return '';
  }
}