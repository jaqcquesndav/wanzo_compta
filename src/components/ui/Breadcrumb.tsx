import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

export function Breadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbItems: BreadcrumbItem[] = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { path, label };
  });

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary">
      <Link 
        to="/" 
        className="flex items-center hover:text-text-primary"
      >
        <Home className="h-4 w-4" />
      </Link>

      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.path}>
          <ChevronRight className="h-4 w-4" />
          <Link
            to={item.path}
            className={`hover:text-text-primary ${
              index === breadcrumbItems.length - 1 
                ? 'font-medium text-text-primary'
                : ''
            }`}
          >
            {item.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}