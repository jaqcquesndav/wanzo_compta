export type DeclarationType = 'IPR' | 'IB' | 'TVA' | 'CNSS' | 'TPI' | 'TE';
export type DeclarationPeriodicity = 'monthly' | 'quarterly' | 'annual';
export type DeclarationStatus = 'draft' | 'pending' | 'submitted';

export interface Declaration {
  id: string;
  type: DeclarationType;
  period: string;
  periodicity: DeclarationPeriodicity;
  dueDate: string;
  status: DeclarationStatus;
  amount: number;
  submittedAt?: string;
  submittedBy?: string;
  reference?: string;
  attachments?: string[];
}

export const DECLARATION_TYPES = {
  IPR: {
    label: 'Impôt sur le Revenu Professionnel',
    periodicity: 'monthly' as const,
    dueDate: 15 // Jour du mois suivant
  },
  IB: {
    label: 'Impôt sur les Bénéfices',
    periodicity: 'annual' as const,
    dueDate: 31 // Mars de l'année suivante
  },
  TVA: {
    label: 'Taxe sur la Valeur Ajoutée',
    periodicity: 'monthly' as const,
    dueDate: 15 // Jour du mois suivant
  },
  CNSS: {
    label: 'Cotisations CNSS',
    periodicity: 'monthly' as const,
    dueDate: 10 // Jour du mois suivant
  },
  TPI: {
    label: 'Taxe de Promotion de l\'Industrie',
    periodicity: 'monthly' as const,
    dueDate: 15 // Jour du mois suivant
  },
  TE: {
    label: 'Taxe Environnementale',
    periodicity: 'quarterly' as const,
    dueDate: 15 // Jour du premier mois du trimestre suivant
  }
} as const;