import { useState, useEffect } from 'react';

export interface Organization {
  id: string;
  name: string;
  registrationNumber: string;
  taxId: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  legalForm: string;
  capital: string;
  currency: string;
  logo?: string;
  industry?: string;
}

export function useOrganization() {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données de l'organisation
    const mockOrganization: Organization = {
      id: '1',
      name: 'Kiota SARL',
      registrationNumber: 'SN-DKR-2024-B-1234',
      taxId: 'SN012345678',
      address: '123 Avenue Cheikh Anta Diop',
      city: 'Dakar',
      country: 'Sénégal',
      phone: '+221 33 000 00 00',
      email: 'contact@kiota.com',
      website: 'www.kiota.com',
      legalForm: 'SARL',
      capital: '10000000',
      currency: 'XOF',
      industry: 'Services'
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