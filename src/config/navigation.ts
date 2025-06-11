import { 
  Home, BookOpen, Calculator, FileText, 
  FileSpreadsheet,
  Users, Building, Calendar, Settings
} from 'lucide-react';

export const navigation = [
  { 
    name: 'Tableau de Bord', 
    icon: Home, 
    path: '/',
    badge: null
  },
  { 
    name: 'Journaux', 
    icon: BookOpen, 
    path: '/journals',
    badge: { text: 'Nouveau', color: 'bg-success' }
  },
  { 
    name: 'Grand Livre', 
    icon: Calculator, 
    path: '/ledger',
    badge: null
  },
  { 
    name: 'États Financiers', 
    icon: FileText, 
    path: '/reports',
    badge: null
  },
  { 
    name: 'Déclarations', 
    icon: FileSpreadsheet, 
    path: '/declarations',
    badge: { text: 'TVA', color: 'bg-warning' }
  },
] as const;

export const secondaryNavigation = [
  { name: 'Exercices', icon: Calendar, path: '/fiscal-years' },
  { name: 'Utilisateurs', icon: Users, path: '/users' },
  { name: 'Entreprise', icon: Building, path: '/organization' },
  { name: 'Paramètres', icon: Settings, path: '/settings' },
] as const;