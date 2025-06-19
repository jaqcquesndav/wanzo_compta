import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { router } from './router';
import { IndexedDBService } from './services/storage/IndexedDBService';
import { SyncService } from './services/sync/SyncService';
import './index.css';

// Initialize services that don't depend on auth
async function initializeServices() {
  try {
    await IndexedDBService.initDB();
    await SyncService.initialize();
    console.log('Base services initialized');
  } catch (error) {
    console.error('Failed to initialize base services:', error);
  }
}

initializeServices().then(() => {
  const container = document.getElementById('root');
  if (!container) throw new Error('Failed to find the root element');
  const root = createRoot(container);

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  root.render(
    <React.StrictMode>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        useRefreshTokens={true}
        cacheLocation="localstorage"
        authorizationParams={{
          redirect_uri: redirectUri,
          audience: audience,
          scope: `${import.meta.env.VITE_AUTH0_SCOPE} offline_access`,
        }}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </React.StrictMode>
  );
});