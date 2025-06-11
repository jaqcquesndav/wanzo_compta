# Wanzo Comptabilité - Documentation d'intégration Backend

## Introduction

Cette documentation vise à guider les développeurs backend sur l'intégration API avec le frontend Wanzo Comptabilité. Le projet est une application de comptabilité moderne qui offre une gestion complète des opérations comptables, avec une architecture frontend React/TypeScript et un backend à développer en NestJS/TypeORM.

### Systèmes comptables pris en charge

L'application prend en charge deux systèmes comptables :
- **SYSCOHADA** (par défaut) : Système Comptable OHADA Révisé, utilisé dans les pays membres de l'Organisation pour l'Harmonisation en Afrique du Droit des Affaires.
- **IFRS** : International Financial Reporting Standards, pour les entreprises souhaitant se conformer aux normes internationales.

Le choix du système comptable affecte la structure du plan comptable, les règles de comptabilisation et la présentation des états financiers. Les API doivent donc permettre de spécifier le système comptable utilisé pour certaines opérations, notamment dans les endpoints de grand livre et de rapports.

### Gestion des devises

L'application supporte différentes devises, avec le Franc Congolais (CDF) comme devise par défaut. Les API doivent permettre de spécifier la devise pour les opérations financières et pour la génération des états financiers. Les montants sont stockés dans la devise de base de l'entreprise, mais peuvent être convertis pour l'affichage.

## Architecture technique

### Frontend
- **Framework**: React avec TypeScript
- **Gestion d'état**: React Hooks et Zustand
- **Routing**: React Router
- **UI**: Tailwind CSS avec composants personnalisés
- **Stockage local**: IndexedDB pour le mode hors-ligne

### Backend à implémenter
- **Framework**: NestJS
- **ORM**: TypeORM
- **Base de données**: PostgreSQL (recommandé)
- **Authentication**: JWT
- **Documentation API**: Swagger

## Stratégie de synchronisation et IndexedDB

L'application utilise IndexedDB pour la persistance locale des données et le fonctionnement hors-ligne. Le backend doit prendre en charge cette stratégie en:

1. **Fournissant un mécanisme de synchronisation**: API de synchronisation permettant de pousser les modifications locales vers le serveur et récupérer les modifications distantes.
2. **Gérant les conflits**: Stratégie de résolution des conflits lorsque les mêmes données sont modifiées localement et sur le serveur.
3. **Supportant les opérations en bloc**: Permettre l'envoi de plusieurs opérations en une seule requête pour optimiser la synchronisation.

Le schéma de synchronisation suit ce format:

```json
// Requête de synchronisation
{
  "operations": [
    {
      "type": "create",
      "entity": "journalEntry",
      "data": { /* données de l'entité */ },
      "localId": "temp-id-123",
      "timestamp": "2023-06-11T14:22:35.000Z"
    },
    {
      "type": "update",
      "entity": "account",
      "id": "existing-id-456",
      "data": { /* données modifiées */ },
      "timestamp": "2023-06-11T14:25:12.000Z"
    },
    {
      "type": "delete",
      "entity": "attachment",
      "id": "attachment-id-789",
      "timestamp": "2023-06-11T14:26:08.000Z"
    }
  ],
  "lastSyncTimestamp": "2023-06-10T18:30:45.000Z"
}

// Réponse de synchronisation
{
  "success": true,
  "results": [
    {
      "localId": "temp-id-123",
      "serverId": "actual-server-id-123",
      "status": "created"
    },
    {
      "id": "existing-id-456",
      "status": "updated"
    },
    {
      "id": "attachment-id-789",
      "status": "deleted"
    }
  ],
  "serverChanges": [
    {
      "type": "update",
      "entity": "organization",
      "id": "org-id-001",
      "data": { /* données modifiées */ },
      "timestamp": "2023-06-11T12:15:30.000Z"
    }
  ],
  "currentServerTime": "2023-06-11T14:30:00.000Z",
  "conflicts": []
}
```

## Structures des données et endpoints API

