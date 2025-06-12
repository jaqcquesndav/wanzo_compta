import { Table } from '../ui/Table';
import { Button } from '../ui/Button';
import { Edit2, UserX, UserCheck, Eye } from 'lucide-react';
import type { UserWithDetails } from '../../hooks/useUsers';

interface UserListProps {
  users: UserWithDetails[];
  onEdit: (user: UserWithDetails) => void;
  onToggleStatus: (user: UserWithDetails) => void;
  onViewSessions: (user: UserWithDetails) => void;
  loading?: boolean;
}

export function UserList({ users, onEdit, onToggleStatus, onViewSessions, loading }: UserListProps) {
  const columns = [
    {
      header: 'Utilisateur',
      accessor: (user: UserWithDetails) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Service',
      accessor: (user: UserWithDetails) => user.department
    },
    {
      header: 'Rôle',
      accessor: (user: UserWithDetails) => ({
        superadmin: 'Super Admin',
        admin: 'Administrateur',
        user: 'Utilisateur',
        auditor: 'Auditeur',
        comptable: 'Comptable',
        gérant: 'Gérant',
        portfoliomanager: 'Portfolio Manager'
      }[user.role] || 'Rôle inconnu') // Ajout d'une valeur par défaut
    },
    {
      header: 'Statut',
      accessor: (user: UserWithDetails) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          user.status === 'active' 
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {user.status === 'active' ? 'Actif' : 'Inactif'}
        </span>
      )
    },
    {
      header: 'Dernière connexion',
      accessor: (user: UserWithDetails) => (
        new Date(user.lastLogin).toLocaleString('fr-FR')
      )
    },
    {
      header: 'Actions',
      accessor: (user: UserWithDetails) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Edit2}
            onClick={() => onEdit(user)}
          >
            Modifier
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Eye}
            onClick={() => onViewSessions(user)}
          >
            Sessions
          </Button>
          <Button
            variant={user.status === 'active' ? 'warning' : 'success'}
            size="sm"
            icon={user.status === 'active' ? UserX : UserCheck}
            onClick={() => onToggleStatus(user)}
            disabled={user.role === 'superadmin'}
          >
            {user.status === 'active' ? 'Désactiver' : 'Activer'}
          </Button>
        </div>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      data={users}
      loading={loading}
      emptyMessage="Aucun utilisateur trouvé"
    />
  );
}