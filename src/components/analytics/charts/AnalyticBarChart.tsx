import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../../utils/currency';

interface AnalyticBarChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  color?: string;
}

export function AnalyticBarChart({ data, color = '#197ca8' }: AnalyticBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="name"
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
          tick={{ fontSize: 12 }}
        />
        <Tooltip 
          formatter={(value: number) => [
            formatCurrency(value, 'XOF'),
            'Montant'
          ]}
        />
        <Bar 
          dataKey="value" 
          fill={color} 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}