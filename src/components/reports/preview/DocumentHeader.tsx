import React from 'react';
import { Building2, User, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

interface DocumentHeaderProps {
  company: {
    name: string;
    address: string;
    registrationNumber: string;
  };
  document: {
    type: 'balance' | 'income' | 'cashflow';
    period: string;
    generatedBy: string;
    generatedAt: string;
    isAudited: boolean;
  };
  metrics: {
    creditScore: number;
    financialRating: string;
    carbonFootprint: number;
  };
}

export function DocumentHeader({ company, document, metrics }: DocumentHeaderProps) {
  return (
    <div className="space-y-6 border-b pb-6 mb-6">
      {/* En-tête de l'entreprise */}
      <div className="flex justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">{company.name}</h2>
          </div>
          <p className="text-sm text-gray-600">{company.address}</p>
          <p className="text-sm text-gray-600">RCCM: {company.registrationNumber}</p>
        </div>
        
        <div className="text-right space-y-1">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Score crédit:</span> {metrics.creditScore}/100
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Note financière:</span> {metrics.financialRating}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Empreinte carbone:</span> {metrics.carbonFootprint}t CO₂
          </p>
        </div>
      </div>

      {/* Informations du document */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Période</span>
          </div>
          <p className="font-medium">{document.period}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>Généré par</span>
          </div>
          <p className="font-medium">{document.generatedBy}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Date de génération</span>
          </div>
          <p className="font-medium">
            {new Date(document.generatedAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            {document.isAudited ? (
              <CheckCircle className="h-4 w-4 text-success" />
            ) : (
              <AlertCircle className="h-4 w-4 text-warning" />
            )}
            <span>Statut</span>
          </div>
          <p className="font-medium">
            {document.isAudited ? 'Audité' : 'Non audité'}
          </p>
        </div>
      </div>
    </div>
  );
}