### Authentification

**Endpoint**: `/auth/login`  
**Méthode**: POST  
**Requête**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Réponse**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "name": "User Name",
      "role": "comptable"
    },
    "token": "jwt-token-here"
  }
}
```

**Endpoint**: `/auth/verify`  
**Méthode**: GET  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Réponse**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "name": "User Name",
      "role": "comptable"
    }
  }
}
```

**Endpoint**: `/auth/logout`  
**Méthode**: POST  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Réponse**:
```json
{
  "success": true
}
```

### Organisation

**Endpoint**: `/organization`  
**Méthode**: GET  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Réponse**:
```json
{
  "success": true,
  "data": {
    "id": "org-uuid",
    "name": "Entreprise XYZ",
    "registrationNumber": "RC12345",
    "taxId": "TPF98765",
    "address": "123 Rue Principale",
    "city": "Kinshasa",
    "country": "RDC",
    "phone": "+243123456789",
    "email": "contact@entreprisexyz.com",
    "website": "www.entreprisexyz.com",
    "legalForm": "SARL",
    "capital": "10000000",
    "currency": "CDF",
    "accountingMode": "SYSCOHADA",
    "logo": "https://storage.example.com/logos/entreprisexyz.png",
    "industry": "Commerce",
    "description": "Entreprise de commerce général",
    "productsAndServices": {
      "products": [
        {
          "name": "Produit A",
          "description": "Description du produit A",
          "category": "Catégorie 1"
        }
      ],
      "services": [
        {
          "name": "Service X",
          "description": "Description du service X",
          "category": "Catégorie 2"
        }
      ]
    },
    "businessHours": {
      "monday": "08:00-17:00",
      "tuesday": "08:00-17:00",
      "wednesday": "08:00-17:00",
      "thursday": "08:00-17:00",
      "friday": "08:00-17:00"
    },
    "socialMedia": {
      "facebook": "facebook.com/entreprisexyz",
      "linkedin": "linkedin.com/company/entreprisexyz"
    }
  }
}
```

**Endpoint**: `/organization`  
**Méthode**: PUT  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Requête**:
```json
{
  "name": "Entreprise XYZ Updated",
  "phone": "+243987654321",
  "email": "nouveau@entreprisexyz.com",
  "productsAndServices": {
    "products": [
      {
        "name": "Produit A",
        "description": "Description mise à jour",
        "category": "Catégorie 1"
      },
      {
        "name": "Produit B",
        "description": "Nouveau produit",
        "category": "Catégorie 3"
      }
    ],
    "services": [
      {
        "name": "Service X",
        "description": "Description du service X",
        "category": "Catégorie 2"
      }
    ]
  }
}
```
**Réponse**:
```json
{
  "success": true,
  "data": {
    "id": "org-uuid",
    "name": "Entreprise XYZ Updated",
    "registrationNumber": "RC12345",
    "taxId": "TPF98765",
    "address": "123 Rue Principale",
    "city": "Kinshasa",
    "country": "RDC",
    "phone": "+243987654321",
    "email": "nouveau@entreprisexyz.com",
    "website": "www.entreprisexyz.com",
    "legalForm": "SARL",
    "capital": "10000000",
    "currency": "CDF",
    "accountingMode": "SYSCOHADA",
    "logo": "https://storage.example.com/logos/entreprisexyz.png",
    "industry": "Commerce",
    "description": "Entreprise de commerce général",
    "productsAndServices": {
      "products": [
        {
          "name": "Produit A",
          "description": "Description mise à jour",
          "category": "Catégorie 1"
        },
        {
          "name": "Produit B",
          "description": "Nouveau produit",
          "category": "Catégorie 3"
        }
      ],
      "services": [
        {
          "name": "Service X",
          "description": "Description du service X",
          "category": "Catégorie 2"
        }
      ]
    },
    "businessHours": {
      "monday": "08:00-17:00",
      "tuesday": "08:00-17:00",
      "wednesday": "08:00-17:00",
      "thursday": "08:00-17:00",
      "friday": "08:00-17:00"
    },
    "socialMedia": {
      "facebook": "facebook.com/entreprisexyz",
      "linkedin": "linkedin.com/company/entreprisexyz"
    }
  }
}
```

