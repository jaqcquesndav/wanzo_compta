import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CashFlowChartProps {
  data: Array<{
    date: string;
    inflow: number;
    outflow: number;
  }>;
}

export function CashFlowChart({ data }: CashFlowChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
            new Intl.NumberFormat('fr-FR', { 
              style: 'currency', 
              currency: 'XOF',
              maximumFractionDigits: 0
            }).format(value),
            'Montant'
          ]}
        />
        <Legend />
        <Bar dataKey="inflow" name="Entrées" fill="#015730" radius={[4, 4, 0, 0]} />
        <Bar dataKey="outflow" name="Sorties" fill="#ee872b" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}