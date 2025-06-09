import type { Notification } from '../types/notifications';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Échéance TVA',
    message: 'La déclaration de TVA pour février 2024 doit être soumise avant le 15/03/2024.',
    timestamp: '2024-03-01T08:00:00.000Z',
    read: false
  },
  {
    id: '2',
    type: 'success',
    title: 'Rapprochement bancaire',
    message: 'Le rapprochement bancaire du compte BICIS a été validé avec succès.',
    timestamp: '2024-03-01T10:30:00.000Z',
    read: false
  },
  {
    id: '3',
    type: 'error',
    title: 'Erreur de validation',
    message: 'L\'écriture comptable #FAC2024-001 présente un déséquilibre de 1000 XOF.',
    timestamp: '2024-03-01T11:15:00.000Z',
    read: true
  },
  {
    id: '4',
    type: 'info',
    title: 'Nouvelle version',
    message: 'Une mise à jour du plan comptable SYSCOHADA est disponible.',
    timestamp: '2024-03-01T14:00:00.000Z',
    read: false,
    link: '/settings/accounting'
  },
  {
    id: '5',
    type: 'warning',
    title: 'Factures en retard',
    message: '3 factures clients dépassent l\'échéance de paiement de 30 jours.',
    timestamp: '2024-03-01T15:45:00.000Z',
    read: false,
    link: '/treasury'
  }
];

// Fonction utilitaire pour ajouter des notifications de test
export function addMockNotification(notifications: Notification[]): Notification {
  const types: Notification['type'][] = ['info', 'success', 'warning', 'error'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  const newNotification: Notification = {
    id: crypto.randomUUID(),
    type,
    title: `Notification de test ${type}`,
    message: `Ceci est un message de test pour une notification de type ${type}.`,
    timestamp: new Date().toISOString(),
    read: false
  };

  return newNotification;
}