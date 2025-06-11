import { useState, useEffect } from 'react';
import { CurrencyCode } from '../config/currency';

export interface Organization {
  id: string;
  name: string;
  entrepreneurName: string;     // Nom de l'entrepreneur
  associates?: string;          // Autres associés
  registrationNumber: string;   // RCCM
  taxId: string;                // Numéro impôt
  cnssNumber?: string;          // Numéro affiliation CNSS
  inppNumber?: string;          // Numéro affiliation INPP
  onemNumber?: string;          // Numéro affiliation ONEM
  address: string;
  city: string;
  country: string;
  phone: string;                // Téléphone entreprise
  entrepreneurPhone?: string;   // Téléphone entrepreneur
  email: string;                // Email entreprise
  entrepreneurEmail?: string;   // Email entrepreneur
  website: string;
  legalForm: string;
  capital: string;
  currency: CurrencyCode;
  logo?: string;
  industry?: string;            // Secteur d'activité
  description?: string;
}

export function useOrganization() {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données de l'entreprise
    const mockOrganization: Organization = {
      id: '1',
      name: 'ZERO PANNE',
      entrepreneurName: 'KAKULE NDAVARO Jacques',
      associates: 'Nick AZARIA MICHAEL, MWANABUTE SHAULA Christian, KATEMBO KANIKI Joseph, Prosper LOBOBO OMEKANDA',
      registrationNumber: 'CD/GOM/RCCM/22-B-00008',
      taxId: '4876',
      cnssNumber: '',
      inppNumber: '',
      onemNumber: '',
      address: '',
      city: 'GOMA',
      country: 'RD Congo',
      phone: '',
      entrepreneurPhone: '243-972-252-499',
      email: '',
      entrepreneurEmail: 'jacquesdav@gmail.com',
      website: '',
      legalForm: 'SARL',
      capital: '10000000',
      currency: 'CDF',
      industry: 'Maintenance automobile et industrielle'
    };

    setOrganization(mockOrganization);
    setLoading(false);
  }, []);

  const updateOrganization = async (data: Partial<Organization>) => {
    if (!organization) return;
    
    // Simuler la mise à jour
    const updatedOrganization = {
      ...organization,
      ...data
    };

    setOrganization(updatedOrganization);
    return updatedOrganization;
  };

  return {
    organization,
    loading,
    updateOrganization
  };
}