import { Select } from './Form';
import { CURRENCIES, CurrencyCode } from '../../config/currency';
import { useCurrencyStore } from '../../stores/currencyStore';

interface CurrencySelectorProps {
  value: CurrencyCode;
  onChange: (currency: CurrencyCode) => void;
  showRateInfo?: boolean;
  className?: string;
}

export function CurrencySelector({ value, onChange, showRateInfo = true, className = '' }: CurrencySelectorProps) {  const { baseCurrency, exchangeRates } = useCurrencyStore();
  
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as CurrencyCode);
  };
  
  // Vérifier si le taux de change est configuré pour la devise sélectionnée
  const isRateConfigured = value === baseCurrency || (exchangeRates[value] && exchangeRates[value] > 0);
  
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Devise:</label>
        <Select
          value={value}
          onChange={handleChange}
          options={Object.values(CURRENCIES).map(currency => ({
            value: currency.code,
            label: `${currency.name} (${currency.symbol})`
          }))}
          className="w-44"
        />
      </div>
      
      {showRateInfo && value !== baseCurrency && (
        <div className="mt-1 text-xs">
          {isRateConfigured ? (
            <span className="text-gray-600">
              Taux: 1 {CURRENCIES[baseCurrency].symbol} = {exchangeRates[value]} {CURRENCIES[value].symbol}
            </span>
          ) : (
            <span className="text-orange-500">
              Taux de conversion non configuré. Rendez-vous dans Paramètres &gt; Général.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
