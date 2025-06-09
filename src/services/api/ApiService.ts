import { API_CONFIG } from './config';
import type { ApiResponse } from './types';

export class ApiService {
  private static token: string | null = null;
  private static baseUrl = API_CONFIG.baseUrl;

  static setToken(token: string): void {
    console.log('Setting API token');
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  static getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
      console.log('Retrieved token from storage:', this.token ? 'Present' : 'Missing');
    }
    return this.token;
  }

  private static async redirectToMainApp(message?: string) {
    if (message) {
      console.error(message);
    }
    console.log('Preparing to redirect to main app...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Redirecting to:', import.meta.env.VITE_MAIN_APP_URL);
    window.location.href = import.meta.env.VITE_MAIN_APP_URL;
  }

  private static getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    const token = this.getToken();
    if (token) {
      console.log('Adding token to request headers');
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private static async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    console.log('API Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (response.status === 401) {
      console.error('Unauthorized response received');
      this.token = null;
      localStorage.removeItem('auth_token');
      await this.redirectToMainApp('Unauthorized: Session expired');
      return { success: false, error: 'Session expirée' };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('API Error:', errorData);
      return {
        success: false,
        error: errorData?.message || `HTTP error! status: ${response.status}`
      };
    }

    try {
      const data = await response.json();
      console.log('API Success:', { endpoint: response.url, data });
      return { success: true, data };
    } catch (error) {
      console.error('Failed to parse response:', error);
      return {
        success: false,
        error: 'Failed to parse response data'
      };
    }
  }

  static async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    try {
      // Simuler une réponse pour les tokens de démo
      const token = this.getToken();
      if (token && token.startsWith('demo_token_') && endpoint === '/auth/verify') {
        console.log('Demo token detected, returning mock verification response');
        const demoRole = token.replace('demo_token_', '') as string;
        const demoEmail = demoRole === 'admin' 
          ? 'admin@demo.com' 
          : demoRole === 'comptable' 
            ? 'comptable@demo.com' 
            : 'manager@demo.com';
        
        // Simuler une réponse de l'API
        return {
          success: true,
          data: {
            user: {
              id: 'demo-' + crypto.randomUUID(),
              email: demoEmail,
              name: demoRole === 'portfoliomanager' ? 'Manager' : demoRole.charAt(0).toUpperCase() + demoRole.slice(1),
              role: demoRole as any
            }
          } as any
        };
      }

      const url = new URL(`${this.baseUrl}${endpoint}`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, String(value));
        });
      }

      console.log('GET Request:', { url: url.toString(), params });
      const response = await fetch(url.toString(), {
        headers: this.getHeaders()
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('GET Request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      };
    }
  }

  static async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      console.log('POST Request:', { endpoint, data });
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('POST Request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      };
    }
  }

  static async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      console.log('PUT Request:', { endpoint, data });
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('PUT Request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      };
    }
  }

  static async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      console.log('DELETE Request:', { endpoint });
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('DELETE Request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      };
    }
  }
}