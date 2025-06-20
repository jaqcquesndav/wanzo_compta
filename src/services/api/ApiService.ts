import { API_CONFIG } from './config';
import type { ApiResponse } from './types';

// Cette fonction est un placeholder. Dans une vraie application,
// vous auriez un moyen de passer le token depuis votre contexte d'authentification.
// Pour l'instant, nous laissons cette structure, mais elle devra être adaptée.
let getAccessToken: () => Promise<string | null> = async () => null;

export const setAuthTokenProvider = (provider: () => Promise<string | null>) => {
  getAccessToken = provider;
};

export class ApiService {
  private static baseUrl = 'http://localhost:8000/accounting';

  private static async getHeaders(): Promise<HeadersInit> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'X-Accounting-Client': 'Wanzo-Accounting-UI/1.0.0'
    };

    const token = await getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private static async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (response.status === 401) {
      // La redirection sera gérée par le ProtectedRoute ou un composant similaire
      return { success: false, error: 'Session expirée ou non autorisée' };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        success: false,
        error: errorData?.message || `HTTP error! status: ${response.status}`
      };
    }

    try {
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      // Gère le cas où la réponse est OK mais n'a pas de corps JSON (ex: 204 No Content)
      if (response.status === 204) {
        return { success: true, data: null as any };
      }
      return {
        success: false,
        error: 'Failed to parse response data'
      };
    }
  }

  static async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    try {
      const url = new URL(`${this.baseUrl}${endpoint}`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, String(value));
        });
      }

      const response = await fetch(url.toString(), {
        headers: await this.getHeaders()
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      };
    }
  }

  static async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: await this.getHeaders(),
        body: JSON.stringify(data)
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      };
    }
  }

  static async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: await this.getHeaders(),
        body: JSON.stringify(data)
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      };
    }
  }

  static async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: await this.getHeaders()
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      };
    }
  }
}