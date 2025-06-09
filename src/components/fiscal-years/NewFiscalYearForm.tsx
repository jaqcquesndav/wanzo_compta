import React, { useState, useRef } from 'react';
import { FormField, Input } from '../ui/Form';
import { Button } from '../ui/Button';
import { Upload } from 'lucide-react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

interface NewFiscalYearFormProps {
  onSubmit: (data: {
    startDate: string;
    endDate: string;
    code: string;
  }) => Promise<void>;
  onImport: (data: any[]) => Promise<void>;
  onCancel: () => void;
}

export function NewFiscalYearForm({ onSubmit, onImport, onCancel }: NewFiscalYearFormProps) {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    code: ''
  });
  const [loading, setLoading] = useState(false);
  const [importMode, setImportMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      let data: any[] = [];

      if (file.name.endsWith('.xlsx')) {
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        data = XLSX.utils.sheet_to_json(worksheet);
      } else if (file.name.endsWith('.csv')) {
        const text = await file.text();
        const result = Papa.parse(text, { header: true });
        data = result.data;
      }

      if (data.length > 0) {
        await onImport(data);
      }
    } catch (error) {
      console.error('Error importing file:', error);
      alert('Une erreur est survenue lors de l\'import du fichier');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4">
        <Button
          variant={!importMode ? 'primary' : 'secondary'}
          onClick={() => setImportMode(false)}
        >
          Nouvel exercice
        </Button>
        <Button
          variant={importMode ? 'primary' : 'secondary'}
          onClick={() => setImportMode(true)}
        >
          Importer un exercice
        </Button>
      </div>

      {importMode ? (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".xlsx,.csv"
              onChange={handleFileSelect}
            />
            <Button
              variant="secondary"
              icon={Upload}
              onClick={() => fileInputRef.current?.click()}
              isLoading={loading}
            >
              Sélectionner un fichier
            </Button>
            <p className="mt-2 text-sm text-gray-500">
              Formats acceptés : XLSX, CSV
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Date de début" required>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  startDate: e.target.value,
                  code: `EX${new Date(e.target.value).getFullYear()}`
                }))}
                required
              />
            </FormField>

            <FormField label="Date de fin" required>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                required
              />
            </FormField>
          </div>

          <FormField label="Code de l'exercice" required>
            <Input
              value={formData.code}
              onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
              placeholder="EX2024"
              required
            />
          </FormField>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              isLoading={loading}
            >
              Créer l'exercice
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}