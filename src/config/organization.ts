import type { UserRole } from '../types/auth';

export const AVAILABLE_ROLES: { value: UserRole; label: string }[] = [
  { value: 'superadmin', label: 'Super Administrateur' },
  { value: 'admin', label: 'Administrateur' },
  { value: 'user', label: 'Utilisateur' },
  { value: 'auditor', label: 'Auditeur' },
  { value: 'comptable', label: 'Comptable' },
  { value: 'gérant', label: 'Gérant' },
  { value: 'portfoliomanager', label: 'Portfolio Manager' },
];

export const AVAILABLE_DEPARTMENTS: { value: string; label: string }[] = [
  { value: 'accounting', label: 'Comptabilité' },
  { value: 'finance', label: 'Finance' },
  { value: 'management', label: 'Direction' },
  { value: 'it', label: 'Informatique' },
  { value: 'hr', label: 'Ressources Humaines' },
];
