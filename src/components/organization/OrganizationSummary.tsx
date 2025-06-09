import React from 'react';
import { Card } from '../ui/Card';
import { Building2, MapPin, Phone, Mail, Globe } from 'lucide-react';
import type { Organization } from '../../hooks/useOrganization';

interface OrganizationSummaryProps {
  organization: Organization;
}

export function OrganizationSummary({ organization }: OrganizationSummaryProps) {
  return (
    <Card title="Informations de l'entreprise" icon={Building2}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nom</p>
            <p className="font-medium">{organization.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Forme juridique</p>
            <p className="font-medium">{organization.legalForm}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">RCCM</p>
            <p className="font-medium">{organization.registrationNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">NINEA</p>
            <p className="font-medium">{organization.taxId}</p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="space-y-3">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <span>{organization.address}, {organization.city}, {organization.country}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-2" />
              <span>{organization.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <span>{organization.email}</span>
            </div>
            {organization.website && (
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-400 mr-2" />
                <a 
                  href={`https://${organization.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-hover"
                >
                  {organization.website}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Capital social</p>
              <p className="font-medium">
                {parseInt(organization.capital).toLocaleString('fr-FR')} {organization.currency}
              </p>
            </div>
            {organization.industry && (
              <div>
                <p className="text-sm text-gray-500">Secteur d'activité</p>
                <p className="font-medium">{organization.industry}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}