import { Layout } from './components/Layout';

function App() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Modifié pour utiliser les classes de thème sémantiques */}
        <div className="bg-primary rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            Tableau de Bord Comptable
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Stats */}
            {/* Ces éléments utilisent des couleurs spécifiques (blue-50, green-50, etc.) */}
            {/* Vous voudrez peut-être les rendre également compatibles avec le thème sombre */}
            {/* ou les laisser tels quels si c'est un choix de conception. */}
            {/* Exemple pour rendre compatible: bg-secondary text-primary */}
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-blue-900 dark:text-blue-300">Total Actif</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">0.00 XOF</p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-green-900 dark:text-green-300">Chiffre d'Affaires</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">0.00 XOF</p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-purple-900 dark:text-purple-300">Résultat Net</h3>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">0.00 XOF</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              Activité Récente
            </h2>
            {/* Modifié pour utiliser les classes de thème sémantiques */}
            <div className="bg-primary border border-primary rounded-lg">
              <div className="px-4 py-3 border-b border-secondary">
                <p className="text-sm text-text-secondary">Aucune activité récente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;