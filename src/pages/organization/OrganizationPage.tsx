import { useState } from 'react';
import { Building2, Plus, Loader } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { OrganizationFormModal } from '../../components/organization/OrganizationFormModal';
import { OrganizationLogo } from '../../components/organization/OrganizationLogo';
import { OrganizationSummary } from '../../components/organization/OrganizationSummary';
import { useOrganization } from '../../hooks/useOrganization';
import { CloudinaryService } from '../../services/cloudinary/CloudinaryService';
import { toast } from 'react-hot-toast';

export function OrganizationPage() {
  const { organization, loading, updateOrganization } = useOrganization();
  const [showFormModal, setShowFormModal] = useState(false);
  const [logoLoading, setLogoLoading] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-8 w-8 text-primary animate-spin" />
        <span className="ml-2 text-text-primary">Chargement des informations de l'entreprise...</span>
      </div>
    );
  }

  const handleLogoUpload = async (file: File) => {
    setLogoLoading(true);
    try {
      // Upload du logo vers Cloudinary
      const logoUrl = await CloudinaryService.uploadFile(file, 'organization-logos');
      
      // Mise à jour des données de l'organisation
      const updatedOrg = await updateOrganization({ logo: logoUrl });
      
      toast.success('Logo téléchargé avec succès');
      return updatedOrg;
    } catch (error) {
      console.error('Erreur lors du téléchargement du logo:', error);
      toast.error(error instanceof Error ? error.message : 'Erreur lors du téléchargement du logo');
      throw error;
    } finally {
      setLogoLoading(false);
    }
  };

  const handleLogoRemove = async () => {
    setLogoLoading(true);
    try {
      // Mise à jour des données de l'organisation
      const updatedOrg = await updateOrganization({ logo: undefined });
      
      toast.success('Logo supprimé avec succès');
      return updatedOrg;
    } catch (error) {
      console.error('Erreur lors de la suppression du logo:', error);
      toast.error('Erreur lors de la suppression du logo');
      throw error;
    } finally {
      setLogoLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">Entreprise</h1>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setShowFormModal(true)}
        >
          {organization ? 'Modifier' : 'Nouvelle Entreprise'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OrganizationSummary organization={organization!} />
        </div>        <div className="space-y-6">
          <Card title="Logo" icon={Building2}>
            {logoLoading ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="h-32 w-32 rounded-lg bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <Loader className="h-12 w-12 text-primary animate-spin" />
                </div>
                <p className="text-sm text-gray-500">Traitement du logo en cours...</p>
              </div>
            ) : (
              <OrganizationLogo
                logo={organization?.logo}
                onUpload={async (file) => {
                  await handleLogoUpload(file);
                }}
                onRemove={async () => {
                  await handleLogoRemove();
                }}
              />
            )}
          </Card>
        </div>
      </div>

      <OrganizationFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        organization={organization || undefined}
        onSubmit={async (data) => {
          await updateOrganization(data);
        }}
      />
    </div>
  );
}