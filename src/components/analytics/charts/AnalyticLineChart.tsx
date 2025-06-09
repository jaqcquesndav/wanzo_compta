import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../../utils/currency';

interface AnalyticLineChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  color?: string;
}

export function AnalyticLineChart({ data, color = '#197ca8' }: AnalyticLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}