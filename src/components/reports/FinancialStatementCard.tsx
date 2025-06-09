import React from 'react';
import { Card } from '../ui/Card';
import { FileText, Download } from 'lucide-react';
import { Button } from '../ui/Button';

interface FinancialStatementCardProps {
  title: string;
  description: string;
  lastGenerated?: string;
  onGenerate: () => void;
  onDownload?: () => void;
  loading?: boolean;
}

export function FinancialStatementCard({
  title,
  description,
  lastGenerated,
  onGenerate,
  onDownload,
  loading
}: FinancialStatementCardProps) {
  return (
    <Card 
      title={title}
      icon={FileText}
      className="h-full"
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">{description}</p>
        
        {lastGenerated && (
          <p className="text-xs text-gray-500">
            Dernière génération: {lastGenerated}
          </p>
        )}
        
        <div className="flex space-x-3">
          <Button
            variant="primary"
            onClick={onGenerate}
            isLoading={loading}
          >
            Générer
          </Button>
          
          {onDownload && (
            <Button
              variant="secondary"
              icon={Download}
              onClick={onDownload}
              disabled={!lastGenerated}
            >
              Télécharger
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}