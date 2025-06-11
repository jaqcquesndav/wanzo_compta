import { Card } from '../ui/Card';
import { Building2, MapPin, Phone, Mail, Globe, Briefcase } from 'lucide-react';
import type { Organization } from '../../hooks/useOrganization';

interface OrganizationSummaryProps {
  organization: Organization;
}

export function OrganizationSummary({ organization }: OrganizationSummaryProps) {
  return (
    <Card title="Informations de l'entreprise" icon={Building2}>
      <div className="space-y-6">
        {/* Informations principales de l'entreprise */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nom de l'entreprise</p>
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
            <p className="text-sm text-gray-500">Numéro d'Impôt</p>
            <p className="font-medium">{organization.taxId || 'Non spécifié'}</p>
          </div>
        </div>

        {/* Informations sur l'entrepreneur et associés */}
        <div className="pt-4 border-t">
          <h3 className="text-sm font-semibold mb-3">Direction de l'entreprise</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Nom de l'entrepreneur</p>
              <p className="font-medium">{organization.entrepreneurName}</p>
            </div>
            {organization.entrepreneurPhone && (
              <div>
                <p className="text-sm text-gray-500">Téléphone entrepreneur</p>
                <p className="font-medium">{organization.entrepreneurPhone}</p>
              </div>
            )}
            {organization.entrepreneurEmail && (
              <div>
                <p className="text-sm text-gray-500">E-mail entrepreneur</p>
                <p className="font-medium">{organization.entrepreneurEmail}</p>
              </div>
            )}
          </div>
          
          {organization.associates && (
            <div className="mt-3">
              <p className="text-sm text-gray-500">Autres associés</p>
              <p className="font-medium">{organization.associates}</p>
            </div>
          )}
        </div>

        {/* Numéros d'affiliations */}
        <div className="pt-4 border-t">
          <h3 className="text-sm font-semibold mb-3">Numéros d'affiliations</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">CNSS</p>
              <p className="font-medium">{organization.cnssNumber || 'Non spécifié'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">INPP</p>
              <p className="font-medium">{organization.inppNumber || 'Non spécifié'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ONEM</p>
              <p className="font-medium">{organization.onemNumber || 'Non spécifié'}</p>
            </div>
          </div>
        </div>

        {/* Coordonnées de l'entreprise */}
        <div className="pt-4 border-t">
          <h3 className="text-sm font-semibold mb-3">Coordonnées et activité</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <span>
                {organization.address ? `${organization.address}, ` : ''}
                {organization.city}, {organization.country}
              </span>
            </div>
            
            {organization.phone && (
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <span>Téléphone entreprise: {organization.phone}</span>
              </div>
            )}
            
            {organization.email && (
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <span>E-mail entreprise: {organization.email}</span>
              </div>
            )}
            
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
            
            {organization.industry && (
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                <span>Secteur d'activité: {organization.industry}</span>
              </div>
            )}
          </div>
        </div>

        {/* Informations financières */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Capital social</p>
              <p className="font-medium">
                {parseInt(organization.capital).toLocaleString('fr-FR')} {organization.currency}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}