import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { IndexedDBService } from './services/storage/IndexedDBService';
import { SyncService } from './services/sync/SyncService';
import './index.css';

async function initializeApp() {
  try {
    // Get token from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      localStorage.setItem('auth_token', token);
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }

    // Initialize services
    await IndexedDBService.initDB();
    await SyncService.initialize();
    console.log('Application initialized');
  } catch (error) {
    console.error('Failed to initialize application:', error);
  }
}

initializeApp().then(() => {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Failed to find the root element');

  createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
});