### Comptes comptables

**Endpoint**: `/accounts`  
**Méthode**: GET  
**Paramètres**: `?page=1&pageSize=20`  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Réponse**:
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "account-uuid-1",
        "code": "401000",
        "name": "Fournisseurs",
        "class": "4",
        "type": "liability",
        "isAnalytic": false
      },
      {
        "id": "account-uuid-2",
        "code": "512000",
        "name": "Banques",
        "class": "5",
        "type": "asset",
        "isAnalytic": false
      }
    ],
    "total": 150,
    "page": 1,
    "pageSize": 20,
    "totalPages": 8
  }
}
```

**Endpoint**: `/accounts/:id`  
**Méthode**: GET  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Réponse**:
```json
{
  "success": true,
  "data": {
    "id": "account-uuid-1",
    "code": "401000",
    "name": "Fournisseurs",
    "class": "4",
    "type": "liability",
    "isAnalytic": false,
    "fiscalYear": {
      "id": "fiscal-year-uuid",
      "code": "FY2023"
    }
  }
}
```

**Endpoint**: `/accounts`  
**Méthode**: POST  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Requête**:
```json
{
  "code": "606100",
  "name": "Achats de fournitures",
  "class": "6",
  "type": "expense",
  "isAnalytic": false,
  "fiscalYearId": "fiscal-year-uuid"
}
```
**Réponse**:
```json
{
  "success": true,
  "data": {
    "id": "new-account-uuid",
    "code": "606100",
    "name": "Achats de fournitures",
    "class": "6",
    "type": "expense",
    "isAnalytic": false,
    "fiscalYear": {
      "id": "fiscal-year-uuid",
      "code": "FY2023"
    }
  }
}
```

**Endpoint**: `/accounts/:id`  
**Méthode**: PUT  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Requête**:
```json
{
  "name": "Achats de fournitures non stockables",
  "isAnalytic": true
}
```
**Réponse**:
```json
{
  "success": true,
  "data": {
    "id": "account-uuid",
    "code": "606100",
    "name": "Achats de fournitures non stockables",
    "class": "6",
    "type": "expense",
    "isAnalytic": true,
    "fiscalYear": {
      "id": "fiscal-year-uuid",
      "code": "FY2023"
    }
  }
}
```

**Endpoint**: `/accounts/:id`  
**Méthode**: DELETE  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Réponse**:
```json
{
  "success": true
}
```

### Écritures de journal

**Endpoint**: `/journal-entries`  
**Méthode**: GET  
**Paramètres**: `?page=1&pageSize=10&startDate=2023-01-01&endDate=2023-06-30&journalType=general&status=draft`  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Réponse**:
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "journal-entry-uuid-1",
        "date": "2023-06-10",
        "journalType": "general",
        "description": "Facture fournisseur ABC",
        "reference": "FAC-2023-001",
        "totalDebit": 1200.00,
        "totalCredit": 1200.00,
        "totalVat": 200.00,
        "status": "draft",
        "source": "manual",
        "lines": [
          {
            "id": "journal-line-uuid-1",
            "accountId": "account-uuid-1",
            "accountCode": "601000",
            "accountName": "Achats de marchandises",
            "debit": 1000.00,
            "credit": 0.00,
            "description": "Achat de marchandises",
            "vatCode": "TVA-18",
            "vatAmount": 180.00
          },
          {
            "id": "journal-line-uuid-2",
            "accountId": "account-uuid-2",
            "accountCode": "445620",
            "accountName": "TVA déductible",
            "debit": 180.00,
            "credit": 0.00,
            "description": "TVA sur achat",
            "vatCode": "TVA-18",
            "vatAmount": 0.00
          },
          {
            "id": "journal-line-uuid-3",
            "accountId": "account-uuid-3",
            "accountCode": "401000",
            "accountName": "Fournisseurs",
            "debit": 0.00,
            "credit": 1180.00,
            "description": "Facture fournisseur ABC"
          }
        ],
        "attachments": [
          {
            "id": "attachment-uuid-1",
            "name": "facture-abc.pdf",
            "url": "https://storage.example.com/attachments/facture-abc.pdf",
            "status": "uploaded"
          }
        ]
      }
    ],
    "total": 45,
    "page": 1,
    "pageSize": 10,
    "totalPages": 5
  }
}
```

