import { type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface FilterBarProps {
  children: ReactNode;
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
  onReset?: () => void;
  className?: string;
}

export function FilterBar({ children, search, onReset, className }: FilterBarProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {search && (
        <input
          type="text"
          value={search.value}
          onChange={(e) => search.onChange(e.target.value)}
          placeholder={search.placeholder ?? 'Search...'}
          aria-label={search.placeholder ?? 'Search'}
          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 focus-visible:ring-2 focus-visible:ring-amber-500/60"
        />
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {children}

        {onReset && (
          <button
            onClick={onReset}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
