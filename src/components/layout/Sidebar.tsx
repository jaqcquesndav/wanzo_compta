import React from 'react';
import { NavLink } from 'react-router-dom';
import { HelpCircle, X } from 'lucide-react';
import { navigation, secondaryNavigation } from '../../config/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside className={`
      fixed inset-y-0 left-0 z-20 w-64 bg-primary dark:bg-dark-secondary transform 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
      pt-16 flex flex-col h-screen border-r border-primary dark:border-dark-DEFAULT
    `}>
      <div className="flex items-center justify-between px-4 py-2 lg:hidden">
        <span className="text-white dark:text-gray-100 font-medium">Menu</span>
        {onClose && (
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white dark:text-gray-400 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-3 py-4">
          {/* Main Navigation */}
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md
                  transition-colors duration-200
                  ${isActive 
                    ? 'bg-white/10 dark:bg-dark-hover text-white dark:text-white' 
                    : 'text-white/80 dark:text-gray-400 hover:bg-white/5 dark:hover:bg-dark-hover hover:text-white dark:hover:text-white'}
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

          {/* Secondary Navigation */}
          <div className="mt-8">
            <h3 className="px-3 text-xs font-semibold text-white/60 dark:text-gray-500 uppercase tracking-wider">
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
                      ? 'bg-white/10 dark:bg-dark-hover text-white dark:text-white' 
                      : 'text-white/80 dark:text-gray-400 hover:bg-white/5 dark:hover:bg-dark-hover hover:text-white dark:hover:text-white'}
                  `}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 px-3">
            <div className="p-4 bg-white/5 dark:bg-dark-hover rounded-lg">
              <div className="flex items-center">
                <HelpCircle className="h-6 w-6 text-white/80 dark:text-gray-400" />
                <h3 className="ml-2 text-sm font-medium text-white dark:text-gray-300">Besoin d'aide ?</h3>
              </div>
              <p className="mt-2 text-xs text-white/60 dark:text-gray-500">
                Consultez notre documentation ou contactez le support.
              </p>
              <button className="mt-3 text-sm text-white hover:text-white/90 dark:text-gray-300 dark:hover:text-white font-medium">
                Voir la documentation
              </button>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}