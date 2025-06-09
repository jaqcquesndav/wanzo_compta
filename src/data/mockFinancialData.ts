import type { BalanceSheetData, IncomeStatementData, CashFlowStatementData, EquityChangesData } from '../types/reports';

// Bilan
export const mockBalanceSheet: BalanceSheetData = {
  // Actif
  fixedAssets: {
    intangibleAssets: [
      { code: '21', label: 'Immobilisations incorporelles', brut: 5000000, amort: 1000000, net: 4000000, netN1: 3500000 }
    ],
    tangibleAssets: [
      { code: '22', label: 'Terrains', brut: 25000000, net: 25000000, netN1: 25000000 },
      { code: '23', label: 'Bâtiments', brut: 50000000, amort: 10000000, net: 40000000, netN1: 42500000 },
      { code: '24', label: 'Matériel', brut: 15000000, amort: 5000000, net: 10000000, netN1: 12000000 }
    ],
    financialAssets: [
      { code: '26', label: 'Titres de participation', brut: 10000000, net: 10000000, netN1: 10000000 }
    ],
    total: { code: '20', label: 'Total Actif immobilisé', brut: 105000000, amort: 16000000, net: 89000000, netN1: 93000000 }
  },
  currentAssets: {
    inventory: [
      { code: '31', label: 'Stocks marchandises', brut: 20000000, amort: 1000000, net: 19000000, netN1: 17500000 }
    ],
    receivables: [
      { code: '41', label: 'Clients', brut: 35000000, amort: 2000000, net: 33000000, netN1: 30000000 }
    ],
    other: [
      { code: '45', label: 'Débiteurs divers', brut: 5000000, net: 5000000, netN1: 4500000 }
    ],
    total: { code: '40', label: 'Total Actif circulant', brut: 60000000, amort: 3000000, net: 57000000, netN1: 52000000 }
  },
  treasuryAssets: {
    investments: [
      { code: '50', label: 'Titres de placement', brut: 5000000, net: 5000000, netN1: 4000000 }
    ],
    banks: [
      { code: '52', label: 'Banques', brut: 15000000, net: 15000000, netN1: 12000000 }
    ],
    cashOnHand: [
      { code: '57', label: 'Caisse', brut: 1000000, net: 1000000, netN1: 800000 }
    ],
    total: { code: '50', label: 'Total Trésorerie-Actif', brut: 21000000, net: 21000000, netN1: 16800000 }
  },
  grandTotal: { code: '1', label: 'TOTAL ACTIF', brut: 186000000, amort: 19000000, net: 167000000, netN1: 161800000 },

  // Passif
  equity: {
    capital: [
      { code: '101', label: 'Capital social', net: 50000000, netN1: 50000000 }
    ],
    reserves: [
      { code: '11', label: 'Réserves', net: 25000000, netN1: 20000000 }
    ],
    result: [
      { code: '12', label: 'Résultat net', net: 15000000, netN1: 12000000 }
    ],
    other: [
      { code: '13', label: 'Subventions d\'investissement', net: 5000000, netN1: 6000000 }
    ],
    total: { code: '10', label: 'Total Capitaux propres', net: 95000000, netN1: 88000000 }
  },
  financialDebts: {
    loans: [
      { code: '16', label: 'Emprunts', net: 30000000, netN1: 35000000 }
    ],
    leasing: [
      { code: '17', label: 'Dettes de crédit-bail', net: 5000000, netN1: 6000000 }
    ],
    other: [],
    total: { code: '16', label: 'Total Dettes financières', net: 35000000, netN1: 41000000 }
  },
  currentLiabilities: {
    suppliers: [
      { code: '40', label: 'Fournisseurs', net: 25000000, netN1: 22000000 }
    ],
    fiscal: [
      { code: '44', label: 'État', net: 8000000, netN1: 7500000 }
    ],
    social: [
      { code: '43', label: 'Organismes sociaux', net: 3000000, netN1: 2800000 }
    ],
    other: [
      { code: '45', label: 'Créditeurs divers', net: 1000000, netN1: 500000 }
    ],
    total: { code: '40', label: 'Total Passif circulant', net: 37000000, netN1: 32800000 }
  },
  treasuryLiabilities: {
    banks: [],
    other: [],
    total: { code: '50', label: 'Total Trésorerie-Passif', net: 0, netN1: 0 }
  },
  grandTotal: { code: '2', label: 'TOTAL PASSIF', net: 167000000, netN1: 161800000 }
};

