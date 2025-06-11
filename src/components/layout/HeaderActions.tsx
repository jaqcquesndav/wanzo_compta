import { User, MessageSquare, Calculator } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { NotificationCenter } from '../notifications/NotificationCenter';
import { UserMenu } from '../ui/UserMenu';
import { CurrencyIndicator } from '../ui/CurrencyIndicator';
import type { User as UserType } from '../../types/auth';

interface HeaderActionsProps {
  onToggleCalculator: () => void;
  onToggleChat: () => void;
  onToggleUserMenu: () => void;
  user: UserType | null;
  showUserMenu: boolean;
  onCloseUserMenu: () => void;
}

export function HeaderActions({
  onToggleCalculator,
  onToggleChat,
  onToggleUserMenu,
  user,
  showUserMenu,
  onCloseUserMenu
}: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-4">
      <CurrencyIndicator className="hidden md:flex" />
      
      <ThemeToggle />
      
      <button 
        onClick={onToggleCalculator}
        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        <Calculator className="h-5 w-5" />
      </button>
      
      <button 
        onClick={onToggleChat}
        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        <MessageSquare className="h-5 w-5" />
      </button>

      <NotificationCenter />

      <div className="relative">
        <button 
          onClick={onToggleUserMenu}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
            <User className="h-5 w-5" />
          </div>
          <span className="hidden md:block">{user?.name}</span>
        </button>

        {showUserMenu && <UserMenu onClose={onCloseUserMenu} />}
      </div>
    </div>
  );
}