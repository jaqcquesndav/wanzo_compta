import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth/authService';

export function AuthCallbackPage() {
  const { user, getAccessTokenSilently, isAuthenticated, isLoading, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const processAuthentication = async () => {
      if (isLoading) {
        return;
      }

      if (error) {
        console.error('Error during authentication:', error);
        navigate('/login', { replace: true });
        return;
      }

      if (isAuthenticated && user) {
        try {
          const accessTokenResponse = await getAccessTokenSilently({
            detailedResponse: true,
          });

          await authService.refreshTokenFromAuth0(
            user,
            accessTokenResponse.access_token,
            accessTokenResponse.id_token,
            undefined, // refresh_token is handled by the SDK
            accessTokenResponse.expires_in
          );

          navigate('/', { replace: true });
        } catch (tokenError) {
          console.error('Failed to process tokens with backend:', tokenError);
          navigate('/login', { replace: true });
        }
      }
    };

    processAuthentication();
  }, [isLoading, isAuthenticated, user, error, getAccessTokenSilently, navigate]);

  return <div>Loading session...</div>;
}
