import React from 'react';
import { Card } from '../ui/Card';
import { FileText, Download, Printer } from 'lucide-react';
import { Button } from '../ui/Button';
import { DECLARATION_TYPES } from '../../types/declarations';
import type { Declaration } from '../../types/declarations';

interface DeclarationPreviewProps {
  declaration: Declaration;
  onDownload: () => void;
  onPrint: () => void;
}

export function DeclarationPreview({ declaration, onDownload, onPrint }: DeclarationPreviewProps) {
  return (
    <Card title="Prévisualisation de la déclaration" icon={FileText}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Type de déclaration</p>
            <p className="font-medium">{DECLARATION_TYPES[declaration.type].label}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Période</p>
            <p className="font-medium">
              {declaration.periodicity === 'annual' 
                ? new Date(declaration.period).getFullYear()
                : new Date(declaration.period).toLocaleDateString('fr-FR', {
                    month: 'long',
                    year: 'numeric'
                  })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date limite</p>
            <p className="font-medium">
              {new Date(declaration.dueDate).toLocaleDateString('fr-FR')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Montant</p>
            <p className="font-medium">
              {declaration.amount.toLocaleString('fr-CD', {
                style: 'currency',
                currency: 'CDF'
              })}
            </p>
          </div>
        </div>

        {/* Contenu de la déclaration */}
        <div className="border rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Détails de la déclaration</h4>
          {/* Le contenu dépend du type de déclaration */}
          {declaration.type === 'IPR' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Base imposable</p>
                  <p className="font-medium">
                    {(declaration.amount * 0.8).toLocaleString('fr-CD', {
                      style: 'currency',
                      currency: 'CDF'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Taux d'imposition</p>
                  <p className="font-medium">20%</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {declaration.attachments && declaration.attachments.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Pièces jointes</h4>
            <ul className="space-y-2">
              {declaration.attachments.map((attachment, index) => (
                <li key={index} className="text-sm text-primary hover:text-primary-hover">
                  <a href={attachment} target="_blank" rel="noopener noreferrer">
                    Document {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            icon={Printer}
            onClick={onPrint}
          >
            Imprimer
          </Button>
          <Button
            variant="primary"
            icon={Download}
            onClick={onDownload}
          >
            Télécharger
          </Button>
        </div>
      </div>
    </Card>
  );
}