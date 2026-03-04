import { cn } from '../utils/cn';

export interface ScoreCardProps {
  label: string;
  score: number;
  max?: number;
  className?: string;
}

export function ScoreCard({ label, score, max = 5, className }: ScoreCardProps) {
  const ratio = max > 0 ? score / max : 0;
  const color = ratio >= 0.8 ? 'text-green-400' : ratio >= 0.6 ? 'text-amber-400' : 'text-red-400';
  const bgColor =
    ratio >= 0.8
      ? 'bg-green-950/30 border-green-800/40'
      : ratio >= 0.6
        ? 'bg-amber-950/30 border-amber-800/40'
        : 'bg-red-950/30 border-red-800/40';

  return (
    <div
      className={cn(
        'p-3 rounded-lg border text-center transition-all duration-200',
        bgColor,
        className,
      )}
    >
      <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5 truncate font-medium">
        {label}
      </p>
      <p className={cn('text-3xl font-bold font-mono tabular-nums', color)}>{score}</p>
      <p className="text-[10px] text-zinc-600 font-mono">/{max}</p>
    </div>
  );
}
