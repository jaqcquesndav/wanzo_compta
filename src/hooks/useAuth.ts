import { useState, useEffect } from 'react';
import { User } from '../types/auth';
import { authApi } from '../services/api/endpoints/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await authApi.verifyToken();
          if (response.success && response.data) {
            setUser(response.data.user);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Failed to verify token', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const loginWithSso = async () => {
    try {
      const response = await authApi.loginWithSSO();
      if (response.success && response.data) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('SSO login failed', error);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return { user, loading, isAuthenticated, loginWithSso, logout };
}
