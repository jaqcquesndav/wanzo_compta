import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { useFiscalYearStore } from '../../stores/fiscalYearStore';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export function FiscalYearBanner() {
  const { currentFiscalYear } = useFiscalYearStore();
  const navigate = useNavigate();

  const formatPeriod = (fiscalYear: typeof currentFiscalYear) => {
    if (!fiscalYear) return '';
    const start = new Date(fiscalYear.startDate);
    const end = new Date(fiscalYear.endDate);
    return `${start.toLocaleDateString('fr-FR')} - ${end.toLocaleDateString('fr-FR')}`;
  };

  return (
    <div className="bg-primary/5 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Calendar className="h-5 w-5 text-primary" />
          <div>
            <h2 className="text-sm font-medium text-gray-900">
              {currentFiscalYear 
                ? `Exercice en cours: ${currentFiscalYear.code}`
                : "Aucun exercice sélectionné"}
            </h2>
            {currentFiscalYear && (
              <p className="text-sm text-gray-500">
                {formatPeriod(currentFiscalYear)}
              </p>
            )}
          </div>
        </div>
        
        {!currentFiscalYear && (
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-warning mr-2" />
            <Button
              variant="warning"
              onClick={() => navigate('/fiscal-years')}
            >
              Sélectionner un exercice
            </Button>
          </div>
        )}
        
        {currentFiscalYear?.status === 'open' && (
          <div className="flex items-center text-warning">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="text-sm">Exercice ouvert</span>
          </div>
        )}
      </div>
    </div>
  );
}