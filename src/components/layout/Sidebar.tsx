import { NavLink } from 'react-router-dom';
import { HelpCircle, X } from 'lucide-react';
import { navigation, secondaryNavigation } from '../../config/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {  return (
    <aside className={`
      fixed inset-y-0 left-0 z-20 w-64 bg-primary transform 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
      pt-16 flex flex-col h-screen border-r border-border
    `}>
      <div className="flex items-center justify-between px-4 py-2 lg:hidden">
        <span className="text-primary-foreground font-medium">Menu</span>
        {onClose && (
          <button 
            onClick={onClose} 
            className="text-primary-foreground/80 hover:text-primary-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-3 py-4">
          {/* Main Navigation */}
          <div className="space-y-1">
            {navigation.map((item) => (              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md
                  transition-colors duration-200
                  ${isActive 
                    ? 'bg-primary-foreground/10 text-primary-foreground' 
                    : 'text-primary-foreground/80 hover:bg-primary-foreground/5 hover:text-primary-foreground'}\
                `}
              >
                <div className="flex items-center">
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </div>
                {item.badge && (
                  <span className={`${item.badge.color} text-white text-xs px-2 py-0.5 rounded-full`}>
                    {item.badge.text}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Secondary Navigation */}          <div className="mt-8">
            <h3 className="px-3 text-xs font-semibold text-primary-foreground/60 uppercase tracking-wider">
              Administration
            </h3>
            <div className="mt-2 space-y-1">
              {secondaryNavigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) => `
                    flex items-center px-3 py-2 text-sm font-medium rounded-md
                    transition-colors duration-200
                    ${isActive 
                      ? 'bg-primary-foreground/10 text-primary-foreground' 
                      : 'text-primary-foreground/80 hover:bg-primary-foreground/5 hover:text-primary-foreground'}\
                  `}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Help Section */}          <div className="mt-8 px-3">
            <div className="p-4 bg-primary-foreground/5 rounded-lg">
              <div className="flex items-center">
                <HelpCircle className="h-6 w-6 text-primary-foreground/80" />
                <h3 className="ml-2 text-sm font-medium text-primary-foreground">Besoin d\'aide ?</h3>
              </div>
              <p className="mt-2 text-xs text-primary-foreground/60">
                Consultez notre documentation ou contactez le support.
              </p>
              <button className="mt-3 text-sm text-primary-foreground hover:text-primary-foreground/90 font-medium">
                Voir la documentation
              </button>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}