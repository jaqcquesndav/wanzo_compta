import React, { useState, useRef } from 'react';
import { Building2, Upload, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface OrganizationLogoProps {
  logo?: string;
  onUpload: (file: File) => Promise<void>;
  onRemove?: () => Promise<void>;
}

export function OrganizationLogo({ logo, onUpload, onRemove }: OrganizationLogoProps) {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image');
      return;
    }

    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La taille du fichier ne doit pas dépasser 5MB');
      return;
    }

    // Créer une prévisualisation
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    setLoading(true);
    try {
      await onUpload(file);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      setPreviewUrl(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!onRemove) return;
    
    setLoading(true);
    try {
      await onRemove();
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        {(logo || previewUrl) ? (
          <div className="relative group">
            <img
              src={previewUrl || logo}
              alt="Logo de l'entreprise"
              className="h-32 w-32 rounded-lg object-contain bg-white"
            />
            {onRemove && (
              <button
                onClick={handleRemove}
                className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Supprimer le logo"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ) : (
          <div className="h-32 w-32 rounded-lg bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
            <Building2 className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <input
          ref={fileInputRef}
          type="file"
          id="logo-upload"
          className="hidden"
          accept="image/png,image/jpeg,image/gif"
          onChange={handleFileChange}
          disabled={loading}
        />
        <label htmlFor="logo-upload">
          <Button
            type="button"
            variant="secondary"
            icon={Upload}
            isLoading={loading}
            className="cursor-pointer"
          >
            {logo ? 'Modifier le logo' : 'Ajouter un logo'}
          </Button>
        </label>

        <div className="text-sm text-gray-500 text-center space-y-1">
          <p>Formats acceptés : PNG, JPG, GIF</p>
          <p>Taille maximale : 5MB</p>
          <p>Dimensions recommandées : 200x200px</p>
        </div>
      </div>
    </div>
  );
}