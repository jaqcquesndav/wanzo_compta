import { useState, useEffect } from 'react';
import type { User } from '../types/auth';

export interface UserWithDetails extends User {
  department: string;
  lastLogin: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

export function useUsers() {
  const [users, setUsers] = useState<UserWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des utilisateurs
    const mockUsers: UserWithDetails[] = [
      {
        id: '1',
        email: 'admin@kiota.com',
        name: 'Super Administrateur',
        role: 'superadmin',
        department: 'Direction',
        lastLogin: '2024-03-01T15:30:00Z',
        status: 'active',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: '2',
        email: 'comptable@kiota.com',
        name: 'Jean Dupont',
        role: 'user',
        department: 'Comptabilité',
        lastLogin: '2024-03-01T14:45:00Z',
        status: 'active',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    ];

    setUsers(mockUsers);
    setLoading(false);
  }, []);

  const addUser = async (userData: Partial<UserWithDetails>) => {
    // Simuler l'ajout d'un utilisateur
    const newUser: UserWithDetails = {
      id: crypto.randomUUID(),
      email: userData.email!,
      name: userData.name!,
      role: userData.role || 'user',
      department: userData.department!,
      lastLogin: new Date().toISOString(),
      status: 'active',
      avatar: userData.avatar
    };

    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const updateUser = async (id: string, userData: Partial<UserWithDetails>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...userData } : user
    ));
  };

  const toggleUserStatus = async (id: string) => {
    setUsers(prev => prev.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  return {
    users,
    loading,
    addUser,
    updateUser,
    toggleUserStatus
  };
}