import React from 'react';
import { Building2, Star, Award, CheckCircle, AlertCircle } from 'lucide-react';

interface ReportHeaderProps {
  organization: {
    name: string;
    address: string;
    registrationNumber: string;
    taxId: string;
    creditScore?: number;
    esgScore?: string;
    financialRating?: string;
  };
  title: string;
  isAudited: boolean;
  generatedBy: string;
  currency: 'USD' | 'CDF';
}

export function ReportHeader({
  organization,
  title,
  isAudited,
  generatedBy,
  currency
}: ReportHeaderProps) {
  return (
    <div className="space-y-6 border-b pb-6 mb-6">
      {/* En-tête de l'entreprise */}
      <div className="flex justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">{organization.name}</h2>
          </div>
          <p className="text-sm text-gray-600">{organization.address}</p>
          <p className="text-sm text-gray-600">
            RCCM: {organization.registrationNumber} - NINEA: {organization.taxId}
          </p>
        </div>
        
        <div className="text-right space-y-1">
          <div className="flex items-center justify-end space-x-2">
            <Star className="h-4 w-4 text-primary" />
            <p className="text-sm text-gray-600">
              <span className="font-medium">Cote crédit:</span> {organization.creditScore}/100
            </p>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <Award className="h-4 w-4 text-success" />
            <p className="text-sm text-gray-600">
              <span className="font-medium">Code ESG:</span> {organization.esgScore}
            </p>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <Star className="h-4 w-4 text-warning" />
            <p className="text-sm text-gray-600">
              <span className="font-medium">Note financière:</span> {organization.financialRating}
            </p>
          </div>
        </div>
      </div>

      {/* Informations du document */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">Exercice {new Date().getFullYear()}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Devise</p>
          <p className="font-medium">{currency}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Généré par</p>
          <p className="font-medium">{generatedBy}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Statut</p>
          <div className="flex items-center space-x-1">
            {isAudited ? (
              <>
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-success font-medium">Audité</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-warning" />
                <span className="text-warning font-medium">Non audité</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Document généré le {new Date().toLocaleDateString('fr-FR')} à {new Date().toLocaleTimeString('fr-FR')}
      </div>
    </div>
  );
}