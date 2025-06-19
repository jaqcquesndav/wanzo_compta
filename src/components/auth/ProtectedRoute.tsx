import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Layout } from '../Layout';
import { useEffect } from 'react';
import { setAuthTokenProvider } from '../../services/api/ApiService';

export function ProtectedRoute() {
  const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    setAuthTokenProvider(async () => {
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          return token;
        }
        return null;
      } catch (error) {
        console.error('Error getting access token', error);
        return null;
      }
    });
  }, [getAccessTokenSilently, isAuthenticated]);

  if (isLoading) {
    return <div>Chargement...</div>; // Ou un composant de chargement plus sophistiqué
  }

  if (!isAuthenticated) {
    // Redirige vers la page de connexion Auth0 si l'utilisateur n'est pas authentifié
    loginWithRedirect();
    return null; // La redirection est en cours
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}