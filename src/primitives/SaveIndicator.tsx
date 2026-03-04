import { cn } from '../utils/cn';
import { type AutoSaveStatus } from '../hooks/useAutoSave';

export type SaveStatus = AutoSaveStatus;

export interface SaveIndicatorProps {
  status: AutoSaveStatus;
  error?: string | null;
  className?: string;
}

const CheckIcon = () => (
  <svg
    aria-hidden="true"
    className="w-3 h-3"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export function SaveIndicator({ status, error, className }: SaveIndicatorProps) {
  return (
    <span role="status" aria-live="polite" className={className}>
      {status === 'saving' && (
        <span className={cn('text-xs text-zinc-500 motion-safe:animate-pulse')}>Saving...</span>
      )}
      {status === 'saved' && (
        <span className={cn('text-xs text-green-400 flex items-center gap-1')}>
          <CheckIcon />
          Saved
        </span>
      )}
      {status === 'error' && (
        <span className={cn('text-xs text-red-400')}>{error ?? 'Failed to save'}</span>
      )}
    </span>
  );
}
