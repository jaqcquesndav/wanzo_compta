import { useState, useEffect } from 'react';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { Switch } from '../../../../components/ui/Switch';
import { Database, Smartphone, LinkIcon, AlertTriangle, Loader2, type LucideIcon } from 'lucide-react'; // Import LucideIcon type
import { useAuth0 } from '@auth0/auth0-react';
import { ApiService } from '../../../../services/api/ApiService';
import type { ApiResponse } from '../../../../services/api/types';

interface DataSource {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon; // Changed from React.ReactNode to LucideIcon
  isConnected: boolean;
  isConfigurable?: boolean;
}

interface DataSourceSettingsResponse {
  sources: DataSource[];
}

// Mock initial data - will be replaced by API call
const MOCK_INITIAL_DATA_SOURCES: DataSource[] = [
  {
    id: 'wanzo-mobile',
    name: 'Wanzo Mobile',
    description: 'Application tout-en-un pour la gestion des ventes, facturation, caisse, stocks, clients, fournisseurs avec assistant Adha intégré',
    icon: Smartphone, // Store the component itself
    isConnected: false,
    isConfigurable: true,
  },
  {
    id: 'web-scraping',
    name: 'Collecte Web',
    description: 'Collecte automatique des données de factures électroniques et transactions en ligne',
    icon: LinkIcon, // Store the component itself
    isConnected: false,
    isConfigurable: true,
  },
  {
    id: 'external-db',
    name: 'Bases de données externes',
    description: 'Connexion à des bases de données tierces (ERP, CRM, etc.)',
    icon: Database, // Store the component itself
    isConnected: false,
    isConfigurable: true,
  }
];

export function DataSourceSettings() {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { user } = useAuth0();
  const roles = user?.[`${import.meta.env.VITE_AUTH0_AUDIENCE}/roles`] as string[] | undefined;
  const isAdmin = roles?.includes('admin');

  // Fetch initial settings
  useEffect(() => {
    const fetchSettings = async () => {
      if (!isAdmin) {
        setDataSources(MOCK_INITIAL_DATA_SOURCES); // Show mock data for non-admins
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const response: ApiResponse<DataSourceSettingsResponse> = await ApiService.get('/api/settings/data-sources');
        // Simulate API call
        // await new Promise(resolve => setTimeout(resolve, 1000));
        // const response: ApiResponse<DataSourceSettingsResponse> = { success: true, data: { sources: MOCK_INITIAL_DATA_SOURCES } };


        if (response.success && response.data) { // Add check for response.data
          setDataSources(response.data.sources);
        } else {
          throw new Error(response.error || "Failed to fetch data source settings");
        }
      } catch (err: any) {
        console.error("Failed to fetch data source settings:", err);
        setError(err.message || "Impossible de charger les configurations des sources de données. Veuillez réessayer plus tard.");
        setDataSources(MOCK_INITIAL_DATA_SOURCES); // Fallback to mock data
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, [isAdmin]);

  // Update settings via API
  const updateDataSourceSettings = async (updatedSources: DataSource[]) => {
    if (!isAdmin) return;
    setIsSaving(true);
    setError(null);
    try {
      const response: ApiResponse<DataSourceSettingsResponse> = await ApiService.put('/api/settings/data-sources', { sources: updatedSources });
      // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // const response: ApiResponse<DataSourceSettingsResponse> = { success: true, data: { sources: updatedSources } };

      if (response.success && response.data) { // Add check for response.data
        setDataSources(response.data.sources);
        console.log("Data source settings updated:", response.data.sources);
      } else {
        throw new Error(response.error || "Failed to update data source settings");
      }
    } catch (err: any) {
      console.error("Failed to update data source settings:", err);
      setError(err.message || "Impossible de sauvegarder les modifications. Veuillez réessayer.");
      // Optionally, revert to previous state or handle error more gracefully
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleSource = (sourceId: string, isConnected: boolean) => {
    if (!isAdmin || isSaving) return;
    const updatedSources = dataSources.map((source: DataSource) =>
      source.id === sourceId
        ? { ...source, isConnected }
        : source
    );
    setDataSources(updatedSources); // Optimistic update
    updateDataSourceSettings(updatedSources);
  };

  const handleConnectSource = (sourceId: string) => {
    if (!isAdmin || isSaving) return;
    // In a real app, this would open a configuration modal or redirect.
    // For now, we just toggle its connected state.
    const updatedSources = dataSources.map((source: DataSource) =>
      source.id === sourceId
        ? { ...source, isConnected: true } // Simulate connection
        : source
    );
    setDataSources(updatedSources); // Optimistic update
    updateDataSourceSettings(updatedSources);
  };


  if (isLoading) {
    return (
      <Card title="Sources de données" icon={Database}> {/* Pass component directly */}
        <div className="flex items-center justify-center p-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Chargement des sources de données...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Sources de données" icon={Database}> {/* Pass component directly */}
      <div className="space-y-6">
        {!isAdmin && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-700 flex items-center">
            <AlertTriangle className="h-5 w-5 inline mr-2 flex-shrink-0" />
            <span>Les modifications des sources de données sont réservées aux administrateurs. Vous visualisez la configuration actuelle.</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700 flex items-center">
            <AlertTriangle className="h-5 w-5 inline mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Configurez les sources externes pour enrichir vos données comptables et améliorer les analyses.
        </p>

        {dataSources.map((source: DataSource) => {
          const IconComponent = source.icon; // Get the component type
          return (
            <div key={source.id} className="border-t border-gray-200 dark:border-gray-700 pt-4 pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="mt-1 mr-3 flex-shrink-0">
                    <IconComponent className="h-6 w-6 text-primary" /> {/* Render the component */}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{source.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{source.description}</p>
                  </div>
                </div>
                <div className="flex items-center ml-4">
                  {isSaving && dataSources.find(ds => ds.id === source.id)?.isConnected !== source.isConnected && <Loader2 className="h-5 w-5 animate-spin mr-2 text-primary" />}
                  <Switch
                    id={`switch-${source.id}`}
                    checked={source.isConnected}
                    onCheckedChange={(checked) => handleToggleSource(source.id, checked)}
                    disabled={!isAdmin || isSaving}
                    aria-labelledby={`label-${source.id}`}
                  />
                </div>
              </div>
              
              {source.isConfigurable && !source.isConnected && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 ml-9"
                  onClick={() => handleConnectSource(source.id)}
                  disabled={!isAdmin || isSaving}
                >
                  {isSaving && dataSources.find(ds => ds.id === source.id)?.isConnected === false ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
                  {isSaving && dataSources.find(ds => ds.id === source.id)?.isConnected === false ? 'Configuration...' : 'Configurer la connexion'}
                </Button>
              )}
              
              {source.isConnected && (
                <div className="mt-2 ml-9 text-sm text-green-600 dark:text-green-500 flex items-center">
                  <span className="h-2 w-2 bg-green-600 rounded-full mr-2"></span>
                  Connecté
                </div>
              )}
               <label htmlFor={`switch-${source.id}`} id={`label-${source.id}`} className="sr-only">
                Toggle {source.name}
              </label>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
