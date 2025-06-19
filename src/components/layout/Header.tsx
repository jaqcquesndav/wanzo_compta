import { useState } from 'react';
import { Menu } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { ChatWindow } from '../chat/ChatWindow';
import { useCalculatorStore } from '../../hooks/useCalculatorStore';
import { HeaderActions } from './HeaderActions';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { user } = useAuth0();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const toggleCalculator = useCalculatorStore(state => state.toggle);
  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-30">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="text-muted-foreground hover:text-foreground focus:outline-none lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-primary hidden md:block">
              Wanzo Comptabilité
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