import { useAuth } from './useAuth';

export function useAccountAccess() {
  const { user } = useAuth();

  const canEditAccounts = user?.role === 'superadmin' || user?.role === 'admin';
  const canViewBalance = true; // Tout le monde peut voir la balance

  return {
    canEditAccounts,
    canViewBalance
  };
}