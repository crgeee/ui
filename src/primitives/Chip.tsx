import { type ButtonHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Chip({ active = false, className, children, ...props }: ChipProps) {
  return (
    <button
      aria-pressed={active}
      className={cn(
        'px-2.5 py-1 text-xs rounded-md transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60',
        active
          ? 'bg-zinc-700 text-zinc-100 font-medium'
          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
