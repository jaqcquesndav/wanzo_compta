import { useState, useEffect } from 'react';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { Checkbox } from '../../../../components/ui/Checkbox';
import { Switch } from '../../../../components/ui/Switch';
import { ConsentModal } from '../../../../components/ui/ConsentModal';
import { Info, Share2, Loader2, AlertTriangle } from 'lucide-react';
import { ApiService } from '../../../../services/api/ApiService';
import { useAuth0 } from '@auth0/auth0-react';

// Define the structure for sharing options
interface SharingOptions {
  banks: boolean;
  microfinance: boolean;
  coopec: boolean;
  analysts: boolean;
  partners: boolean;
  // consentGiven might also be part of this object if fetched from backend
}

interface SharingSettingsResponse extends SharingOptions {
  consentGiven: boolean;
}

export function DataSharingSettings() {
  const { user } = useAuth0();
  const roles = user?.[`${import.meta.env.VITE_AUTH0_AUDIENCE}/roles`] as string[] | undefined;
  const isAdmin = roles?.includes('admin'); // Derive isAdmin from user role

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [sharingOptions, setSharingOptions] = useState<SharingOptions>({
    banks: false,
    microfinance: false,
    coopec: false,
    analysts: false,
    partners: false
  });
  const [enableAll, setEnableAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial settings
  useEffect(() => {
    const fetchSettings = async () => {
      if (!isAdmin) {
        // setError("Vous n'avez pas les droits pour voir ces paramètres.");
        // Or simply don't load anything if non-admins shouldn't see this section
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const response = await ApiService.get<SharingSettingsResponse>('/api/settings/data-sharing');
        // Mocking API response for now - REMOVE THIS BLOCK WHEN API IS READY
        // await new Promise(resolve => setTimeout(resolve, 1000));
        // const mockResponseData: SharingSettingsResponse = {
        //   banks: true,
        //   microfinance: false,
        //   coopec: true,
        //   analysts: true,
        //   partners: false,
        //   consentGiven: true
        // }; 
        // const response = { success: true, data: mockResponseData };
        // END MOCK

        if (!response.success || !response.data) { // Check for response.data
          throw new Error(response.error || "Failed to fetch settings");
        }
        const { consentGiven: fetchedConsent, ...options } = response.data;
        setSharingOptions(options);
        setEnableAll(Object.values(options).every(val => val === true));
        setConsentGiven(fetchedConsent);
      } catch (err: any) {
        setError(err.message || "Une erreur est survenue lors du chargement des paramètres.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, [isAdmin]);

  const updateSettings = async (newOptions: SharingOptions, newEnableAllState: boolean, newConsentState?: boolean) => {
    if (!isAdmin) {
      setError("Vous n'avez pas les droits pour modifier ces paramètres.");
      return;
    }
    setIsLoading(true);
    setError(null);
    const payload = { ...newOptions, consentGiven: newConsentState ?? consentGiven };
    try {
      const response = await ApiService.put<SharingSettingsResponse>('/api/settings/data-sharing', payload);
      // Mocking API response - REMOVE THIS BLOCK WHEN API IS READY
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // const mockResponseData: SharingSettingsResponse = payload;
      // const response = { success: true, data: mockResponseData };
      // END MOCK

      if (!response.success || !response.data) { // Check for response.data
        throw new Error(response.error || "Failed to save settings");
      }
      const { consentGiven: updatedConsent, ...options } = response.data;
      setSharingOptions(options);
      setEnableAll(newEnableAllState);
      if (newConsentState !== undefined) {
        setConsentGiven(updatedConsent);
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la sauvegarde des paramètres.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnableAllToggle = (enabled: boolean) => {
    if (!isAdmin) {
        setError("Vous n'avez pas les droits pour modifier ces paramètres.");
        return;
    }
    if (enabled && !consentGiven) {
      setIsModalOpen(true);
    } else {
      const newOptionsState = {
        banks: enabled,
        microfinance: enabled,
        coopec: enabled,
        analysts: enabled,
        partners: enabled
      };
      updateSettings(newOptionsState, enabled);
    }
  };

  const handleOptionChange = (option: keyof SharingOptions, checked: boolean) => {
     if (!isAdmin) {
        setError("Vous n'avez pas les droits pour modifier ces paramètres.");
        return;
    }
    if (checked && !consentGiven) {
      // Potentially store which option triggered the modal if needed for more granular consent handling
      setIsModalOpen(true);
    } else {
      const newOptions = { ...sharingOptions, [option]: checked };
      const allNowEnabled = Object.values(newOptions).every(val => val === true);
      updateSettings(newOptions, allNowEnabled);
    }
  };

  const handleConsentConfirmed = () => {
    // This function now assumes that if consent is given, we should try to enable everything
    // or the specific item that was clicked if we stored that information.
    // For simplicity, let's assume it implies enabling all if enableAll was the trigger,
    // or if any individual item was toggled to true.
    // A more robust implementation would track the pending action.
    const newOptionsState = {
      banks: true,
      microfinance: true,
      coopec: true,
      analysts: true,
      partners: true
    };
    updateSettings(newOptionsState, true, true);
    setIsModalOpen(false); // Close modal after action
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    // If user closes modal without consenting, we might need to revert optimistic UI changes.
    // For now, the actual state is controlled by API response, so UI should reflect last saved state.
    // Consider refetching or ensuring no optimistic updates occur before consent is confirmed.
  };

  if (!isAdmin && !isLoading) { // If not admin and not loading, don't show the card or show a message
    return (
      <Card title="Partage de données" icon={Share2}>
        <div className="p-4 text-sm text-text-secondary">
          Vous n'avez pas les permissions nécessaires pour configurer le partage de données.
        </div>
      </Card>
    );
  }
  
  if (isLoading) {
    return (
      <Card title="Partage de données" icon={Share2}>
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Chargement des paramètres...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Partage de données" icon={Share2}>
      {error && (
        <div className="mb-4 bg-error-50 border border-error-200 rounded-lg p-3 text-sm text-error-700 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}
      <div className="space-y-6">
        <div className="bg-info-50 border border-info-200 rounded-lg p-4 text-sm text-text-secondary">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-info-500 mr-2 mt-0.5" />
            <div>
              <p>
                Le partage de vos données comptables peut vous aider à accéder plus facilement à des 
                solutions de financement et à recevoir des conseils personnalisés.
              </p>
              <Button 
                variant="link"
                className="p-0 h-auto text-info-600 hover:text-info-700 mt-1"
                onClick={() => window.open('/data-sharing-benefits', '_blank')}
              >
                En savoir plus sur les avantages du partage de données
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-md font-medium text-text-primary">Activer tout le partage</h3>
            <p className="text-sm text-text-tertiary">Partager les données avec tous les partenaires</p>
          </div>
          <Switch 
            checked={enableAll} 
            onCheckedChange={handleEnableAllToggle} 
            disabled={!isAdmin || isLoading} 
          />
        </div>

        <div className="border-t border-border pt-4">
          <h3 className="text-md font-medium text-text-primary mb-4">Partage ciblé</h3>
          
          <div className="space-y-3">
            {(Object.keys(sharingOptions) as Array<keyof SharingOptions>).map((key) => {
              // Create more descriptive labels/descriptions based on the key
              let label = key.charAt(0).toUpperCase() + key.slice(1);
              let description = `Partager les données avec ${label.toLowerCase()}`;
              if (key === 'banks') { label = 'Banques'; description = "Facilite l'accès aux crédits bancaires et services financiers"; }
              if (key === 'microfinance') { label = 'Institutions de Microfinance'; description = "Permet d'accéder à des microcrédits et solutions de financement adaptées"; }
              if (key === 'coopec') { label = 'COOPEC'; description = "Accès à des solutions de financement coopératives"; }
              if (key === 'analysts') { label = 'Analystes de i-KiotaHub'; description = "Bénéficiez de conseils personnalisés basés sur vos données"; }
              if (key === 'partners') { label = 'Partenaires techniques et financiers'; description = "Facilite l'accès aux subventions et investissements"; }

              return (
                <Checkbox
                  key={key}
                  id={`share-${key}`}
                  label={label}
                  description={description}
                  checked={sharingOptions[key]}
                  onChange={(e) => handleOptionChange(key, e.target.checked)}
                  disabled={!isAdmin || isLoading}
                />
              );
            })}
          </div>
        </div>
      </div>

      <ConsentModal 
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConsentConfirmed}
        // Add disabled prop to confirm button if needed, e.g., disabled={isLoading}
      />
    </Card>
  );
}
