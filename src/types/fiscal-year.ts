export interface FiscalYear {
  id: string;
  startDate: string;
  endDate: string;
  status: 'open' | 'closed';
  code: string;
  auditStatus?: {
    isAudited: boolean;
    auditor: {
      name: string;
      registrationNumber: string;
    };
    auditedAt: string;
  };
}

export interface AuditorCredentials {
  name: string;
  registrationNumber: string;
  token?: string;
}

export interface AuditValidation {
  success: boolean;
  message: string;
  errors?: string[];
}