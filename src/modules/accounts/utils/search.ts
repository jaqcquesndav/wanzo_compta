import { SYSCOHADA_ACCOUNTS } from '../constants';
import type { Account, AccountSearchResult } from '../types';

export function searchAccounts(term: string): AccountSearchResult[] {
  if (!term || term.length < 2) return [];

  const searchTerm = term.toLowerCase();
  const results: AccountSearchResult[] = [];

  Object.entries(SYSCOHADA_ACCOUNTS).forEach(([classKey, classData]) => {
    Object.entries(classData.accounts).forEach(([code, name]) => {
      const matchesCode = code.includes(searchTerm);
      const matchesName = name.toLowerCase().includes(searchTerm);

      if (matchesCode || matchesName) {
        const account: Account = {
          id: code,
          code,
          name,
          class: classKey as keyof typeof SYSCOHADA_ACCOUNTS,
          type: getAccountType(code)
        };

        results.push({
          account,
          matchType: matchesCode && matchesName ? 'both' : matchesCode ? 'code' : 'name',
          relevance: calculateRelevance(searchTerm, code, name)
        });
      }
    });
  });

  return results.sort((a, b) => b.relevance - a.relevance);
}

function getAccountType(code: string): Account['type'] {
  const firstDigit = code.charAt(0);
  switch (firstDigit) {
    case '1': return 'equity';
    case '2': return 'asset';
    case '3': return 'asset';
    case '4': return code.startsWith('41') ? 'asset' : 'liability';
    case '5': return 'asset';
    case '6': return 'expense';
    case '7': return 'revenue';
    default: return 'asset';
  }
}

function calculateRelevance(term: string, code: string, name: string): number {
  let score = 0;
  
  // Exact code match gets highest priority
  if (code === term) score += 100;
  // Code starts with term
  else if (code.startsWith(term)) score += 75;
  // Code contains term
  else if (code.includes(term)) score += 50;
  
  // Name exact match
  if (name.toLowerCase() === term) score += 50;
  // Name starts with term
  else if (name.toLowerCase().startsWith(term)) score += 25;
  // Name contains term
  else if (name.toLowerCase().includes(term)) score += 10;

  return score;
}