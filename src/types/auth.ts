export type UserRole = 'superadmin' | 'admin' | 'user' | 'auditor' | 'comptable' | 'gérant' | 'portfoliomanager';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  registrationNumber?: string; // Pour les auditeurs
}