import React from 'react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <h2 className="text-xl font-semibold text-text-primary">
          Chargement...
        </h2>
        <p className="text-text-secondary">
          Veuillez patienter pendant le chargement de l'application
        </p>
      </div>
    </div>
  );
}