**Endpoint**: `/journal-entries/:id`  
**Méthode**: GET  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Réponse**:
```json
{
  "success": true,
  "data": {
    "id": "journal-entry-uuid-1",
    "date": "2023-06-10",
    "journalType": "general",
    "description": "Facture fournisseur ABC",
    "reference": "FAC-2023-001",
    "totalDebit": 1200.00,
    "totalCredit": 1200.00,
    "totalVat": 200.00,
    "status": "draft",
    "source": "manual",
    "lines": [
      {
        "id": "journal-line-uuid-1",
        "accountId": "account-uuid-1",
        "accountCode": "601000",
        "accountName": "Achats de marchandises",
        "debit": 1000.00,
        "credit": 0.00,
        "description": "Achat de marchandises",
        "vatCode": "TVA-18",
        "vatAmount": 180.00
      },
      {
        "id": "journal-line-uuid-2",
        "accountId": "account-uuid-2",
        "accountCode": "445620",
        "accountName": "TVA déductible",
        "debit": 180.00,
        "credit": 0.00,
        "description": "TVA sur achat",
        "vatCode": "TVA-18",
        "vatAmount": 0.00
      },
      {
        "id": "journal-line-uuid-3",
        "accountId": "account-uuid-3",
        "accountCode": "401000",
        "accountName": "Fournisseurs",
        "debit": 0.00,
        "credit": 1180.00,
        "description": "Facture fournisseur ABC"
      }
    ],
    "attachments": [
      {
        "id": "attachment-uuid-1",
        "name": "facture-abc.pdf",
        "url": "https://storage.example.com/attachments/facture-abc.pdf",
        "status": "uploaded"
      }
    ],
    "fiscalYear": {
      "id": "fiscal-year-uuid",
      "code": "FY2023"
    }
  }
}
```

**Endpoint**: `/journal-entries`  
**Méthode**: POST  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Requête**:
```json
{
  "date": "2023-06-11",
  "journalType": "sales",
  "description": "Facture client XYZ",
  "reference": "FC-2023-001",
  "totalDebit": 590.00,
  "totalCredit": 590.00,
  "totalVat": 90.00,
  "status": "draft",
  "lines": [
    {
      "accountId": "account-uuid-4",
      "accountCode": "411000",
      "accountName": "Clients",
      "debit": 590.00,
      "credit": 0.00,
      "description": "Facture client XYZ"
    },
    {
      "accountId": "account-uuid-5",
      "accountCode": "707000",
      "accountName": "Ventes de marchandises",
      "debit": 0.00,
      "credit": 500.00,
      "description": "Vente de marchandises",
      "vatCode": "TVA-18",
      "vatAmount": 90.00
    },
    {
      "accountId": "account-uuid-6",
      "accountCode": "445710",
      "accountName": "TVA collectée",
      "debit": 0.00,
      "credit": 90.00,
      "description": "TVA sur vente",
      "vatCode": "TVA-18",
      "vatAmount": 0.00
    }
  ],
  "attachments": [
    {
      "name": "facture-xyz.pdf",
      "url": "https://storage.example.com/attachments/facture-xyz.pdf",
      "status": "uploaded"
    }
  ],
  "fiscalYearId": "fiscal-year-uuid"
}
```
**Réponse**:
```json
{
  "success": true,
  "data": {
    "id": "new-journal-entry-uuid",
    "date": "2023-06-11",
    "journalType": "sales",
    "description": "Facture client XYZ",
    "reference": "FC-2023-001",
    "totalDebit": 590.00,
    "totalCredit": 590.00,
    "totalVat": 90.00,
    "status": "draft",
    "lines": [
      {
        "id": "new-journal-line-uuid-1",
        "accountId": "account-uuid-4",
        "accountCode": "411000",
        "accountName": "Clients",
        "debit": 590.00,
        "credit": 0.00,
        "description": "Facture client XYZ"
      },
      {
        "id": "new-journal-line-uuid-2",
        "accountCode": "707000",
        "accountName": "Ventes de marchandises",
        "debit": 0.00,
        "credit": 500.00,
        "description": "Vente de marchandises",
        "vatCode": "TVA-18",
        "vatAmount": 90.00
      },
      {
        "id": "new-journal-line-uuid-3",
        "accountCode": "445710",
        "accountName": "TVA collectée",
        "debit": 0.00,
        "credit": 90.00,
        "description": "TVA sur vente",
        "vatCode": "TVA-18",
        "vatAmount": 0.00
      }
    ],
    "attachments": [
      {
        "id": "new-attachment-uuid",
        "name": "facture-xyz.pdf",
        "url": "https://storage.example.com/attachments/facture-xyz.pdf",
        "status": "uploaded"
      }
    ],
    "fiscalYear": {
      "id": "fiscal-year-uuid",
      "code": "FY2023"
    }
  }
}
```

