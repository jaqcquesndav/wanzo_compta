import React from 'react';
import { Layout } from './components/Layout';

function App() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Tableau de Bord Comptable
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-blue-900">Total Actif</h3>
              <p className="text-2xl font-bold text-blue-600">0.00 XOF</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-green-900">Chiffre d'Affaires</h3>
              <p className="text-2xl font-bold text-green-600">0.00 XOF</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-purple-900">Résultat Net</h3>
              <p className="text-2xl font-bold text-purple-600">0.00 XOF</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Activité Récente
            </h2>
            <div className="bg-white border rounded-lg">
              <div className="px-4 py-3 border-b">
                <p className="text-sm text-gray-600">Aucune activité récente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;