import { useEffect, useState } from 'react';
import { useCurrency } from './useCurrency';
import { CurrencyCode } from '../config/currency';

interface ConversionOptions {
  showCurrencyInfo?: boolean;
  defaultCurrency?: CurrencyCode;
}

export function useCurrencyConversion(options: ConversionOptions = {}) {  const { 
    currentCurrency, 
    baseCurrency, 
    convertAmount, 
    format, 
    exchangeRates 
  } = useCurrency();
  
  const [showCurrencyInfo, setShowCurrencyInfo] = useState(options.showCurrencyInfo ?? true);
  const [activeCurrency, setActiveCurrency] = useState<CurrencyCode>(
    options.defaultCurrency || currentCurrency
  );
  
  // Mettre à jour la devise active lorsque la devise par défaut change
  useEffect(() => {
    if (!options.defaultCurrency) {
      setActiveCurrency(currentCurrency);
    }
  }, [currentCurrency, options.defaultCurrency]);
  
  // Vérifier si les taux de change sont configurés pour la devise active
  const isCurrencyConfigured = activeCurrency === baseCurrency || 
    (exchangeRates && exchangeRates[activeCurrency] > 0);
  
  // Message d'information sur la conversion
  const currencyInfo = isCurrencyConfigured 
    ? `Montants affichés en ${activeCurrency}` 
    : `Taux de conversion non configuré pour ${activeCurrency}`;
  
  // Formater un montant avec la devise active
  const formatWithActiveCurrency = (amount: number, originalCurrency: CurrencyCode = baseCurrency) => {
    if (!isCurrencyConfigured) {
      return format(amount, originalCurrency);
    }
    
    if (originalCurrency === activeCurrency) {
      return format(amount, activeCurrency);
    }
    
    try {
      const convertedAmount = convertAmount(amount, originalCurrency, activeCurrency);
      return format(convertedAmount, activeCurrency);
    } catch (error) {
      console.error('Erreur lors de la conversion de devise:', error);
      return format(amount, originalCurrency);
    }
  };
  
  return {
    activeCurrency,
    setActiveCurrency,
    baseCurrency,
    isCurrencyConfigured,
    showCurrencyInfo,
    setShowCurrencyInfo,
    currencyInfo,
    formatWithActiveCurrency
  };
}
