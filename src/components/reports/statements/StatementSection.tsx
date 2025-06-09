import React from 'react';
import { formatCurrency } from '../../../utils/currency';

interface Column {
  key: string;
  label: string;
}

interface Item {
  code: string;
  label: string;
  [key: string]: any;
}

interface Section {
  title: string;
  items: Item[];
  showSubtotal?: boolean;
  highlight?: boolean;
  isNegative?: boolean;
}

interface StatementSectionProps {
  title: string;
  columns: Column[];
  sections: Section[];
  currency: string;
}

export function StatementSection({ title, columns, sections, currency }: StatementSectionProps) {
  const calculateSubtotal = (items: Item[], key: string) => {
    return items.reduce((sum, item) => sum + (item[key] || 0), 0);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 border-b">
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                Code
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Libellé
              </th>
              {columns.map(column => (
                <th key={column.key} className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {sections.map((section, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                <tr className="bg-gray-50">
                  <td colSpan={columns.length + 2} className="px-4 py-2 text-sm font-medium text-gray-900">
                    {section.title}
                  </td>
                </tr>

                {section.items.map((item, itemIndex) => (
                  <tr 
                    key={itemIndex}
                    className={section.highlight ? 'bg-primary/5 font-medium' : undefined}
                  >
                    <td className="px-4 py-2 text-sm font-mono text-gray-900">
                      {item.code}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {item.label}
                    </td>
                    {columns.map(column => (
                      <td key={column.key} className="px-4 py-2 text-sm text-right text-gray-900">
                        {formatCurrency(
                          section.isNegative ? -item[column.key] : item[column.key],
                          currency
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {section.showSubtotal && (
                  <tr className="bg-gray-50 font-medium">
                    <td colSpan={2} className="px-4 py-2 text-sm text-gray-900">
                      SOUS-TOTAL {section.title}
                    </td>
                    {columns.map(column => (
                      <td key={column.key} className="px-4 py-2 text-sm text-right text-gray-900">
                        {formatCurrency(
                          section.isNegative 
                            ? -calculateSubtotal(section.items, column.key)
                            : calculateSubtotal(section.items, column.key),
                          currency
                        )}
                      </td>
                    ))}
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}