### Grand livre (Ledger)

**Endpoint**: `/ledger/trial-balance`  
**Méthode**: GET  
**Paramètres**: 
- `date`: Date à laquelle générer la balance (format YYYY-MM-DD)
- `mode`: Système comptable utilisé (`SYSCOHADA` ou `IFRS`), par défaut `SYSCOHADA`
- `currency`: Code de la devise (par défaut la devise de l'organisation)
**Headers**: `Authorization: Bearer jwt-token-here`  
**Réponse**:
```json
{
  "success": true,
  "data": [
    {
      "account": {
        "id": "account-uuid-1",
        "code": "101000",
        "name": "Capital social",
        "type": "equity"
      },
      "debit": 0.00,
      "credit": 10000000.00,
      "balance": -10000000.00
    },
    {
      "account": {
        "id": "account-uuid-2",
        "code": "401000",
        "name": "Fournisseurs",
        "type": "liability"
      },
      "debit": 5000000.00,
      "credit": 8500000.00,
      "balance": -3500000.00
    },
    {
      "account": {
        "id": "account-uuid-3",
        "code": "411000",
        "name": "Clients",
        "type": "asset"
      },
      "debit": 12000000.00,
      "credit": 9000000.00,
      "balance": 3000000.00
    }
  ]
}
```

**Endpoint**: `/ledger/accounts/:id/movements`  
**Méthode**: GET  
**Paramètres**: `?startDate=2023-01-01&endDate=2023-06-30&page=1&pageSize=20`  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Réponse**:
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "journal-entry-uuid-1",
        "date": "2023-06-10",
        "description": "Facture fournisseur ABC",
        "reference": "FAC-2023-001",
        "debit": 0.00,
        "credit": 1180.00,
        "balance": -1180.00
      },
      {
        "id": "journal-entry-uuid-2",
        "date": "2023-06-15",
        "description": "Règlement fournisseur ABC",
        "reference": "CHQ-2023-005",
        "debit": 1180.00,
        "credit": 0.00,
        "balance": 0.00
      }
    ],
    "total": 12,
    "page": 1,
    "pageSize": 20,
    "totalPages": 1
  }
}
```

### Années fiscales

**Endpoint**: `/fiscal-years`  
**Méthode**: GET  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Réponse**:
```json
{
  "success": true,
  "data": [
    {
      "id": "fiscal-year-uuid-1",
      "startDate": "2023-01-01",
      "endDate": "2023-12-31",
      "status": "open",
      "code": "FY2023",
      "auditStatus": null
    },
    {
      "id": "fiscal-year-uuid-2",
      "startDate": "2022-01-01",
      "endDate": "2022-12-31",
      "status": "closed",
      "code": "FY2022",
      "auditStatus": {
        "isAudited": true,
        "auditor": {
          "name": "Cabinet Audit XYZ",
          "registrationNumber": "AUD-2022-123"
        },
        "auditedAt": "2023-03-15"
      }
    }
  ]
}
```

**Endpoint**: `/fiscal-years/:id/close`  
**Méthode**: PUT  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Réponse**:
```json
{
  "success": true,
  "data": {
    "id": "fiscal-year-uuid-1",
    "startDate": "2023-01-01",
    "endDate": "2023-12-31",
    "status": "closed",
    "code": "FY2023",
    "auditStatus": null
  }
}
```

### Déclarations fiscales

**Endpoint**: `/declarations`  
**Méthode**: GET  
**Paramètres**: `?page=1&pageSize=10`  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Réponse**:
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "declaration-uuid-1",
        "type": "TVA",
        "period": "2023-05",
        "periodicity": "monthly",
        "dueDate": "2023-06-15",
        "status": "pending",
        "amount": 120000.00,
        "submittedAt": null,
        "submittedBy": null,
        "reference": null,
        "attachments": []
      },
      {
        "id": "declaration-uuid-2",
        "type": "IPR",
        "period": "2023-05",
        "periodicity": "monthly",
        "dueDate": "2023-06-15",
        "status": "submitted",
        "amount": 85000.00,
        "submittedAt": "2023-06-10T09:15:30Z",
        "submittedBy": "user-uuid",
        "reference": "IPR-2023-05-001",
        "attachments": [
          "https://storage.example.com/declarations/ipr-may2023.pdf"
        ]
      }
    ],
    "total": 24,
    "page": 1,
    "pageSize": 10,
    "totalPages": 3
  }
}
```

