import React, { useState, useEffect } from 'react';
import { Table } from '../ui/Table';
import { Button } from '../ui/Button';
import { LogOut } from 'lucide-react';

interface Session {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  startedAt: string;
  lastActivity: string;
}

interface UserSessionsProps {
  userId: string;
}

export function UserSessions({ userId }: UserSessionsProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des sessions
    const mockSessions: Session[] = [
      {
        id: '1',
        device: 'Windows 10',
        browser: 'Chrome 122',
        ip: '192.168.1.1',
        location: 'Dakar, Sénégal',
        startedAt: new Date().toISOString(),
        lastActivity: new Date().toISOString()
      },
      {
        id: '2',
        device: 'iPhone 13',
        browser: 'Safari Mobile',
        ip: '192.168.1.2',
        location: 'Dakar, Sénégal',
        startedAt: new Date(Date.now() - 86400000).toISOString(),
        lastActivity: new Date(Date.now() - 3600000).toISOString()
      }
    ];

    setSessions(mockSessions);
    setLoading(false);
  }, [userId]);

  const handleTerminate = async (sessionId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir terminer cette session ?')) {
      // Simuler la terminaison de la session
      setSessions(prev => prev.filter(s => s.id !== sessionId));
    }
  };

  const columns = [
    {
      header: 'Appareil',
      accessor: 'device'
    },
    {
      header: 'Navigateur',
      accessor: 'browser'
    },
    {
      header: 'IP',
      accessor: 'ip'
    },
    {
      header: 'Localisation',
      accessor: 'location'
    },
    {
      header: 'Début de session',
      accessor: (session: Session) => new Date(session.startedAt).toLocaleString('fr-FR')
    },
    {
      header: 'Dernière activité',
      accessor: (session: Session) => new Date(session.lastActivity).toLocaleString('fr-FR')
    },
    {
      header: 'Actions',
      accessor: (session: Session) => (
        <Button
          variant="warning"
          size="sm"
          icon={LogOut}
          onClick={() => handleTerminate(session.id)}
        >
          Terminer
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-700">
          Liste des sessions actives de l'utilisateur. Vous pouvez terminer une session pour forcer la déconnexion.
        </p>
      </div>

      <Table
        columns={columns}
        data={sessions}
        loading={loading}
        emptyMessage="Aucune session active"
      />
    </div>
  );
}