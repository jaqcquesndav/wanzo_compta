import { ApiService } from '../ApiService';
import type { AuditorCredentials, AuditValidation } from '../../../types/fiscal-year';

export const auditApi = {
  requestToken: (credentials: Pick<AuditorCredentials, 'name' | 'registrationNumber'>) =>
    ApiService.post<{ success: boolean; message: string }>('/audit/request-token', credentials),

  validateToken: (token: string) =>
    ApiService.post<{ valid: boolean; message: string }>('/audit/validate-token', { token }),

  getAuditHistory: (fiscalYearId: string) =>
    ApiService.get<{
      audits: Array<{
        id: string;
        date: string;
        auditor: {
          name: string;
          registrationNumber: string;
        };
        status: 'pending' | 'approved' | 'rejected';
        comments?: string;
      }>;
    }>(`/audit/history/${fiscalYearId}`)
};