import { User } from '@auth0/auth0-react';
import { ApiService } from '../api/ApiService';

const AUTH_API_URL = `${import.meta.env.VITE_API_GATEWAY_URL}/admin/auth`;

class AuthService {
  async refreshTokenFromAuth0(
    user: User,
    accessToken: string,
    idToken: string,
    refreshToken: string | undefined,
    expiresIn: number
  ) {
    try {
      const response = await ApiService.post(`${AUTH_API_URL}/refresh-token`, {
        user,
        access_token: accessToken,
        id_token: idToken,
        refresh_token: refreshToken,
        expires_in: expiresIn,
      });
      return response;
    } catch (error) {
      console.error('Error refreshing token with backend', error);
      throw error;
    }
  }

  async validateTokenWithBackend(token: string) {
    try {
      const response = await fetch(`${AUTH_API_URL}/validate-token`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) return { isValid: false };

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error validating token with backend', error);
      return { isValid: false };
    }
  }

  async logout() {
    try {
      await ApiService.post(`${AUTH_API_URL}/invalidate-session`, {});
    } catch (error) {
      console.error('Error invalidating backend session', error);
      // We still proceed with Auth0 logout even if backend fails
    }
  }
}

export const authService = new AuthService();
