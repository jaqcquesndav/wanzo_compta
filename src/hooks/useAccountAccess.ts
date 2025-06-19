import { useAuth0 } from '@auth0/auth0-react';

export function useAccountAccess() {
  const { user } = useAuth0();
  const roles = user?.[`${import.meta.env.VITE_AUTH0_AUDIENCE}/roles`] as string[] | undefined;

  const canEditAccounts = roles?.includes('superadmin') || roles?.includes('admin');
  const canViewBalance = true; // Tout le monde peut voir la balance

  return {
    canEditAccounts,
    canViewBalance
  };
}