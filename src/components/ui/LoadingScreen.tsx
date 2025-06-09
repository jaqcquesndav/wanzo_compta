import React from 'react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-dark-primary flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Chargement...
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Veuillez patienter pendant le chargement de l'application
        </p>
      </div>
    </div>
  );
}