import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary)] to-blue-700 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <h2 className="text-center text-3xl font-extrabold text-white mb-2">
          Contactez-nous
        </h2>
        <p className="text-center text-blue-100">
          Pour créer un compte ou obtenir plus d'informations
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-gray-700">
              <Mail className="h-5 w-5 text-[var(--color-primary)]" />
              <span>contact@kiota.com</span>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-700">
              <Phone className="h-5 w-5 text-[var(--color-primary)]" />
              <span>+221 77 000 00 00</span>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-700">
              <MapPin className="h-5 w-5 text-[var(--color-primary)]" />
              <span>Dakar, Sénégal</span>
            </div>

            <div className="pt-4 border-t">
              <a
                href="/login"
                className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
              >
                Retour à la connexion
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}