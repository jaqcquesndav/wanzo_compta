import { useState, useEffect } from 'react';
import { authApi } from '../services/api/endpoints/auth';
import type { User } from '../types/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const redirectToMainApp = async (message?: string) => {
    if (message) {
      console.error(message);
    }
    console.log('Preparing to redirect to main app...');
    // Wait 2 seconds to ensure logs are visible
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Redirecting to:', import.meta.env.VITE_MAIN_APP_URL);
    window.location.href = import.meta.env.VITE_MAIN_APP_URL;
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      console.log('Checking auth token:', token ? 'Present' : 'Missing');
      
      if (!token) {
        setLoading(false);
        return;
      }

      // Vérifier si c'est un token de démo
      if (token.startsWith('demo_token_')) {
        console.log('Demo token detected, skipping API verification');
        const demoRole = token.replace('demo_token_', '') as 'admin' | 'comptable' | 'portfoliomanager';
        const demoEmail = demoRole === 'admin' 
          ? 'admin@demo.com' 
          : demoRole === 'comptable' 
            ? 'comptable@demo.com' 
            : 'manager@demo.com';
        
        const user: User = {
          id: crypto.randomUUID(),
          email: demoEmail,
          name: demoRole === 'portfoliomanager' ? 'Manager' : demoRole.charAt(0).toUpperCase() + demoRole.slice(1),
          role: demoRole
        };
        
        console.log('Setting demo user data:', user);
        setUser(user);
        setLoading(false);
        return;
      }

      console.log('Verifying token with API...');
      const response = await authApi.verifyToken();
      console.log('Token verification response:', response);

      if (response.success && response.data) {
        // Create a default user if no role is present
        const userData = response.data.user || {};
        const user: User = {
          id: userData.id || crypto.randomUUID(),
          email: userData.email || 'user@example.com',
          name: userData.name || 'User',
          role: userData.role || 'user' // Default role if none provided
        };
        
        console.log('Setting user data:', user);
        setUser(user);
      } else {
        localStorage.removeItem('auth_token');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('auth_token');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out...');
      await authApi.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      console.log('Clearing token and preparing redirect...');
      localStorage.removeItem('auth_token');
      await redirectToMainApp();
    }
  };

  const login = (email: string, password: string): boolean => {
    try {
      console.log('Logging in with:', email);
      // Simulation d'authentification locale
      // En production, cela devrait appeler l'API
      if (
        (email === 'admin@demo.com' && password === 'Demo@123') ||
        (email === 'comptable@demo.com' && password === 'Demo@123') ||
        (email === 'manager@demo.com' && password === 'Demo@123')
      ) {
        const userRole = email.includes('admin') 
          ? 'admin' 
          : email.includes('comptable') 
            ? 'comptable' 
            : 'portfoliomanager';
        
        const user: User = {
          id: crypto.randomUUID(),
          email: email,
          name: userRole === 'portfoliomanager' ? 'Manager' : userRole.charAt(0).toUpperCase() + userRole.slice(1),
          role: userRole
        };
        
        localStorage.setItem('auth_token', 'demo_token_' + userRole);
        setUser(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const loginWithKSAuth = async (): Promise<void> => {
    try {
      console.log('Logging in with KS Auth...');
      // Simulation d'authentification avec KS Auth
      // En production, cela devrait rediriger vers le service d'authentification
      const response = await authApi.loginWithSSO();
      
      if (response.success && response.data) {
        localStorage.setItem('auth_token', response.data.token);
        setUser(response.data.user);
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('KS Auth failed:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    logout,
    login,
    loginWithKSAuth
  };
}