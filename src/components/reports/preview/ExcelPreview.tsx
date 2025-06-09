import React from 'react';

interface ExcelPreviewProps {
  data: any;
}

export function ExcelPreview({ data }: ExcelPreviewProps) {
  return (
    <div className="h-96 overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-green-50">
            {data?.headers?.map((header: string, index: number) => (
              <th key={index} className="border border-gray-300 p-2 text-left font-medium text-green-800">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.rows?.map((row: any[], rowIndex: number) => (
            <tr key={rowIndex} className="border-b hover:bg-gray-50">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-gray-300 p-2">
                  {typeof cell === 'number' 
                    ? new Intl.NumberFormat('fr-FR').format(cell)
                    : cell
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}