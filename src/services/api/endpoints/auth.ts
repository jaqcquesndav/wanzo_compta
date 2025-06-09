import { ApiService } from '../ApiService';
import type { User } from '../../../types/auth';
import type { ApiResponse } from '../types';

export const authApi = {
  // Vérification du token
  verifyToken: () => 
    ApiService.get<{ user: User }>('/auth/verify'),

  // Déconnexion
  logout: () => 
    ApiService.post<void>('/auth/logout', {}),
    
  // Connexion avec KS Auth (SSO)
  loginWithSSO: (): Promise<ApiResponse<{ user: User, token: string }>> => 
    ApiService.post<{ user: User, token: string }>('/auth/sso', {})
};