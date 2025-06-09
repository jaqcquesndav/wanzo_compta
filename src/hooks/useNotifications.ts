import { useState, useEffect } from 'react';
import { mockNotifications } from '../data/mockNotifications';
import type { Notification } from '../types/notifications';

const STORAGE_KEY = 'notifications-storage';

interface NotificationStore {
  notifications: Notification[];
}

export function useNotifications() {
  const [state, setState] = useState<NotificationStore>({ 
    notifications: mockNotifications // Initialisation avec les données d'exemple
  });

  // Charger les notifications au démarrage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setState(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  }, []);

  // Sauvegarder les notifications à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save notifications:', error);
    }
  }, [state]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    setState(prev => ({
      notifications: [
        {
          ...notification,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          read: false
        },
        ...prev.notifications
      ]
    }));
  };

  const markAsRead = (id: string) => {
    setState(prev => ({
      notifications: prev.notifications.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    }));
  };

  const deleteNotification = (id: string) => {
    setState(prev => ({
      notifications: prev.notifications.filter(notification => notification.id !== id)
    }));
  };

  const clearAll = () => {
    setState({ notifications: [] });
  };

  return {
    notifications: state.notifications,
    addNotification,
    markAsRead,
    deleteNotification,
    clearAll
  };
}