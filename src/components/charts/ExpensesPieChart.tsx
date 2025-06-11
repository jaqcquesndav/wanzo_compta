import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useCurrency } from '../../hooks/useCurrency';

interface ExpensesPieChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export function ExpensesPieChart({ data }: ExpensesPieChartProps) {
  const { currentCurrency } = useCurrency();
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => new Intl.NumberFormat('fr-CD', { 
            style: 'currency', 
            currency: currentCurrency,
            maximumFractionDigits: 0
          }).format(value)}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}