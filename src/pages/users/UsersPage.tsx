import React, { useState } from 'react';
import { Users, Plus } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { UserList } from '../../components/users/UserList';
import { UserForm } from '../../components/users/UserForm';
import { UserSessions } from '../../components/users/UserSessions';
import { UserStatusModal } from '../../components/users/UserStatusModal';
import { Modal } from '../../components/ui/Modal';
import { useUsers, type UserWithDetails } from '../../hooks/useUsers';

export function UsersPage() {
  const { users, loading, addUser, updateUser, toggleUserStatus } = useUsers();
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithDetails | null>(null);
  const [showSessions, setShowSessions] = useState(false);
  const [userToToggle, setUserToToggle] = useState<UserWithDetails | null>(null);

  const handleEditUser = (user: UserWithDetails) => {
    setSelectedUser(user);
  };

  const handleViewSessions = (user: UserWithDetails) => {
    setSelectedUser(user);
    setShowSessions(true);
  };

  const handleToggleStatus = async (user: UserWithDetails) => {
    setUserToToggle(user);
  };

  const handleConfirmToggleStatus = async () => {
    if (userToToggle) {
      await toggleUserStatus(userToToggle.id);
      setUserToToggle(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Utilisateurs</h1>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setShowNewUserModal(true)}
        >
          Nouvel Utilisateur
        </Button>
      </div>

      <Card title="Liste des utilisateurs" icon={Users}>
        <UserList
          users={users}
          onEdit={handleEditUser}
          onToggleStatus={handleToggleStatus}
          onViewSessions={handleViewSessions}
          loading={loading}
        />
      </Card>

      <Modal
        isOpen={showNewUserModal}
        onClose={() => setShowNewUserModal(false)}
        title="Nouvel Utilisateur"
      >
        <UserForm
          onSubmit={async (data) => {
            await addUser(data);
            setShowNewUserModal(false);
          }}
          onCancel={() => setShowNewUserModal(false)}
        />
      </Modal>

      {selectedUser && (
        <Modal
          isOpen={!!selectedUser && !showSessions}
          onClose={() => setSelectedUser(null)}
          title="Modifier l'utilisateur"
        >
          <UserForm
            user={selectedUser}
            onSubmit={async (data) => {
              await updateUser(selectedUser.id, data);
              setSelectedUser(null);
            }}
            onCancel={() => setSelectedUser(null)}
          />
        </Modal>
      )}

      {selectedUser && (
        <Modal
          isOpen={showSessions}
          onClose={() => {
            setShowSessions(false);
            setSelectedUser(null);
          }}
          title={`Sessions - ${selectedUser.name}`}
        >
          <UserSessions userId={selectedUser.id} />
        </Modal>
      )}

      {userToToggle && (
        <UserStatusModal
          isOpen={!!userToToggle}
          onClose={() => setUserToToggle(null)}
          onConfirm={handleConfirmToggleStatus}
          user={userToToggle}
        />
      )}
    </div>
  );
}