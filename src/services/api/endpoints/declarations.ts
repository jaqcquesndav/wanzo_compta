import { ApiService } from '../ApiService';
import type { Declaration } from '../../../types/declarations';
import type { PaginatedResponse } from '../types';

export const declarationsApi = {
  getAll: (params?: { page?: number; pageSize?: number }) => 
    ApiService.get<PaginatedResponse<Declaration>>('/declarations'),

  getById: (id: string) => 
    ApiService.get<Declaration>(`/declarations/${id}`),

  create: (declaration: Partial<Declaration>) => 
    ApiService.post<Declaration>('/declarations', declaration),

  update: (id: string, declaration: Partial<Declaration>) => 
    ApiService.put<Declaration>(`/declarations/${id}`, declaration),

  submit: (id: string) => 
    ApiService.post<Declaration>(`/declarations/${id}/submit`, {}),

  download: (id: string, format: 'pdf' | 'excel') => 
    ApiService.get<Blob>(`/declarations/${id}/download?format=${format}`)
};