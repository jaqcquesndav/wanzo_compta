import React, { useState } from 'react';
import { Menu, User, MessageSquare, Calculator } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { UserMenu } from '../ui/UserMenu';
import { ChatWindow } from '../chat/ChatWindow';
import { NotificationCenter } from '../notifications/NotificationCenter';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useCalculatorStore } from '../../hooks/useCalculatorStore';
import { HeaderActions } from './HeaderActions';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const toggleCalculator = useCalculatorStore(state => state.toggle);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 dark:bg-dark-secondary dark:border-dark-DEFAULT">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="text-gray-500 hover:text-gray-900 focus:outline-none lg:hidden dark:text-gray-400 dark:hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-primary hidden md:block dark:text-primary">
              Kiota Suit Comptabilité
            </span>
          </div>
        </div>

        <HeaderActions
          onToggleCalculator={toggleCalculator}
          onToggleChat={() => setShowChat(!showChat)}
          onToggleUserMenu={() => setShowUserMenu(!showUserMenu)}
          user={user}
          showUserMenu={showUserMenu}
          onCloseUserMenu={() => setShowUserMenu(false)}
        />
      </div>

      {showChat && <ChatWindow onClose={() => setShowChat(false)} />}
    </header>
  );
}