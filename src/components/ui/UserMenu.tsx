import { useEffect, useRef } from 'react';
import { Settings, LogOut } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth/authService';

interface UserMenuProps {
  onClose: () => void;
}

export function UserMenu({ onClose }: UserMenuProps) {
  const { logout } = useAuth0();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error invalidating backend session', error);
    }
    logout({ logoutParams: { returnTo: import.meta.env.VITE_AUTH0_LOGOUT_URI } });
  };

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-48 bg-secondary rounded-md shadow-lg py-1 border border-primary"
    >
      <button
        onClick={() => navigate('/settings')}
        className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-tertiary"
      >
        <Settings className="h-4 w-4 mr-2" />
        Paramètres
      </button>
      <button
        onClick={handleLogout}
        className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-destructive hover:text-on-primary"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Déconnexion
      </button>
    </div>
  );
}