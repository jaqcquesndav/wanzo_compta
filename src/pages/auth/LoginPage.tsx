import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { LogIn, Mail, Lock, Eye, EyeOff, Users } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loginWithKSAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = login(email, password);
    if (success) {
      navigate('/', { replace: true });
    } else {
      setError('Identifiants incorrects. Veuillez réessayer.');
    }
    setLoading(false);
  };

  const handleKSAuth = async () => {
    try {
      setLoading(true);
      setError('');
      await loginWithKSAuth();
      navigate('/', { replace: true });
    } catch (err) {
      setError('Erreur de connexion avec KS Auth');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (demoType: 'admin' | 'comptable' | 'manager') => {
    setLoading(true);
    setError('');
    
    let demoEmail = '';
    let demoPassword = '';
    
    switch(demoType) {
      case 'admin':
        demoEmail = 'admin@demo.com';
        demoPassword = 'Demo@123';
        break;
      case 'comptable':
        demoEmail = 'comptable@demo.com';
        demoPassword = 'Demo@123';
        break;
      case 'manager':
        demoEmail = 'manager@demo.com';
        demoPassword = 'Demo@123';
        break;
    }
    
    const success = login(demoEmail, demoPassword);
    if (success) {
      navigate('/', { replace: true });
    } else {
      setError(`Échec de connexion avec le compte ${demoType}. Vérifiez la configuration.`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary)] to-blue-700 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
            <LogIn className="h-8 w-8 text-[var(--color-primary)]" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Wanzo Comptabilité
        </h2>
        <p className="mt-2 text-center text-sm text-blue-100">
          Connectez-vous à votre espace de travail
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kiota.com"
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin@123"
                  className="appearance-none block w-full pl-10 pr-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4"
                icon={LogIn}
                isLoading={loading}
              >
                Se connecter
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={handleKSAuth}
                isLoading={loading}
              >
                Se connecter avec KS Auth
              </Button>
            </div>

            <div className="mt-4">
              <Button
                type="button"
                variant="tertiary"
                className="w-full"
                onClick={() => handleDemoLogin('admin')}
                isLoading={loading}
                icon={Users}
              >
                Se connecter en tant qu'admin démo
              </Button>
            </div>
            <div className="mt-2">
              <Button
                type="button"
                variant="tertiary"
                className="w-full"
                onClick={() => handleDemoLogin('comptable')}
                isLoading={loading}
                icon={Users}
              >
                Se connecter en tant que comptable démo
              </Button>
            </div>
            <div className="mt-2">
              <Button
                type="button"
                variant="tertiary"
                className="w-full"
                onClick={() => handleDemoLogin('manager')}
                isLoading={loading}
                icon={Users}
              >
                Se connecter en tant que manager démo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}