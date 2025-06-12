import React, { useState, useEffect } from 'react';
import { FormField, Select, Input } from '../../../components/ui/Form';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { CURRENCIES, CurrencyCode } from '../../../config/currency';
import { useCurrencyStore } from '../../../stores/currencyStore';

export function GeneralSettings() {
  const { 
    baseCurrency, 
    displayCurrency, 
    exchangeRates, 
    setDisplayCurrency, 
    setExchangeRate 
  } = useCurrencyStore();
  
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(displayCurrency);
  const [exchangeRate, setExchangeRateValue] = useState<string>('');
  
  // Mettre à jour le taux de change affiché lorsque la devise sélectionnée change
  useEffect(() => {
    const rate = exchangeRates[selectedCurrency];
    setExchangeRateValue(rate ? rate.toString() : '');
  }, [selectedCurrency, exchangeRates]);
  
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currencyCode = e.target.value as CurrencyCode;
    setSelectedCurrency(currencyCode);
    setDisplayCurrency(currencyCode);
  };
  
  const handleExchangeRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExchangeRateValue(e.target.value);
  };
  
  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sauvegarder le taux de change pour la devise sélectionnée
    if (selectedCurrency !== baseCurrency && exchangeRate) {
      const rate = parseFloat(exchangeRate);
      if (!isNaN(rate) && rate > 0) {
        setExchangeRate(selectedCurrency, rate);
      }
    }
    
    // Afficher une notification de succès
    alert('Préférences enregistrées avec succès');
  };
  return (
    <div className="space-y-6">
      <Card title="Préférences générales">
        <form className="space-y-6" onSubmit={handleSavePreferences}>
          <div className="grid grid-cols-2 gap-6">
            <FormField label="Langue par défaut">
              <Select>
                <option value="fr">Français</option>
                <option value="en">English</option>
              </Select>
            </FormField>

            <FormField label="Fuseau horaire">
              <Select>
                <option value="CAT">CAT (UTC+2)</option>
              </Select>
            </FormField>

            <FormField label="Format de date">
              <Select>
                <option value="DD/MM/YYYY">JJ/MM/AAAA</option>
                <option value="YYYY-MM-DD">AAAA-MM-JJ</option>
              </Select>
            </FormField>

            <FormField label="Devise par défaut">
              <Select
                value={selectedCurrency}
                onChange={handleCurrencyChange}
              >
                {Object.values(CURRENCIES).map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.name} ({currency.symbol})
                  </option>
                ))}
              </Select>
            </FormField>
            
            {selectedCurrency !== baseCurrency && (
              <FormField 
                label={`Taux de conversion (1 ${CURRENCIES[baseCurrency].symbol} = ? ${CURRENCIES[selectedCurrency].symbol})`}
              >
                <div className="col-span-2">
                  <Input
                    type="number"
                    step="0.000001"
                    min="0.000001"
                    value={exchangeRate}
                    onChange={handleExchangeRateChange}
                    placeholder="Taux de conversion"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Entrez le taux de conversion entre la devise de base et la devise sélectionnée
                  </p>
                </div>
              </FormField>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              Enregistrer les préférences
            </Button>
          </div>
        </form>
      </Card>
      
      <Card title="Gestion des taux de conversion">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Devise de base: <strong>{CURRENCIES[baseCurrency].name} ({CURRENCIES[baseCurrency].symbol})</strong>
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Taux de conversion actuels</h3>
            <div className="space-y-2">
              {Object.entries(exchangeRates)
                .filter(([code]) => code !== baseCurrency)
                .map(([code, rate]) => (
                  <div key={code} className="flex justify-between">
                    <span>{CURRENCIES[code as CurrencyCode].name}</span>
                    <span className="font-medium">
                      {rate ? `1 ${CURRENCIES[baseCurrency].symbol} = ${rate} ${CURRENCIES[code as CurrencyCode].symbol}` : 'Non configuré'}
                    </span>
                  </div>
                ))
              }
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>Les taux de conversion sont utilisés pour convertir les montants entre différentes devises lors de la génération des rapports financiers.</p>
            <p className="mt-1">Assurez-vous de mettre à jour régulièrement ces taux pour refléter les valeurs actuelles du marché.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}