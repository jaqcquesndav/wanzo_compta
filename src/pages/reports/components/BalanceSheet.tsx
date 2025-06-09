import React from 'react';
import { FinancialStatementCard } from '../../../components/reports/FinancialStatementCard';

export function BalanceSheet() {
  const handleGenerate = () => {
    // TODO: Implement balance sheet generation
    console.log('Generating balance sheet...');
  };

  const handleDownload = () => {
    // TODO: Implement balance sheet download
    console.log('Downloading balance sheet...');
  };

  return (
    <FinancialStatementCard
      title="Bilan"
      description="État de la situation financière présentant l'actif, le passif et les capitaux propres."
      lastGenerated="01/03/2024 15:30"
      onGenerate={handleGenerate}
      onDownload={handleDownload}
    />
  );
}