import { useState, useCallback } from 'react';
import type { JournalEntry } from '../types/accounting';

export interface JournalFilters {
  search: string;
  journalType: string;
  startDate: string;
  endDate: string;
}

export function useJournalFilters() {
  const [filters, setFilters] = useState<JournalFilters>({
    search: '',
    journalType: 'all',
    startDate: '',
    endDate: ''
  });

  const applyFilters = useCallback((entries: JournalEntry[]): JournalEntry[] => {
    return entries.filter(entry => {
      // Filter by journal type
      if (filters.journalType !== 'all' && entry.journalType !== filters.journalType) {
        return false;
      }

      // Filter by date range
      if (filters.startDate && new Date(entry.date) < new Date(filters.startDate)) {
        return false;
      }
      if (filters.endDate && new Date(entry.date) > new Date(filters.endDate)) {
        return false;
      }

      // Filter by search term
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        return (
          entry.description.toLowerCase().includes(searchTerm) ||
          entry.reference.toLowerCase().includes(searchTerm) ||
          entry.lines.some(line => 
            line.description.toLowerCase().includes(searchTerm) ||
            line.accountId.toLowerCase().includes(searchTerm)
          )
        );
      }

      return true;
    });
  }, [filters]);

  return {
    filters,
    setFilters,
    applyFilters
  };
}