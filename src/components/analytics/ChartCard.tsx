import React from 'react';
import { Card } from '../ui/Card';
import { LucideIcon } from 'lucide-react';

interface ChartCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  filters?: React.ReactNode;
}

export function ChartCard({ title, icon: Icon, children, filters }: ChartCardProps) {
  return (
    <Card 
      title={title} 
      icon={Icon}
      className="h-full"
    >
      {filters && (
        <div className="mb-4 pb-4 border-b border-gray-200">
          {filters}
        </div>
      )}
      <div className="h-[300px]">
        {children}
      </div>
    </Card>
  );
}