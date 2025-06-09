import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalyticsLineChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  dataKey: string;
  color?: string;
}

export function AnalyticsLineChart({ data, dataKey, color = '#197ca8' }: AnalyticsLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis 
          tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
        />
        <Tooltip 
          formatter={(value: number) => [
            new Intl.NumberFormat('fr-FR', { 
              style: 'currency', 
              currency: 'XOF',
              maximumFractionDigits: 0
            }).format(value),
            'Montant'
          ]}
        />
        <Line 
          type="monotone" 
          dataKey={dataKey} 
          stroke={color} 
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}