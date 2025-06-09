// Configuration d'authentification
export const AUTH_CONFIG = {
  SUPER_ADMIN: {
    email: 'admin@kiota.com',
    password: 'Admin@123',
    id: '1',
    role: 'superadmin' as const,
    name: 'Super Administrateur'
  },
  DEMO_AUDITOR: {
    email: 'auditor@kiota.com',
    password: 'Audit@123',
    id: '2',
    role: 'auditor' as const,
    name: 'John Doe',
    registrationNumber: 'AUD-2024-001',
    defaultToken: '123456'
  }
} as const;