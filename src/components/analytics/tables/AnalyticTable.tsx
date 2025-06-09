import React, { useState } from 'react';
import { Table } from '../../ui/Table';
import { FormField, Input, Select } from '../../ui/Form';
import { Button } from '../../ui/Button';
import { Download, Search } from 'lucide-react';
import type { AnalyticData } from '../../../types/analytics';
import { useReportActions } from '../../../hooks/useReportActions';

interface AnalyticTableProps {
  data: AnalyticData[];
  title: string;
  type: 'sales' | 'expenses';
}

export function AnalyticTable({ data, title, type }: AnalyticTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { handleDownload } = useReportActions();

  const categories = Array.from(new Set(data.map(item => item.category)));
  
  const filteredData = data.filter(item => {
    const matchesSearch = 
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reference?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const columns = [
    {
      header: 'Date',
      accessor: (item: AnalyticData) => new Date(item.date).toLocaleDateString('fr-FR')
    },
    {
      header: 'Référence',
      accessor: 'reference'
    },
    {
      header: 'Catégorie',
      accessor: 'category'
    },
    {
      header: 'Sous-catégorie',
      accessor: 'subcategory'
    },
    {
      header: 'Description',
      accessor: 'description'
    },
    {
      header: 'Montant',
      accessor: (item: AnalyticData) => item.amount.toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'XOF'
      }),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={() => handleDownload('excel', filteredData)}
          >
            Exporter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField label="Rechercher">
          <Input
            icon={Search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher..."
          />
        </FormField>

        <FormField label="Catégorie">
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            options={[
              { value: '', label: 'Toutes les catégories' },
              ...categories.map(cat => ({
                value: cat,
                label: cat
              }))
            ]}
          />
        </FormField>
      </div>

      <Table
        columns={columns}
        data={filteredData}
        emptyMessage="Aucune donnée trouvée"
      />
    </div>
  );
}