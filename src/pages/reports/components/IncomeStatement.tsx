import React from 'react';
import { FinancialStatementCard } from '../../../components/reports/FinancialStatementCard';

export function IncomeStatement() {
  const handleGenerate = () => {
    // TODO: Implement income statement generation
    console.log('Generating income statement...');
  };

  const handleDownload = () => {
    // TODO: Implement income statement download
    console.log('Downloading income statement...');
  };

  return (
    <FinancialStatementCard
      title="Compte de Résultat"
      description="État des produits et charges présentant la performance financière."
      lastGenerated="01/03/2024 15:30"
      onGenerate={handleGenerate}
      onDownload={handleDownload}
    />
  );
}