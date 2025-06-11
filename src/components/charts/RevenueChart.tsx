import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCurrency } from '../../hooks/useCurrency';

interface RevenueChartProps {
  data: Array<{
    date: string;
    revenue: number;
  }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  const { currentCurrency } = useCurrency();
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#197ca8" stopOpacity={0.1}/>
            <stop offset="95%" stopColor="#197ca8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="date" 
          tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { month: 'short' })}
        />
        <YAxis 
          tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
        />
        <Tooltip 
          formatter={(value: number) => [
            new Intl.NumberFormat('fr-CD', { 
              style: 'currency', 
              currency: currentCurrency,
              maximumFractionDigits: 0
            }).format(value),
            'Chiffre d\'affaires'
          ]}
          labelFormatter={(label) => new Date(label).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long'
          })}
        />
        <Area 
          type="monotone" 
          dataKey="revenue" 
          stroke="#197ca8" 
          fillOpacity={1}
          fill="url(#colorRevenue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}