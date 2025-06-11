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
      <span className="text-sm text-gray-600 mr-2">Devise:</span>
      <Select
        value={currentCurrency}
        onChange={handleCurrencyChange}
        options={Object.values(CURRENCIES).map(currency => ({
          value: currency.code,
          label: `${currency.symbol}`
        }))}
        className="w-24"
      />
      {currentCurrency !== baseCurrency && (
        <span className="text-xs text-gray-500 ml-2">
          (Conversion basée sur les taux configurés)
        </span>
      )}
    </div>
  );
}
