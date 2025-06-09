import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../../utils/currency';

interface ComparisonChartProps {
  data: Array<{
    name: string;
    current: number;
    previous: number;
  }>;
  title: string;
}

export function ComparisonChart({ data, title }: ComparisonChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
        <Tooltip
          formatter={(value: number) => formatCurrency(value, 'XOF')}
          labelFormatter={(label) => `Période: ${label}`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="current"
          name="Période actuelle"
          stroke="#197ca8"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="previous"
          name="Période précédente"
          stroke="#64748b"
          strokeWidth={2}
          dot={{ r: 4 }}
          strokeDasharray="5 5"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}