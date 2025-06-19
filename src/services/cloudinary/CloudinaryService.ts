// src/services/cloudinary/CloudinaryService.ts
import { CLOUDINARY_CONFIG } from './config';

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  original_filename: string;
  error?: {
    message: string;
  };
}

export class CloudinaryService {
  static async uploadFile(file: File, folder: string): Promise<string> {
    if (!CLOUDINARY_CONFIG.cloudName || !CLOUDINARY_CONFIG.uploadPreset) {
      throw new Error('Configuration Cloudinary manquante. Vérifiez vos variables d\'environnement.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
    formData.append('folder', folder);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `Erreur d'upload: ${response.status}`);
      }

      const data = await response.json() as CloudinaryResponse;
      
      if (data.error) {
        throw new Error(data.error.message || 'Erreur inconnue lors de l\'upload');
      }
      
      return data.secure_url;
    } catch (error) {
      console.error('Erreur lors de l\'upload vers Cloudinary:', error);
      throw error;
    }
  }
}