// Compte de résultat
export const mockIncomeStatement: IncomeStatementData = {
  operatingIncome: {
    sales: [
      { code: '70', label: 'Ventes de marchandises', current: 180000000, previous: 165000000, variation: 9.1 }
    ],
    production: [
      { code: '72', label: 'Production immobilisée', current: 5000000, previous: 4000000, variation: 25 }
    ],
    grants: [
      { code: '74', label: 'Subventions d\'exploitation', current: 2000000, previous: 1500000, variation: 33.3 }
    ],
    other: [
      { code: '75', label: 'Autres produits', current: 1000000, previous: 800000, variation: 25 }
    ],
    total: { code: '70', label: 'Total Produits d\'exploitation', current: 188000000, previous: 171300000, variation: 9.7 }
  },
  operatingExpenses: {
    purchases: [
      { code: '60', label: 'Achats', current: 120000000, previous: 110000000, variation: 9.1 }
    ],
    services: [
      { code: '61', label: 'Services extérieurs', current: 15000000, previous: 13500000, variation: 11.1 }
    ],
    taxes: [
      { code: '64', label: 'Impôts et taxes', current: 5000000, previous: 4500000, variation: 11.1 }
    ],
    personnel: [
      { code: '66', label: 'Charges de personnel', current: 25000000, previous: 23000000, variation: 8.7 }
    ],
    depreciation: [
      { code: '68', label: 'Dotations aux amortissements', current: 8000000, previous: 7500000, variation: 6.7 }
    ],
    other: [
      { code: '65', label: 'Autres charges', current: 2000000, previous: 1800000, variation: 11.1 }
    ],
    total: { code: '60', label: 'Total Charges d\'exploitation', current: 175000000, previous: 160300000, variation: 9.2 }
  },
  operatingResult: { code: 'RE', label: 'Résultat d\'exploitation', current: 13000000, previous: 11000000, variation: 18.2 },
  
  financialIncome: [
    { code: '76', label: 'Produits financiers', current: 1000000, previous: 800000, variation: 25 }
  ],
  financialExpenses: [
    { code: '66', label: 'Charges financières', current: 2000000, previous: 2200000, variation: -9.1 }
  ],
  financialResult: { code: 'RF', label: 'Résultat financier', current: -1000000, previous: -1400000, variation: -28.6 },
  
  ordinaryResult: { code: 'RAO', label: 'Résultat des activités ordinaires', current: 12000000, previous: 9600000, variation: 25 },
  
  extraordinaryIncome: [
    { code: '77', label: 'Produits HAO', current: 5000000, previous: 4000000, variation: 25 }
  ],
  extraordinaryExpenses: [
    { code: '67', label: 'Charges HAO', current: 2000000, previous: 1600000, variation: 25 }
  ],
  extraordinaryResult: { code: 'RHAO', label: 'Résultat HAO', current: 3000000, previous: 2400000, variation: 25 },
  
  taxes: { code: '69', label: 'Impôts sur le résultat', current: 0, previous: 0, variation: 0 },
  netResult: { code: 'RN', label: 'Résultat net', current: 15000000, previous: 12000000, variation: 25 }
};

// Tableau des flux de trésorerie
export const mockCashFlow: CashFlowStatementData = {
  operatingActivities: {
    netResult: { code: 'RN', label: 'Résultat net', current: 15000000, previous: 12000000 },
    adjustments: [
      { code: '68', label: 'Dotations aux amortissements', current: 8000000, previous: 7500000 },
      { code: '78', label: 'Reprises sur provisions', current: -1000000, previous: -800000 }
    ],
    workingCapital: [
      { code: 'BFR1', label: 'Variation des stocks', current: -1500000, previous: -2000000 },
      { code: 'BFR2', label: 'Variation des créances', current: -3000000, previous: -2500000 },
      { code: 'BFR3', label: 'Variation des dettes', current: 4200000, previous: 3500000 }
    ],
    total: { code: 'FTE', label: 'Flux de trésorerie d\'exploitation', current: 21700000, previous: 17700000 }
  },
  investingActivities: {
    acquisitions: [
      { code: 'INV1', label: 'Acquisitions d\'immobilisations', current: -12000000, previous: -10000000 }
    ],
    disposals: [
      { code: 'INV2', label: 'Cessions d\'immobilisations', current: 5000000, previous: 4000000 }
    ],
    total: { code: 'FTI', label: 'Flux de trésorerie d\'investissement', current: -7000000, previous: -6000000 }
  },
  financingActivities: {
    capital: [
      { code: 'FIN1', label: 'Augmentation de capital', current: 0, previous: 10000000 }
    ],
    loans: [
      { code: 'FIN2', label: 'Emprunts nouveaux', current: 5000000, previous: 8000000 }
    ],
    repayments: [
      { code: 'FIN3', label: 'Remboursements d\'emprunts', current: -10000000, previous: -12000000 }
    ],
    dividends: [
      { code: 'FIN4', label: 'Dividendes versés', current: -5000000, previous: -4000000 }
    ],
    total: { code: 'FTF', label: 'Flux de trésorerie de financement', current: -10000000, previous: 2000000 }
  },
  netCashChange: { code: 'VT', label: 'Variation de trésorerie', current: 4700000, previous: 13700000 },
  openingCash: { code: 'TO', label: 'Trésorerie d\'ouverture', current: 16800000, previous: 3100000 },
  closingCash: { code: 'TC', label: 'Trésorerie de clôture', current: 21500000, previous: 16800000 }
};

// Tableau de variation des capitaux propres
export const mockEquityChanges: EquityChangesData = {
  capital: [
    { code: '101', label: 'Capital social', current: 50000000, previous: 50000000, variation: 0 }
  ],
  premiums: [
    { code: '104', label: 'Primes liées au capital', current: 5000000, previous: 5000000, variation: 0 }
  ],
  revaluationReserves: [
    { code: '106', label: 'Écarts de réévaluation', current: 2000000, previous: 2000000, variation: 0 }
  ],
  legalReserves: [
    { code: '111', label: 'Réserve légale', current: 5000000, previous: 4000000, variation: 25 }
  ],
  otherReserves: [
    { code: '118', label: 'Autres réserves', current: 20000000, previous: 16000000, variation: 25 }
  ],
  retainedEarnings: [
    { code: '12', label: 'Report à nouveau', current: 8000000, previous: 6000000, variation: 33.3 }
  ],
  netResult: [
    { code: 'RN', label: 'Résultat net', current: 15000000, previous: 12000000, variation: 25 }
  ],
  total: { code: 'CP', label: 'Total capitaux propres', current: 105000000, previous: 95000000, variation: 10.5 }
};

// Export des notes déjà défini dans mockNotes
export { mockNotes } from './mockNotes';