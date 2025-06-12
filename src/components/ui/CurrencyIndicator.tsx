import { useCurrency } from '../../hooks/useCurrency';
import { Select } from './Form';
import { CURRENCIES, CurrencyCode } from '../../config/currency';

export function CurrencyIndicator({ className = '' }: { className?: string }) {
  const { currentCurrency, setCurrentCurrency, baseCurrency } = useCurrency();
  
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCurrency(e.target.value as CurrencyCode);
  };
  
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-sm text-text-secondary mr-2">Devise:</span>      <Select
        value={currentCurrency}
        onChange={handleCurrencyChange}
        className="w-24"
      >
        {Object.values(CURRENCIES).map(currency => (
          <option key={currency.code} value={currency.code}>{currency.symbol}</option>
        ))}
      </Select>
      {currentCurrency !== baseCurrency && (
        <span className="text-xs text-text-tertiary ml-2">
          (Conversion basée sur les taux configurés)
        </span>
      )}
    </div>
  );
}
