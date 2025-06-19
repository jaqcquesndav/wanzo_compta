import React from 'react';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
  width?: string; // Ajouter une option de largeur pour les colonnes
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  rowClassName?: (item: T) => string;
  containerClassName?: string; // Classe personnalisée pour le conteneur
  tableClassName?: string; // Classe personnalisée pour la table
}

export function Table<T extends { id: string | number }>({ 
  columns, 
  data, 
  loading = false,
  emptyMessage = "Aucune donnée disponible",
  onRowClick,
  rowClassName,
  containerClassName,
  tableClassName
}: TableProps<T>) {
  return (
    <div className={`table-container ${containerClassName || ''}`}>
      <table className={`table ${tableClassName || ''}`}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`${column.className || ''}`}
                style={column.width ? { width: column.width } : undefined}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody> 
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr 
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className={`
                  ${rowClassName ? rowClassName(item) : ''}
                  ${onRowClick ? 'cursor-pointer hover:bg-muted/50' : ''} 
                `}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`${column.className || ''}`}
                    style={column.width ? { width: column.width } : undefined}
                  >
                    {typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : String(item[column.accessor])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}