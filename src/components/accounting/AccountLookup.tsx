import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/Form';
import { SYSCOHADA_ACCOUNTS } from '../../modules/accounts/constants';
import type { Account } from '../../types/accounting';

interface AccountLookupProps {
  value: string;
  onChange: (account: Account) => void;
  onBlur?: () => void;
  className?: string;
  placeholder?: string;
}

export function AccountLookup({ 
  value, 
  onChange, 
  onBlur,
  className = '',
  placeholder = 'Rechercher un compte...'
}: AccountLookupProps) {
  const [searchTerm, setSearchTerm] = useState(value);
  const [suggestions, setSuggestions] = useState<Account[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchAccounts = useCallback((term: string) => {
    if (term.length < 2) return [];

    const results: Account[] = [];
    const searchLower = term.toLowerCase();

    Object.entries(SYSCOHADA_ACCOUNTS).forEach(([classKey, classData]) => {
      Object.entries(classData.accounts).forEach(([code, name]) => {
        if (
          code.includes(searchLower) ||
          name.toLowerCase().includes(searchLower)
        ) {
          results.push({
            id: code,
            code,
            name,
            type: getAccountType(code),
            standard: 'SYSCOHADA',
            isAnalytic: false
          });
        }
      });
    });

    return results.sort((a, b) => {
      // Prioriser les correspondances exactes de code
      if (a.code === term) return -1;
      if (b.code === term) return 1;
      // Ensuite les codes qui commencent par le terme
      if (a.code.startsWith(term) && !b.code.startsWith(term)) return -1;
      if (b.code.startsWith(term) && !a.code.startsWith(term)) return 1;
      // Enfin, trier par code
      return a.code.localeCompare(b.code);
    });
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const results = searchAccounts(searchTerm);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, searchAccounts]);

  const handleSelect = (account: Account) => {
    onChange(account);
    setSearchTerm(account.code);
    setShowSuggestions(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      onBlur?.();
    }, 200);
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        icon={Search}
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border dark:bg-dark-secondary dark:border-dark-DEFAULT max-h-60 overflow-y-auto">
          <ul className="py-1">
            {suggestions.map(account => (
              <li
                key={account.code}
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-dark-hover cursor-pointer"
                onClick={() => handleSelect(account)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm">{account.code}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 truncate ml-4">
                    {account.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
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