import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { FormField, Input, Select, Textarea } from '../ui/Form';
import { Button } from '../ui/Button';
import { Building2, MapPin, Phone, Mail, Globe, Briefcase, User, Users, FileText } from 'lucide-react';
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
    entrepreneurName: '',
    associates: '',
    legalForm: '',
    registrationNumber: '',
    taxId: '',
    cnssNumber: '',
    inppNumber: '',
    onemNumber: '',
    address: '',
    city: '',
    country: '',
    phone: '',
    entrepreneurPhone: '',
    email: '',
    entrepreneurEmail: '',
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

  const handleChangeInput = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={organization ? "Modifier l'entreprise" : "Nouvelle entreprise"}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="font-medium text-gray-700 border-b pb-2">Informations générales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Nom de l'entreprise" labelClassName="flex items-center">
            <span className="text-destructive ml-1">*</span>
            <Input
              value={formData.name || ''}
              onChange={(e) => handleChangeInput('name', e.target.value)}
              icon={Building2}
              required
            />
          </FormField>

          <FormField label="Forme juridique">
            <Select
              value={formData.legalForm || ''}
              onChange={(e) => handleChangeInput('legalForm', e.target.value)}
            >
              <option value="SARL">SARL</option>
              <option value="SA">SA</option>
              <option value="SAS">SAS</option>
              <option value="EI">Entreprise Individuelle</option>
              <option value="GIE">GIE</option>
            </Select>
          </FormField>

          <FormField label="Capital social">
            <div className="relative">
              <Input
                value={formData.capital || ''}
                onChange={(e) => handleChangeInput('capital', e.target.value)}
                type="number"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                {formData.currency}
              </span>
            </div>
          </FormField>

          <FormField label="Secteur d'activité">
            <Input
              value={formData.industry || ''}
              onChange={(e) => handleChangeInput('industry', e.target.value)}
              icon={Briefcase}
            />
          </FormField>
        </div>

        <h3 className="font-medium text-gray-700 border-b pb-2 mt-6">Direction de l'entreprise</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Nom de l'entrepreneur" labelClassName="flex items-center">
            <span className="text-destructive ml-1">*</span>
            <Input
              value={formData.entrepreneurName || ''}
              onChange={(e) => handleChangeInput('entrepreneurName', e.target.value)}
              icon={User}
              required
            />
          </FormField>
          
          <FormField label="Autres associés">
            <Input
              value={formData.associates || ''}
              onChange={(e) => handleChangeInput('associates', e.target.value)}
              icon={Users}
            />
          </FormField>
          
          <FormField label="Téléphone de l'entrepreneur">
            <Input
              value={formData.entrepreneurPhone || ''}
              onChange={(e) => handleChangeInput('entrepreneurPhone', e.target.value)}
              icon={Phone}
            />
          </FormField>
          
          <FormField label="Email de l'entrepreneur">
            <Input
              value={formData.entrepreneurEmail || ''}
              onChange={(e) => handleChangeInput('entrepreneurEmail', e.target.value)}
              type="email"
              icon={Mail}
            />
          </FormField>
        </div>

        <h3 className="font-medium text-gray-700 border-b pb-2 mt-6">Immatriculation et identification</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField label="RCCM" labelClassName="flex items-center">
            <span className="text-destructive ml-1">*</span>
            <Input
              value={formData.registrationNumber || ''}
              onChange={(e) => handleChangeInput('registrationNumber', e.target.value)}
              icon={FileText}
              required
              placeholder="ex: CD/GOM/RCCM/22-B-00008"
            />
          </FormField>

          <FormField label="Numéro d'impôt" labelClassName="flex items-center">
            <span className="text-destructive ml-1">*</span>
            <Input
              value={formData.taxId || ''}
              onChange={(e) => handleChangeInput('taxId', e.target.value)}
              required
            />
          </FormField>
          
          <FormField label="Numéro CNSS">
            <Input
              value={formData.cnssNumber || ''}
              onChange={(e) => handleChangeInput('cnssNumber', e.target.value)}
            />
          </FormField>
          
          <FormField label="Numéro INPP">
            <Input
              value={formData.inppNumber || ''}
              onChange={(e) => handleChangeInput('inppNumber', e.target.value)}
            />
          </FormField>
          
          <FormField label="Numéro ONEM">
            <Input
              value={formData.onemNumber || ''}
              onChange={(e) => handleChangeInput('onemNumber', e.target.value)}
            />
          </FormField>
        </div>

        {/* Description de l'entreprise */}
        <h3 className="font-medium text-gray-700 border-b pb-2 mt-6">Description</h3>
        <FormField label="Description de l'entreprise">
          <Textarea
            value={formData.description || ''}
            onChange={(e) => handleChangeInput('description', e.target.value)}
            placeholder="Décrivez votre entreprise, ses activités principales et sa mission..."
            rows={4}
          />
        </FormField>

        {/* Coordonnées */}
        <h3 className="font-medium text-gray-700 border-b pb-2 mt-6">Coordonnées de l'entreprise</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Adresse">
            <Input
              value={formData.address || ''}
              onChange={(e) => handleChangeInput('address', e.target.value)}
              icon={MapPin}
            />
          </FormField>

          <FormField label="Ville">
            <Input
              value={formData.city || ''}
              onChange={(e) => handleChangeInput('city', e.target.value)}
            />
          </FormField>

          <FormField label="Pays">
            <Input
              value={formData.country || ''}
              onChange={(e) => handleChangeInput('country', e.target.value)}
            />
          </FormField>

          <FormField label="Téléphone entreprise">
            <Input
              value={formData.phone || ''}
              onChange={(e) => handleChangeInput('phone', e.target.value)}
              icon={Phone}
            />
          </FormField>

          <FormField label="Email entreprise">
            <Input
              value={formData.email || ''}
              onChange={(e) => handleChangeInput('email', e.target.value)}
              type="email"
              icon={Mail}
            />
          </FormField>

          <FormField label="Site web">
            <Input
              value={formData.website || ''}
              onChange={(e) => handleChangeInput('website', e.target.value)}
              icon={Globe}
            />
          </FormField>
        </div>

        <div className="flex justify-end space-x-3">
          <Button 
            type="button" 
            variant="secondary"
            onClick={onClose}
          >
            Annuler
          </Button>
          <Button 
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {organization ? 'Enregistrer les modifications' : 'Créer l\'entreprise'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}