import React from 'react';
import { BankIntegration } from './integrations/BankIntegration';
import { EInvoiceIntegration } from './integrations/EInvoiceIntegration';
import { TaxIntegration } from './integrations/TaxIntegration';
import { PortfolioIntegration } from './integrations/PortfolioIntegration';

export function IntegrationSettings() {
  return (
    <div className="space-y-6">
      <BankIntegration />
      <EInvoiceIntegration />
      <TaxIntegration />
      <PortfolioIntegration />
    </div>
  );
}