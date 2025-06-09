import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalyticsBarChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  dataKey: string;
  color?: string;
}

export function AnalyticsBarChart({ data, dataKey, color = '#197ca8' }: AnalyticsBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
        <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}