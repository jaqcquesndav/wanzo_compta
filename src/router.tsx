import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { JournalsPage } from './pages/journals/JournalsPage';
import { LedgerPage } from './pages/ledger/LedgerPage';
import { ReportsPage } from './pages/reports/ReportsPage';
import { DeclarationsPage } from './pages/declarations/DeclarationsPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { DataSharingBenefitsPage } from './pages/settings/DataSharingBenefitsPage';
import { FiscalYearsPage } from './pages/fiscal-years/FiscalYearsPage';
import { UsersPage } from './pages/users/UsersPage';
import { OrganizationPage } from './pages/organization/OrganizationPage';
import { ChatPage } from './pages/chat/ChatPage';
import { LoginPage } from './pages/auth/LoginPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthCallbackPage } from './pages/auth/AuthCallbackPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/callback',
    element: <AuthCallbackPage />
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <DashboardPage />
      },
      {
        path: '/journals',
        element: <JournalsPage />
      },
      {
        path: '/ledger',
        element: <LedgerPage />
      },
      {
        path: '/reports',
        element: <ReportsPage />
      },
      {
        path: '/declarations',
        element: <DeclarationsPage />
      },
      {
        path: '/settings',
        element: <SettingsPage />
      },
      {
        path: '/settings/data-sharing-benefits',
        element: <DataSharingBenefitsPage />
      },
      {
        path: '/fiscal-years',
        element: <FiscalYearsPage />
      },
      {
        path: '/users',
        element: <UsersPage />
      },
      {
        path: '/organization',
        element: <OrganizationPage />
      },
      {
        path: '/chat',
        element: <ChatPage />
      }
    ]
  }
], {
  basename: "/accounting"
});