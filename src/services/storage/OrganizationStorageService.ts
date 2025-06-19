import { IndexedDBService } from './IndexedDBService';
import { StorageKeys } from './StorageKeys';
import type { Organization } from '../../hooks/useOrganization';

export class OrganizationStorageService {
  // Nom de la table dans IndexedDB
  private static STORE_NAME = 'organization';

  /**
   * Initialise le service et s'assure que le store existe
   */
  static async init(): Promise<void> {
    // S'assurer que la base de données est initialisée
    await IndexedDBService.initDB();
    
    // Vérifie si le store organization existe déjà, sinon il sera créé lors de l'upgrade
    try {
      await IndexedDBService.count(this.STORE_NAME);
    } catch (error) {
      console.warn('Organization store may not exist yet, it will be created on next DB upgrade');
    }
  }

  /**
   * Sauvegarde les informations de l'organisation dans IndexedDB
   */
  static async saveOrganization(organization: Organization): Promise<void> {
    try {
      // Vérifie si l'organisation existe déjà
      const existingOrg = await this.getOrganization();
      
      if (existingOrg) {
        // Mise à jour de l'organisation existante
        await IndexedDBService.update(this.STORE_NAME, {
          ...organization,
          id: existingOrg.id, // Conserver l'ID existant
          updatedAt: new Date().toISOString()
        });
      } else {
        // Création d'une nouvelle entrée
        await IndexedDBService.add(this.STORE_NAME, {
          ...organization,
          id: StorageKeys.ORGANIZATION, // Utiliser une clé constante pour faciliter la récupération
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error saving organization to IndexedDB:', error);
      throw new Error('Failed to save organization data');
    }
  }

  /**
   * Récupère les informations de l'organisation depuis IndexedDB
   */
  static async getOrganization(): Promise<Organization | null> {
    try {
      const organization = await IndexedDBService.get<Organization>(
        this.STORE_NAME, 
        StorageKeys.ORGANIZATION
      );
      
      return organization || null;
    } catch (error) {
      console.error('Error getting organization from IndexedDB:', error);
      return null;
    }
  }

  /**
   * Met à jour certaines propriétés de l'organisation
   */
  static async updateOrganization(data: Partial<Organization>): Promise<Organization | null> {
    try {
      const existingOrg = await this.getOrganization();
      
      if (!existingOrg) {
        throw new Error('Organization not found');
      }
      
      const updatedOrg = {
        ...existingOrg,
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      await IndexedDBService.update(this.STORE_NAME, updatedOrg);
      return updatedOrg;
    } catch (error) {
      console.error('Error updating organization in IndexedDB:', error);
      throw new Error('Failed to update organization data');
    }
  }
}
