import { useState, useEffect } from 'react';
import { CurrencyCode } from '../config/currency';
import { OrganizationStorageService } from '../services/storage/OrganizationStorageService';

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

  // Initialiser et charger les données de l'organisation depuis IndexedDB
  useEffect(() => {
    const loadOrganization = async () => {
      try {
        // Initialiser le service de stockage
        await OrganizationStorageService.init();
        
        // Tenter de récupérer l'organisation depuis IndexedDB
        let org = await OrganizationStorageService.getOrganization();
        
        // Si aucune organisation n'est trouvée, créer une organisation par défaut
        if (!org) {
          const defaultOrg: Organization = {
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
          
          // Sauvegarder l'organisation par défaut dans IndexedDB
          await OrganizationStorageService.saveOrganization(defaultOrg);
          org = defaultOrg;
        }
        
        setOrganization(org);
      } catch (error) {
        console.error('Error loading organization:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrganization();
  }, []);

  // Mettre à jour l'organisation
  const updateOrganization = async (data: Partial<Organization>) => {
    if (!organization) return null;
    
    try {
      // Mettre à jour dans IndexedDB
      const updatedOrg = await OrganizationStorageService.updateOrganization(data);
      
      if (updatedOrg) {
        setOrganization(updatedOrg);
        return updatedOrg;
      }
      
      return null;
    } catch (error) {
      console.error('Error updating organization:', error);
      throw error;
    }
  };

  return {
    organization,
    loading,
    updateOrganization
  };
}