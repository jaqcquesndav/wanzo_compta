import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Layout } from '../Layout';

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  console.log('ProtectedRoute:', { user, loading });

  if (loading) {
    console.log('Auth loading...');
    return <div>Chargement...</div>;
  }

  if (!user) {
    console.log('No user found, redirecting to login page...');
    return <Navigate to="/login" replace />;
  }

  console.log('User authenticated, rendering protected content');
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}