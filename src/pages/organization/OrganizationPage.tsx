import React, { useState } from 'react';
import { Building2, Plus } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { OrganizationFormModal } from '../../components/organization/OrganizationFormModal';
import { OrganizationLogo } from '../../components/organization/OrganizationLogo';
import { OrganizationSummary } from '../../components/organization/OrganizationSummary';
import { useOrganization } from '../../hooks/useOrganization';

export function OrganizationPage() {
  const { organization, loading, updateOrganization } = useOrganization();
  const [showFormModal, setShowFormModal] = useState(false);

  if (loading) {
    return <div>Chargement...</div>;
  }

  const handleLogoUpload = async (file: File) => {
    // TODO: Implémenter l'upload du logo
    console.log('Upload logo:', file);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Entreprise</h1>
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
          <OrganizationSummary organization={organization} />
        </div>

        <div className="space-y-6">
          <Card title="Logo" icon={Building2}>
            <OrganizationLogo
              logo={organization?.logo}
              onUpload={handleLogoUpload}
            />
          </Card>
        </div>
      </div>

      <OrganizationFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        organization={organization}
        onSubmit={updateOrganization}
      />
    </div>
  );
}