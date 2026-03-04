import { type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface StatStripProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

const gridCols = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-4',
};

export function StatStrip({ children, columns = 4, className }: StatStripProps) {
  return (
    <div
      className={cn(
        'grid border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/60 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800',
        gridCols[columns],
        className,
      )}
    >
      {children}
    </div>
  );
}
