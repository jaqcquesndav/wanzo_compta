import { ApiService } from '../ApiService';
import type { FiscalYear, AuditorCredentials, AuditValidation } from '../../../types/fiscal-year';

export const fiscalYearsApi = {
  getAll: () => 
    ApiService.get<FiscalYear[]>('/fiscal-years'),

  getById: (id: string) => 
    ApiService.get<FiscalYear>(`/fiscal-years/${id}`),

  create: (data: Partial<FiscalYear>) => 
    ApiService.post<FiscalYear>('/fiscal-years', data),

  close: (id: string) => 
    ApiService.post<FiscalYear>(`/fiscal-years/${id}/close`, {}),

  reopen: (id: string) => 
    ApiService.post<FiscalYear>(`/fiscal-years/${id}/reopen`, {}),

  audit: (id: string, credentials: AuditorCredentials) => 
    ApiService.post<AuditValidation>(`/fiscal-years/${id}/audit`, credentials),

  import: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return ApiService.post<{ imported: number }>('/fiscal-years/import', formData);
  }
};