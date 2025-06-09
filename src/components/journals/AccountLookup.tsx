import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/Form';
import { searchAccounts } from '../../modules/accounts/utils/search';
import type { Account, AccountSearchResult } from '../../modules/accounts/types';

interface AccountLookupProps {
  value: string;
  onChange: (account: Account) => void;
  onBlur?: () => void;
  className?: string;
}

export function AccountLookup({ value, onChange, onBlur, className }: AccountLookupProps) {
  const [searchTerm, setSearchTerm] = useState(value || '');
  const [results, setResults] = useState<AccountSearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const searchResults = searchAccounts(searchTerm);
      setResults(searchResults);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [searchTerm]);

  const handleBlur = () => {
    setTimeout(() => {
      setShowResults(false);
      onBlur?.();
    }, 200);
  };

  const handleSelect = (result: AccountSearchResult) => {
    onChange(result.account);
    setSearchTerm(result.account.code);
    setShowResults(false);
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={handleBlur}
        placeholder="Rechercher un compte..."
        icon={Search}
      />
      
      {showResults && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border dark:bg-dark-secondary dark:border-dark-DEFAULT max-h-60 overflow-y-auto">
          <ul className="py-1">
            {results.map(result => (
              <li
                key={result.account.code}
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-dark-hover cursor-pointer"
                onClick={() => handleSelect(result)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm">{result.account.code}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 truncate ml-4">
                    {result.account.name}
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