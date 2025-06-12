import { Card } from '../ui/Card';
import { Star, ShieldCheck } from 'lucide-react'; // Using ShieldCheck for financial rating
import { useCurrency } from '../../hooks/useCurrency';

interface KeyPerformanceIndicatorsCardProps {
  creditScore: number;
  financialRating: string;
}

export function KeyPerformanceIndicatorsCard({
  creditScore,
  financialRating,
}: KeyPerformanceIndicatorsCardProps) {
  const { currentCurrency } = useCurrency();
  
  // Determine credit score remark based on a common scale (e.g., out of 850 or 1000)
  // This is a simplified example. Real logic might be more complex.
  let creditScoreRemark = 'Bonne';
  if (creditScore >= 750) creditScoreRemark = 'Excellente';
  else if (creditScore < 650) creditScoreRemark = 'Moyenne';
  if (creditScore < 550) creditScoreRemark = 'Faible';

  return (
    <Card title="Indicateurs de Performance Clés" className="mt-6 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
        <div className="space-y-2">          <div className="flex items-center text-primary">
            <Star className="h-5 w-5 mr-2 flex-shrink-0" />
            <h3 className="text-sm font-medium">Cote de Crédit</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{creditScore}</p>
          <p className="text-xs text-gray-500">{creditScoreRemark} solvabilité</p>
        </div>

        <div className="space-y-2">          <div className="flex items-center text-primary">
            <ShieldCheck className="h-5 w-5 mr-2 flex-shrink-0" />
            <h3 className="text-sm font-medium">Note Financière</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{financialRating}</p>
          <p className="text-xs text-gray-500">Perspective de l'entreprise ({currentCurrency})</p>
        </div>
      </div>
    </Card>
  );
}
