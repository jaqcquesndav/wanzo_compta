import type { NotesData } from '../types/reports';

export const mockNotes: NotesData = {
  generalInformation: {
    identification: {
      name: 'WANZO COMPTABILITÉ - i-kiotahub',
      legalForm: 'SARL',
      address: 'Kinshasa, RD Congo',
      registrationNumber: 'CD/KIN/RCCM/22-B-01234',
      taxId: 'A1234567Y',
      activity: 'Développement de logiciels',
      capital: 50000000,
      currency: 'CDF',
      fiscalYear: {
        start: '2024-01-01',
        end: '2024-12-31'
      }
    },
    accountingPrinciples: {
      framework: 'SYSCOHADA révisé',
      basis: 'Coût historique',
      currency: 'CDF',
      conversionMethod: 'Taux de clôture pour les éléments monétaires',
      significantPolicies: [
        'Immobilisations évaluées au coût d\'acquisition',
        'Stocks évalués au coût moyen pondéré',
        'Créances et dettes évaluées à la valeur nominale',
        'Provisions constituées selon le principe de prudence'
      ]
    },
    significantEvents: [
      {
        date: '2024-01-15',
        description: 'Acquisition de nouveaux locaux',
        impact: 'Augmentation des immobilisations de 50M CDF'
      },
      {
        date: '2024-02-28',
        description: 'Obtention d\'un financement bancaire',
        impact: 'Augmentation des dettes financières de 30M CDF'
      }
    ]
  },
  balanceNotes: {
    fixedAssets: {
      movements: [
        {
          category: 'Immobilisations incorporelles',
          openingBalance: 5000000,
          acquisitions: 1000000,
          disposals: 0,
          closingBalance: 6000000
        },
        {
          category: 'Immobilisations corporelles',
          openingBalance: 80000000,
          acquisitions: 10000000,
          disposals: 5000000,
          closingBalance: 85000000
        }
      ],
      details: {
        land: 25000000,
        buildings: 40000000,
        equipment: 20000000
      }
    },
    depreciation: {
      methods: {
        buildings: 'Linéaire sur 20 ans',
        equipment: 'Linéaire sur 5 ans',
        software: 'Linéaire sur 3 ans'
      },
      movements: [
        {
          category: 'Immobilisations incorporelles',
          openingBalance: 2000000,
          additions: 1000000,
          reversals: 0,
          closingBalance: 3000000
        },
        {
          category: 'Immobilisations corporelles',
          openingBalance: 15000000,
          additions: 8000000,
          reversals: 2000000,
          closingBalance: 21000000
        }
      ]
    },
    provisions: {
      details: [
        {
          type: 'Dépréciation des stocks',
          amount: 1000000,
          justification: 'Obsolescence'
        },
        {
          type: 'Dépréciation des créances',
          amount: 2000000,
          justification: 'Risque de non recouvrement'
        }
      ]
    },
    receivables: {
      aging: {
        less30days: 15000000,
        '30to60days': 10000000,
        '60to90days': 5000000,
        more90days: 3000000
      },
      majorClients: [
        { name: 'Client A', amount: 8000000 },
        { name: 'Client B', amount: 6000000 }
      ]
    },
    debts: {
      breakdown: {
        lessThan1Year: 25000000,
        '1to5Years': 20000000,
        moreThan5Years: 10000000
      },
      majorCreditors: [
        { name: 'Fournisseur X', amount: 12000000 },
        { name: 'Banque Y', amount: 15000000 }
      ]
    }
  },
  incomeNotes: {
    revenue: {
      breakdown: {
        services: 150000000,
        products: 30000000,
        other: 8000000
      },
      geographical: {
        domestic: 160000000,
        export: 28000000
      }
    },
    expenses: {
      breakdown: {
        purchases: 80000000,
        personnel: 40000000,
        external: 20000000,
        financial: 5000000,
        depreciation: 8000000
      }
    },
    personnel: {
      headcount: {
        management: 5,
        employees: 20,
        workers: 10
      },
      costs: {
        salaries: 30000000,
        socialCharges: 8000000,
        benefits: 2000000
      }
    },
    financial: {
      income: {
        interests: 500000,
        exchange: 300000
      },
      expenses: {
        interests: 2000000,
        exchange: 800000
      }
    }
  },
  otherNotes: {
    commitments: {
      given: [
        {
          type: 'Cautions bancaires',
          amount: 5000000,
          beneficiary: 'Fournisseurs'
        }
      ],
      received: [
        {
          type: 'Garanties clients',
          amount: 3000000,
          provider: 'Clients majeurs'
        }
      ]
    },
    relatedParties: [
      {
        name: 'Filiale A',
        relationship: 'Filiale à 100%',
        transactions: [
          {
            nature: 'Ventes',
            amount: 5000000
          }
        ]
      }
    ],
    postClosingEvents: [
      {
        date: '2024-01-15',
        description: 'Signature d\'un contrat majeur',
        impact: 'Augmentation prévue du CA de 20%'
      }
    ]
  }
};