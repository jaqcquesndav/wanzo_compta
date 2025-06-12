import { useState } from 'react';
import { Table } from '../../ui/Table';
import { FormField, Input, Select } from '../../ui/Form';
import { Button } from '../../ui/Button';
import { Download, Search } from 'lucide-react';
import type { AnalyticData } from '../../../types/analytics';
import { useReportActions } from '../../../hooks/useReportActions';
import { useCurrency } from '../../../hooks/useCurrency';

interface AnalyticTableProps {
  data: AnalyticData[];
  title: string;
}

export function AnalyticTable({ data, title }: AnalyticTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { handleDownload } = useReportActions();
  const { formatConverted } = useCurrency();

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
      accessor: (item: AnalyticData) => item.reference
    },
    {
      header: 'Catégorie',
      accessor: (item: AnalyticData) => item.category
    },
    {
      header: 'Sous-catégorie',
      accessor: (item: AnalyticData) => item.subcategory
    },
    {
      header: 'Description',
      accessor: (item: AnalyticData) => item.description
    },
    {
      header: 'Montant',
      accessor: (item: AnalyticData) => formatConverted(item.amount),
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
          >
            <option value="">Toutes les catégories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Select>
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