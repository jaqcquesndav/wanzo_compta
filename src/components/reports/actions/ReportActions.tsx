import React from 'react';
import { Download, Printer, Eye, FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from '../../ui/Button';
import { useReportActions } from '../../../hooks/useReportActions';

interface ReportActionsProps {
  onPreview: () => void;
  data: any;
}

export function ReportActions({ onPreview, data }: ReportActionsProps) {
  const { loading, handlePrint, handleDownload } = useReportActions();

  return (
    <div className="flex space-x-2">
      <div className="relative group">
        <Button 
          variant="secondary" 
          icon={Download}
          isLoading={loading}
        >
          Télécharger
        </Button>
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
          <div className="py-1">
            <button
              onClick={() => handleDownload('pdf', data)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FileText className="h-4 w-4 mr-2" />
              Format PDF
            </button>
            <button
              onClick={() => handleDownload('excel', data)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Format Excel
            </button>
          </div>
        </div>
      </div>

      <Button 
        variant="secondary" 
        icon={Printer}
        onClick={handlePrint}
      >
        Imprimer
      </Button>

      <Button 
        variant="primary" 
        icon={Eye}
        onClick={onPreview}
      >
        Aperçu
      </Button>
    </div>
  );
}