import { SYSCOHADA_ACCOUNTS } from '../../accounts/constants';

export type AccountNature = 'debit' | 'credit';

// Détermine la nature normale d'un compte (débiteur ou créditeur)
export function getAccountNature(accountCode: string): AccountNature {
  const classNumber = accountCode.charAt(0);
  
  switch (classNumber) {
    // Actifs (Classes 2, 3, 5) : Nature débitrice
    case '2':
    case '3':
    case '5':
      return 'debit';
    
    // Passifs (Classes 1, 4) : Nature créditrice
    case '1':
    case '4':
      // Exception pour les comptes clients (41) qui sont débiteurs
      if (accountCode.startsWith('41')) return 'debit';
      return 'credit';
    
    // Charges (Classe 6) : Nature débitrice
    case '6':
      return 'debit';
    
    // Produits (Classe 7) : Nature créditrice
    case '7':
      return 'credit';
    
    // Par défaut
    default:
      return 'debit';
  }
}

// Détermine si un montant doit être placé en débit ou crédit selon le type d'opération
export function determineEntryType(
  accountCode: string,
  isIncrease: boolean
): 'debit' | 'credit' {
  const nature = getAccountNature(accountCode);
  
  // Si c'est une augmentation, on suit la nature du compte
  // Si c'est une diminution, on fait l'inverse
  return isIncrease 
    ? nature
    : nature === 'debit' ? 'credit' : 'debit';
}

// Suggère une contrepartie basée sur le type de journal et le compte principal
export function suggestCounterpart(
  journalType: string,
  mainAccountCode: string
): string | null {
  switch (journalType) {
    case 'BANK':
      return '521000'; // Compte bancaire par défaut
    
    case 'CASH':
      return '571000'; // Caisse
    
    case 'PURCHASE':
      if (mainAccountCode.startsWith('6')) {
        return '401000'; // Fournisseurs
      }
      return null;
    
    case 'SALES':
      if (mainAccountCode.startsWith('7')) {
        return '411000'; // Clients
      }
      return null;
    
    default:
      return null;
  }
}