export interface FinancialItem {
  code: string;
  label: string;
  brut?: number;
  amort?: number;
  net: number;
  netN1: number;
  current?: number;
  previous?: number;
  variation?: number;
}

export type FinancialStatementType = 
  | 'balance'           // Bilan
  | 'income'           // Compte de résultat
  | 'cashflow'         // Tableau des flux de trésorerie
  | 'equity-changes'   // Tableau de variation des capitaux propres
  | 'notes'           // Notes annexes
  | 'reconciliation'  // État de rapprochement des soldes
  | 'analytical'      // État analytique
  | 'social'          // Bilan social
  | 'statistics';     // État statistique

export interface BalanceSheetData {
  // Actif
  fixedAssets: { // Actif immobilisé
    intangibleAssets: FinancialItem[]; // Immobilisations incorporelles
    tangibleAssets: FinancialItem[];   // Immobilisations corporelles
    financialAssets: FinancialItem[];  // Immobilisations financières
    total: FinancialItem;
  };
  currentAssets: { // Actif circulant
    inventory: FinancialItem[];        // Stocks
    receivables: FinancialItem[];      // Créances
    other: FinancialItem[];            // Autres actifs circulants
    total: FinancialItem;
  };
  treasuryAssets: { // Trésorerie-Actif
    investments: FinancialItem[];      // Titres de placement
    banks: FinancialItem[];            // Banques
    cashOnHand: FinancialItem[];       // Caisse
    total: FinancialItem;
  };
  grandTotal: FinancialItem;           // Total Actif

  // Passif
  equity: { // Capitaux propres
    capital: FinancialItem[];          // Capital
    reserves: FinancialItem[];         // Réserves
    result: FinancialItem[];           // Résultat
    other: FinancialItem[];            // Autres capitaux propres
    total: FinancialItem;
  };
  financialDebts: { // Dettes financières
    loans: FinancialItem[];            // Emprunts
    leasing: FinancialItem[];          // Dettes de crédit-bail
    other: FinancialItem[];            // Autres dettes financières
    total: FinancialItem;
  };
  currentLiabilities: { // Passif circulant
    suppliers: FinancialItem[];        // Fournisseurs
    fiscal: FinancialItem[];           // Dettes fiscales
    social: FinancialItem[];           // Dettes sociales
    other: FinancialItem[];            // Autres dettes
    total: FinancialItem;
  };
  treasuryLiabilities: { // Trésorerie-Passif
    banks: FinancialItem[];            // Banques
    other: FinancialItem[];            // Autres
    total: FinancialItem;
  };
  grandTotal: FinancialItem;           // Total Passif
}

export interface IncomeStatementData {
  operatingIncome: { // Produits d'exploitation
    sales: FinancialItem[];            // Ventes
    production: FinancialItem[];       // Production
    grants: FinancialItem[];           // Subventions
    other: FinancialItem[];            // Autres produits
    total: FinancialItem;
  };
  operatingExpenses: { // Charges d'exploitation
    purchases: FinancialItem[];        // Achats
    services: FinancialItem[];         // Services extérieurs
    taxes: FinancialItem[];            // Impôts et taxes
    personnel: FinancialItem[];        // Charges de personnel
    depreciation: FinancialItem[];     // Dotations aux amortissements
    other: FinancialItem[];            // Autres charges
    total: FinancialItem;
  };
  operatingResult: FinancialItem;      // Résultat d'exploitation
  
  financialIncome: FinancialItem[];    // Produits financiers
  financialExpenses: FinancialItem[];  // Charges financières
  financialResult: FinancialItem;      // Résultat financier
  
  ordinaryResult: FinancialItem;       // Résultat des activités ordinaires
  
  extraordinaryIncome: FinancialItem[];  // Produits hors activités ordinaires
  extraordinaryExpenses: FinancialItem[]; // Charges hors activités ordinaires
  extraordinaryResult: FinancialItem;   // Résultat hors activités ordinaires
  
  taxes: FinancialItem;                // Impôts sur le résultat
  netResult: FinancialItem;            // Résultat net
}

export interface CashFlowStatementData {
  operatingActivities: {
    netResult: FinancialItem;
    adjustments: FinancialItem[];      // Ajustements
    workingCapital: FinancialItem[];   // Variation du BFR
    total: FinancialItem;
  };
  investingActivities: {
    acquisitions: FinancialItem[];     // Acquisitions d'immobilisations
    disposals: FinancialItem[];        // Cessions d'immobilisations
    total: FinancialItem;
  };
  financingActivities: {
    capital: FinancialItem[];          // Augmentation de capital
    loans: FinancialItem[];            // Emprunts nouveaux
    repayments: FinancialItem[];       // Remboursements
    dividends: FinancialItem[];        // Dividendes versés
    total: FinancialItem;
  };
  netCashChange: FinancialItem;        // Variation de trésorerie
  openingCash: FinancialItem;          // Trésorerie d'ouverture
  closingCash: FinancialItem;          // Trésorerie de clôture
}

export interface EquityChangesData {
  capital: FinancialItem[];
  premiums: FinancialItem[];
  revaluationReserves: FinancialItem[];
  legalReserves: FinancialItem[];
  otherReserves: FinancialItem[];
  retainedEarnings: FinancialItem[];
  netResult: FinancialItem[];
  total: FinancialItem;
}

export interface NotesData {
  generalInformation: {
    identification: any;
    accountingPrinciples: any;
    significantEvents: any;
  };
  balanceNotes: {
    fixedAssets: any;
    depreciation: any;
    provisions: any;
    receivables: any;
    debts: any;
  };
  incomeNotes: {
    revenue: any;
    expenses: any;
    personnel: any;
    financial: any;
  };
  otherNotes: {
    commitments: any;
    relatedParties: any;
    postClosingEvents: any;
  };
}