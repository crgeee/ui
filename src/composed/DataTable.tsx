import { type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  emptyMessage = 'No data',
  className,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className={cn('px-4 py-8 text-center text-zinc-500 text-sm', className)}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn('border border-zinc-800 rounded-lg overflow-hidden', className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/80">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'text-left text-[10px] text-zinc-400 uppercase tracking-wider font-medium px-3 py-2',
                  col.className,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/60">
          {data.map((row) => (
            <tr
              key={keyExtractor(row)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                'text-sm text-zinc-300 hover:bg-zinc-800/30 transition-colors',
                onRowClick && 'cursor-pointer',
              )}
            >
              {columns.map((col) => (
                <td key={col.key} className={cn('px-3 py-2', col.className)}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
