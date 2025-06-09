// Liste exhaustive des comptes SYSCOHADA
export const SYSCOHADA_ACCOUNTS = {
  CLASS_1: {
    label: 'Comptes des ressources durables',
    accounts: {
      '101000': 'Capital social',
      '102000': 'Capital par dotation',
      '103000': 'Capital personnel',
      '104000': 'Compte de l\'exploitant',
      '105000': 'Primes liées aux capitaux propres',
      '106000': 'Écarts de réévaluation',
      '111000': 'Réserve légale',
      '112000': 'Réserves statutaires',
      '113000': 'Réserves réglementées',
      '118000': 'Autres réserves',
      '121000': 'Report à nouveau créditeur',
      '129000': 'Report à nouveau débiteur',
      '131000': 'Résultat net : bénéfice',
      '139000': 'Résultat net : perte',
      '151000': 'Provisions pour risques',
      '152000': 'Provisions pour charges',
      '161000': 'Emprunts obligataires',
      '162000': 'Emprunts auprès des établissements de crédit',
      '163000': 'Dettes rattachées aux participations',
      '164000': 'Avances reçues sur immobilisations',
      '168000': 'Autres dettes financières'
    }
  },
  CLASS_2: {
    label: 'Comptes d’actif immobilisé',
    accounts: {
      '211000': 'Frais de développement',
      '212000': 'Brevets, licences, concessions et droits similaires',
      '213000': 'Logiciels et sites internet',
      '214000': 'Marques',
      '215000': 'Fonds commercial',
      '216000': 'Droits au bail',
      '218000': 'Autres droits incorporels',
      '221000': 'Terrains',
      '223000': 'Terrains bâtis',
      '231000': 'Bâtiments industriels, agricoles, administratifs',
      '233000': 'Ouvrages d\'infrastructure',
      '234000': 'Installations techniques et agencements',
      '241000': 'Matériel et outillage',
      '244000': 'Matériel informatique et mobilier',
      '245000': 'Matériels de transport',
      '251000': 'Avances sur immobilisations incorporelles',
      '252000': 'Avances sur immobilisations corporelles',
      '261000': 'Titres de participation',
      '271000': 'Prêts et créances immobilisées',
      '275000': 'Dépôts et cautionnements',
      '281000': 'Amortissements des immobilisations incorporelles',
      '283000': 'Amortissements des bâtiments et installations',
      '284000': 'Amortissements des matériels et mobiliers'
    }
  },
  CLASS_3: {
    label: 'Comptes de stocks',
    accounts: {
      '311000': 'Marchandises',
      '312000': 'Matières premières',
      '321000': 'Approvisionnements',
      '331000': 'Matières consommables',
      '341000': 'Produits en cours',
      '351000': 'Services en cours',
      '361000': 'Produits finis',
      '371000': 'Produits intermédiaires',
      '381000': 'Marchandises en cours de route',
      '391000': 'Dépréciations des stocks'
    }
  },
  CLASS_4: {
    label: 'Comptes de tiers',
    accounts: {
      '401000': 'Fournisseurs',
      '402000': 'Effets à payer',
      '411000': 'Clients',
      '412000': 'Effets à recevoir',
      '421000': 'Personnel',
      '431000': 'Sécurité sociale',
      '437000': 'Autres organismes sociaux',
      '445660': 'TVA déductible',
      '445710': 'TVA collectée',
      '448000': 'État, charges à payer',
      '451000': 'Organismes internationaux'
    }
  },
  CLASS_5: {
    label: 'Comptes de trésorerie',
    accounts: {
      '511000': 'Effets à encaisser',
      '512000': 'Chèques à encaisser',
      '521000': 'Banques locales',
      '525000': 'Banques, dépôts à terme',
      '531000': 'Chèques postaux',
      '571000': 'Caisse',
      '572000': 'Caisse - Succursales'
    }
  },
  CLASS_6: {
    label: 'Comptes de charges',
    accounts: {
      '601000': 'Achats de marchandises',
      '602000': 'Achats de matières premières',
      '603000': 'Variations des stocks',
      '604000': 'Achats stockés : matières et fournitures',
      '611000': 'Transport sur achats',
      '612000': 'Transport sur ventes',
      '615000': 'Primes d\'assurance',
      '621000': 'Sous-traitance',
      '622000': 'Locations',
      '623000': 'Maintenance',
      '625000': 'Assurances',
      '631000': 'Frais bancaires',
      '635000': 'Cotisations',
      '641000': 'Impôts directs',
      '645000': 'Impôts indirects',
      '651000': 'Pertes sur créances'
    }
  },
  CLASS_7: {
    label: 'Comptes de produits',
    accounts: {
      '701000': 'Ventes de marchandises',
      '702000': 'Ventes de produits finis',
      '703000': 'Ventes de produits intermédiaires',
      '704000': 'Ventes de produits résiduels',
      '705000': 'Travaux facturés',
      '706000': 'Services vendus',
      '707000': 'Produits accessoires',
      '711000': 'Subventions d\'exploitation',
      '721000': 'Production immobilisée',
      '751000': 'Profits sur créances clients',
      '756000': 'Gains de change',
      '758000': 'Produits divers'
    }
  },
  CLASS_8: {
    label: 'Comptes des autres charges et des autres produits',
    accounts: {
      '811000': 'Valeurs comptables des cessions d\'immobilisations',
      '821000': 'Produits des cessions d\'immobilisations',
      '831000': 'Charges hors activités ordinaires',
      '841000': 'Produits hors activités ordinaires',
      '851000': 'Dotations aux provisions',
      '861000': 'Reprises sur provisions'
    }
  },
  CLASS_9: {
    label: 'Comptes d’engagements hors bilan',
    accounts: {
      '901000': 'Engagements de financement obtenus',
      '902000': 'Engagements de garantie obtenus',
      '905000': 'Engagements de financement accordés',
      '906000': 'Engagements de garantie accordés',
      '911000': 'Contrepartie des engagements obtenus',
      '915000': 'Contrepartie des engagements accordés'
    }
  }
} as const;
