import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { useReportActions } from '../../../hooks/useReportActions';
import type { AnalyticData } from '../../../types/analytics';

interface AnalyticExportButtonProps {
  data: AnalyticData[];
  filename: string;
}

export function AnalyticExportButton({ data, filename }: AnalyticExportButtonProps) {
  const [showOptions, setShowOptions] = useState(false);
  const { handleDownload, loading } = useReportActions();

  return (
    <div className="relative">
      <Button
        variant="secondary"
        icon={Download}
        onClick={() => setShowOptions(!showOptions)}
        isLoading={loading}
      >
        Exporter
      </Button>

      {showOptions && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            <button
              onClick={() => {
                handleDownload('excel', data);
                setShowOptions(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Excel
            </button>
            <button
              onClick={() => {
                handleDownload('pdf', data);
                setShowOptions(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FileText className="h-4 w-4 mr-2" />
              PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}