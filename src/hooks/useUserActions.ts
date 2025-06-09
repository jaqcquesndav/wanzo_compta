import { useState } from 'react';
import type { User } from '../types/auth';

export function useUserActions() {
  const [loading, setLoading] = useState(false);

  const updateUser = async (userId: string, data: Partial<User>) => {
    setLoading(true);
    try {
      // Simuler la mise à jour
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId: string, active: boolean) => {
    setLoading(true);
    try {
      // Simuler le changement de statut
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    updateUser,
    toggleUserStatus
  };
}