import React, { useState, useRef } from 'react';
import { FormField, Input, Select } from '../ui/Form';
import { Button } from '../ui/Button';
import { Mail, Building, Shield, Lock, Eye, EyeOff, Upload, X } from 'lucide-react';
import type { UserWithDetails } from '../../hooks/useUsers';

interface UserFormProps {
  user?: UserWithDetails;
  onSubmit: (data: Partial<UserWithDetails>) => Promise<void>;
  onCancel: () => void;
}

export function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(user?.avatar || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
    role: user?.role || 'user',
    password: '',
    confirmPassword: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type et la taille
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('La taille de l\'image ne doit pas dépasser 5MB');
      return;
    }

    // Créer une prévisualisation
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation du mot de passe pour les nouveaux utilisateurs
    if (!user) {
      if (!formData.password) {
        alert('Le mot de passe est requis');
        return;
      }
      if (formData.password.length < 8) {
        alert('Le mot de passe doit contenir au moins 8 caractères');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return;
      }
    }

    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        avatar,
        // N'inclure le mot de passe que s'il est défini
        ...(formData.password ? { password: formData.password } : {})
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Photo de profil */}
      <div className="flex justify-center">
        <div className="relative">
          {avatar ? (
            <div className="relative w-24 h-24">
              <img
                src={avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
              <button
                type="button"
                onClick={() => setAvatar(null)}
                className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
              <Upload className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 text-sm text-primary hover:text-primary-hover block w-full text-center"
          >
            {avatar ? 'Changer la photo' : 'Ajouter une photo'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Nom complet" required>
          <Input
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Jean Dupont"
          />
        </FormField>

        <FormField label="Email" required>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="jean.dupont@entreprise.com"
            icon={Mail}
            disabled={!!user}
          />
        </FormField>
      </div>

      {/* Mot de passe (uniquement pour les nouveaux utilisateurs) */}
      {!user && (
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Mot de passe" required>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                icon={Lock}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </FormField>

          <FormField label="Confirmer le mot de passe" required>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                icon={Lock}
                required
              />
            </div>
          </FormField>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Service" required>
          <Select
            value={formData.department}
            onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
            options={[
              { value: 'accounting', label: 'Comptabilité' },
              { value: 'finance', label: 'Finance' },
              { value: 'management', label: 'Direction' }
            ]}
            icon={Building}
          />
        </FormField>

        <FormField label="Rôle" required>
          <Select
            value={formData.role}
            onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as UserWithDetails['role'] }))}
            options={[
              { value: 'admin', label: 'Administrateur' },
              { value: 'user', label: 'Utilisateur' }
            ]}
            icon={Shield}
            disabled={user?.role === 'super_admin'}
          />
        </FormField>
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          isLoading={loading}
        >
          {user ? 'Enregistrer' : 'Créer l\'utilisateur'}
        </Button>
      </div>
    </form>
  );
}