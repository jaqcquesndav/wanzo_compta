import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface CheckItem {
  id: string;
  label: string;
  description: string;
  status: 'pending' | 'success' | 'error';
  message?: string;
}

interface FiscalYearClosingChecklistProps {
  checks: CheckItem[];
}

export function FiscalYearClosingChecklist({ checks }: FiscalYearClosingChecklistProps) {
  return (
    <div className="space-y-4">
      {checks.map(check => (
        <div 
          key={check.id}
          className={`p-4 rounded-lg ${
            check.status === 'success' 
              ? 'bg-success/10'
              : check.status === 'error'
              ? 'bg-red-50'
              : 'bg-gray-50'
          }`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {check.status === 'success' ? (
                <CheckCircle className="h-5 w-5 text-success" />
              ) : check.status === 'error' ? (
                <XCircle className="h-5 w-5 text-red-600" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
              )}
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-gray-900">
                {check.label}
              </h4>
              <p className="mt-1 text-sm text-gray-500">
                {check.description}
              </p>
              {check.message && (
                <p className={`mt-1 text-sm ${
                  check.status === 'error' ? 'text-red-600' : 'text-success'
                }`}>
                  {check.message}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}