**Endpoint**: `/declarations/:id/submit`  
**Méthode**: POST  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Requête**:
```json
{
  "reference": "TVA-2023-05-002",
  "attachments": [
    "https://storage.example.com/declarations/tva-may2023.pdf"
  ]
}
```
**Réponse**:
```json
{
  "success": true,
  "data": {
    "id": "declaration-uuid-1",
    "type": "TVA",
    "period": "2023-05",
    "periodicity": "monthly",
    "dueDate": "2023-06-15",
    "status": "submitted",
    "amount": 120000.00,
    "submittedAt": "2023-06-11T14:30:45Z",
    "submittedBy": "user-uuid",
    "reference": "TVA-2023-05-002",
    "attachments": [
      "https://storage.example.com/declarations/tva-may2023.pdf"
    ]
  }
}
```

### Rapports financiers

**Endpoint**: `/reports/balance-sheet`  
**Méthode**: GET  
**Paramètres**: 
- `date`: Date du bilan (format YYYY-MM-DD)
- `comparative`: Booléen indiquant si le rapport doit inclure des données comparatives (période précédente)
- `currency`: Code de la devise pour le rapport (ex: `CDF`, `USD`)
- `mode`: Système comptable utilisé (`SYSCOHADA` ou `IFRS`), par défaut `SYSCOHADA`
**Headers**: `Authorization: Bearer jwt-token-here`  
**Réponse**:
```json
{
  "success": true,
  "data": {
    "asOf": "2023-06-30",
    "currency": "CDF",
    "mode": "SYSCOHADA",
    "comparative": true,
    "assets": {
      "current": {
        "items": [
          {            "code": "2",
            "name": "Immobilisations",
            "amount": 50000000.00,
            "previousAmount": 45000000.00
          }
        ],        "total": 50000000.00,
        "previousTotal": 45000000.00
      },
      "total": 50000000.00,
      "previousTotal": 45000000.00
    },
    "liabilities": {
      "current": {
        "items": [
          {
            "code": "40",
            "name": "Fournisseurs",
            "amount": 12000000.00,
            "previousAmount": 10000000.00
          }
        ],
        "total": 12000000.00,
        "previousTotal": 10000000.00
      },
      "nonCurrent": {
        "items": [
          {
            "code": "16",
            "name": "Emprunts",
            "amount": 25000000.00,
            "previousAmount": 30000000.00
          }
        ],
        "total": 25000000.00,
        "previousTotal": 30000000.00
      },
      "equity": {
        "items": [
          {
            "code": "10",
            "name": "Capital",
            "amount": 30000000.00,
            "previousAmount": 30000000.00
          },
          {
            "code": "12",
            "name": "Résultat",
            "amount": 16000000.00,
            "previousAmount": 2000000.00
          }
        ],        "total": 46000000.00,
        "previousTotal": 32000000.00
      },
      "total": 50000000.00,
      "previousTotal": 45000000.00
    }
  }
}
```

