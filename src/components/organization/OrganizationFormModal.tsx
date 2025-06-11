import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { FormField, Input, Select, Textarea } from '../ui/Form';
import { Button } from '../ui/Button';
import { Building2, MapPin, Phone, Mail, Globe, Briefcase } from 'lucide-react';
import type { Organization } from '../../hooks/useOrganization';

interface OrganizationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  organization?: Organization;
  onSubmit: (data: Partial<Organization>) => Promise<void>;
}

export function OrganizationFormModal({ isOpen, onClose, organization, onSubmit }: OrganizationFormModalProps) {
  const [formData, setFormData] = useState<Partial<Organization>>(organization || {
    name: '',
    legalForm: '',
    registrationNumber: '',
    taxId: '',
    address: '',
    city: '',
    country: '',
    phone: '',
    email: '',
    website: '',
    capital: '',
    currency: 'CDF',
    industry: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={organization ? "Modifier l'entreprise" : "Nouvelle entreprise"}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations générales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Nom de l'entreprise" required>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              icon={Building2}
              required
            />
          </FormField>

          <FormField label="Forme juridique">
            <Select
              value={formData.legalForm}
              onChange={(e) => setFormData(prev => ({ ...prev, legalForm: e.target.value }))}
              options={[
                { value: 'SARL', label: 'SARL' },
                { value: 'SA', label: 'SA' },
                { value: 'SAS', label: 'SAS' },
                { value: 'EI', label: 'Entreprise Individuelle' },
                { value: 'GIE', label: 'GIE' }
              ]}
            />
          </FormField>

          <FormField label="Capital social">
            <div className="relative">
              <Input
                value={formData.capital}
                onChange={(e) => setFormData(prev => ({ ...prev, capital: e.target.value }))}
                type="number"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                {formData.currency}
              </span>
            </div>
          </FormField>

          <FormField label="Secteur d'activité">
            <Input
              value={formData.industry}
              onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
              icon={Briefcase}
            />
          </FormField>

          <FormField label="RCCM" required>
            <Input
              value={formData.registrationNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, registrationNumber: e.target.value }))}
              required
            />
          </FormField>

          <FormField label="NINEA" required>
            <Input
              value={formData.taxId}
              onChange={(e) => setFormData(prev => ({ ...prev, taxId: e.target.value }))}
              required
            />
          </FormField>
        </div>

        {/* Description de l'entreprise */}
        <FormField label="Description de l'entreprise">
          <Textarea
            value={formData.description || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Décrivez votre entreprise, ses activités principales et sa mission..."
            rows={4}
          />
        </FormField>

        {/* Coordonnées */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Adresse">
            <Input
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              icon={MapPin}
            />
          </FormField>

          <FormField label="Ville">
            <Input
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
            />
          </FormField>

          <FormField label="Pays">
            <Input
              value={formData.country}
              onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
            />
          </FormField>

          <FormField label="Téléphone">
            <Input
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              icon={Phone}
            />
          </FormField>

          <FormField label="Email">
            <Input
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              type="email"
              icon={Mail}
            />
          </FormField>

          <FormField label="Site web">
            <Input
              value={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
              icon={Globe}
            />
          </FormField>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            isLoading={loading}
          >
            {organization ? 'Enregistrer les modifications' : 'Créer l\'entreprise'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}