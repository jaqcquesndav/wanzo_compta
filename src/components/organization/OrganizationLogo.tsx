import React, { useState, useRef, useEffect } from 'react';
import { Building2, Upload, X, Check, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface OrganizationLogoProps {
  logo?: string;
  onUpload: (file: File) => Promise<void>;
  onRemove?: () => Promise<void>;
}

export function OrganizationLogo({ logo, onUpload, onRemove }: OrganizationLogoProps) {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Réinitialiser les états de succès et d'erreur après un délai
  useEffect(() => {
    let timer: number;
    if (uploadSuccess || error) {
      timer = window.setTimeout(() => {
        setUploadSuccess(false);
        setError(null);
      }, 5000);
    }
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [uploadSuccess, error]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Réinitialiser les états
    setError(null);
    setUploadSuccess(false);

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner une image (PNG, JPG, GIF)');
      return;
    }

    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('La taille du fichier ne doit pas dépasser 5MB');
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
      setUploadSuccess(true);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      setError('Échec du téléchargement. Veuillez réessayer.');
      setPreviewUrl(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!onRemove) return;
    
    setLoading(true);
    setError(null);
    setUploadSuccess(false);
    
    try {
      await onRemove();
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setUploadSuccess(true);
    } catch (error) {
      setError('Échec de la suppression. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Zone de prévisualisation du logo */}
      <div className="relative">
        {(logo || previewUrl) ? (
          <div className="relative group">
            <img
              src={previewUrl || logo}
              alt="Logo de l'entreprise"
              className="h-32 w-32 rounded-lg object-contain bg-white shadow-sm"
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
          <div 
            className="h-32 w-32 rounded-lg bg-gray-100 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Building2 className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-xs text-gray-500 text-center">Cliquez pour ajouter un logo</p>
          </div>
        )}
      </div>

      {/* Messages d'état */}
      {error && (
        <div className="text-sm text-red-600 flex items-center space-x-1">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
      
      {uploadSuccess && (
        <div className="text-sm text-green-600 flex items-center space-x-1">
          <Check className="h-4 w-4" />
          <span>{logo ? 'Logo mis à jour avec succès' : 'Logo supprimé avec succès'}</span>
        </div>
      )}

      {/* Contrôles d'upload */}
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
        <div className="flex space-x-2">
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
            {logo && onRemove && (
            <Button
              type="button"
              variant="secondary"
              icon={X}
              isLoading={loading}
              onClick={handleRemove}
              className="text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border-red-200"
            >
              Supprimer
            </Button>
          )}
        </div>

        <div className="text-sm text-gray-500 text-center space-y-1 mt-2">
          <p>Formats acceptés : PNG, JPG, GIF</p>
          <p>Taille maximale : 5MB</p>
          <p>Dimensions recommandées : 200x200px</p>
        </div>
      </div>
    </div>
  );
}