**Endpoint**: `/reports/generate`  
**Méthode**: POST  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Requête**:
```json
{
  "type": "balance-sheet",
  "format": "pdf",
  "date": "2023-06-30",
  "comparative": true,
  "currency": "CDF",
  "mode": "SYSCOHADA",
  "includeNotes": true
}
```
**Réponse**: Fichier PDF en binaire

### Audit

**Endpoint**: `/audit/request-token`  
**Méthode**: POST  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Requête**:
```json
{
  "name": "Cabinet Audit ABC",
  "registrationNumber": "AUD-2023-456"
}
```
**Réponse**:
```json
{
  "success": true,
  "message": "Un token a été envoyé à l'auditeur",
  "data": {
    "expiresAt": "2023-06-12T14:30:45Z"
  }
}
```

**Endpoint**: `/audit/validate-token`  
**Méthode**: POST  
**Requête**:
```json
{
  "token": "123456"
}
```
**Réponse**:
```json
{
  "success": true,
  "message": "Token validé avec succès",
  "data": {
    "valid": true,
    "auditor": {
      "name": "Cabinet Audit ABC",
      "registrationNumber": "AUD-2023-456"
    }
  }
}
```

## Gestion des erreurs

Les réponses d'erreur suivent un format standard:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Des erreurs de validation ont été détectées",
    "details": [
      {
        "field": "totalDebit",
        "message": "Le total des débits doit être égal au total des crédits"
      }
    ]
  }
}
```

Codes d'erreur communs:
- `VALIDATION_ERROR`: Erreur de validation des données
- `NOT_FOUND`: Ressource non trouvée
- `UNAUTHORIZED`: Authentification requise
- `FORBIDDEN`: Action non autorisée
- `CONFLICT`: Conflit (ex: code de compte déjà existant)
- `BAD_REQUEST`: Requête mal formée
- `INTERNAL_ERROR`: Erreur interne du serveur

## Stratégie d'optimisation

### Chargement partiel et pagination
Toutes les API qui retournent des collections importantes doivent prendre en charge la pagination avec les paramètres `page` et `pageSize`.

### Mise en cache
Le backend doit implémenter des stratégies de mise en cache appropriées:
- Cache HTTP standard avec en-têtes `ETag` et `Cache-Control`
- Cache des données fréquemment accédées côté serveur
- Instructions pour le frontend sur les données pouvant être cachées localement


## Considérations pour l'IndexedDB

Le backend doit fournir des mécanismes de synchronisation efficaces qui respectent les contraintes de l'IndexedDB:

1. **Structure des objets** - Maintenir une structure cohérente entre le backend et IndexedDB
2. **Gestion des identifiants** - Supporter le mappage entre identifiants temporaires locaux et identifiants permanents du serveur
3. **Conflits de fusion** - Implémenter des stratégies de résolution de conflits claires
4. **Suivi des modifications** - Utiliser des timestamps ou des numéros de version pour détecter les changements

## Conclusion

Cette documentation fournit les informations essentielles pour développer un backend NestJS/TypeORM compatible avec le frontend Wanzo Comptabilité. En suivant ces directives, vous pourrez créer une API robuste et conforme aux besoins de l'application, tout en respectant les bonnes pratiques de développement, les principes comptables et en optimisant la synchronisation avec IndexedDB.

Pour toute question ou clarification, n'hésitez pas à contacter l'équipe de développement frontend.

## Paramètres utilisateur et configuration

### Configuration du système comptable

**Endpoint**: `/settings/accounting`  
**Méthode**: GET  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Réponse**:
```json
{
  "success": true,
  "data": {
    "accountingMode": "SYSCOHADA",
    "defaultCurrency": "CDF",
    "defaultDepreciationMethod": "linear",
    "defaultVatRate": "18",
    "journalEntryValidation": "auto"
  }
}
```

**Endpoint**: `/settings/accounting`  
**Méthode**: PUT  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Requête**:
```json
{
  "accountingMode": "IFRS",
  "defaultCurrency": "USD",
  "defaultDepreciationMethod": "degressive",
  "defaultVatRate": "16",
  "journalEntryValidation": "manual"
}
```
**Réponse**:
```json
{
  "success": true,
  "data": {
    "accountingMode": "IFRS",
    "defaultCurrency": "USD",
    "defaultDepreciationMethod": "degressive",
    "defaultVatRate": "16",
    "journalEntryValidation": "manual"
  }
}
```

### Devises supportées

**Endpoint**: `/settings/currencies`  
**Méthode**: GET  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Réponse**:
```json
{
  "success": true,
  "data": [
    {
      "code": "CDF",
      "name": "Franc Congolais",
      "symbol": "FC",
      "isDefault": true,
      "exchangeRate": 1
    },
    {
      "code": "USD",
      "name": "Dollar américain",
      "symbol": "$",
      "isDefault": false,
      "exchangeRate": 0.0005
    },
    {
      "code": "EUR",
      "name": "Euro",
      "symbol": "€",
      "isDefault": false,
      "exchangeRate": 0.00045
    }
  ]
}
```

**Endpoint**: `/settings/currencies/default`  
**Méthode**: PUT  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Requête**:
```json
{
  "currencyCode": "USD"
}
```
**Réponse**:
```json
{
  "success": true,
  "data": {
    "code": "USD",
    "name": "Dollar américain",
    "symbol": "$",
    "isDefault": true,
    "exchangeRate": 0.0005
  }
}
```

**Endpoint**: `/settings/currencies/exchange-rates`  
**Méthode**: PUT  
**Headers**: `Authorization: Bearer jwt-token-here`  
**Requête**:
```json
{
  "rates": [
    {
      "currencyCode": "USD",
      "exchangeRate": 0.00048
    },
    {
      "currencyCode": "EUR",
      "exchangeRate": 0.00042
    }
  ]
}
```
**Réponse**:
```json
{
  "success": true,
  "data": [
    {
      "code": "USD",
      "name": "Dollar américain",
      "symbol": "$",
      "isDefault": true,
      "exchangeRate": 0.00048
    },
    {
      "code": "EUR",
      "name": "Euro",
      "symbol": "€",
      "isDefault": false,
      "exchangeRate": 0.00042
    }
  ]
}
```

## Types et constantes

### Types de systèmes comptables

```typescript
type AccountingMode = 'SYSCOHADA' | 'IFRS';
```

### Devises supportées

```typescript
export const CURRENCIES = {
  CDF: {
    code: 'CDF',
    name: 'Franc Congolais',
    symbol: 'FC',
    default: true
  },
  USD: {
    code: 'USD',
    name: 'Dollar américain',
    symbol: '$',
    default: false
  }
};

export type CurrencyCode = keyof typeof CURRENCIES;
```

### Formatage des devises

```typescript
// Formatage standard
function formatCurrency(amount: number, currency: CurrencyCode = 'CDF'): string {
  return new Intl.NumberFormat('fr-CD', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

// Formatage compact (ex: 1.5M FC)
function formatCompactCurrency(amount: number, currency: CurrencyCode = 'CDF'): string {
  const millions = amount / 1000000;
  return `${millions.toFixed(1)}M ${CURRENCIES[currency].symbol}`;
}
```