import { useState } from 'react';

export function useReportActions() {
  const [loading, setLoading] = useState(false);

  const handlePrint = async () => {
    window.print();
  };

  const handleDownload = async (format: 'pdf' | 'excel' | 'csv', data: any) => {
    setLoading(true);
    try {
      const content = format === 'csv' 
        ? 'Header1,Header2\nValue1,Value2'
        : JSON.stringify(data, null, 2);

      const blob = new Blob([content], { 
        type: format === 'csv' 
          ? 'text/csv;charset=utf-8'
          : 'application/json'
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handlePrint,
    handleDownload
  };
}