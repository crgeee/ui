import { cn } from '../utils/cn';

export interface StatCellProps {
  label: string;
  value: number;
  accent?: boolean;
  warn?: boolean;
  className?: string;
}

export function StatCell({ label, value, accent = false, warn = false, className }: StatCellProps) {
  const color = warn && value > 0 ? 'text-red-400' : accent ? 'text-amber-400' : 'text-zinc-100';

  return (
    <div className={cn('flex items-center gap-2 px-4 py-2.5 flex-1 min-w-0', className)}>
      <span className={cn('text-lg font-bold font-mono tabular-nums leading-none', color)}>
        {value}
      </span>
      <span className="text-[10px] text-zinc-400 uppercase tracking-wider">{label}</span>
    </div>
  );
}
