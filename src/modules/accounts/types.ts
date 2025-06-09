```typescript
export interface Account {
  id: string;
  code: string;
  name: string;
  class: keyof typeof import('./constants').SYSCOHADA_ACCOUNTS;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  isAnalytic?: boolean;
}

export interface AccountSearchResult {
  account: Account;
  matchType: 'code' | 'name' | 'both';
  relevance: number;
}
```