import { cn } from '../utils/cn';
import { type AutoSaveStatus } from '../hooks/useAutoSave';

/** @deprecated Use AutoSaveStatus instead */
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
  if (status === 'idle') return null;

  if (status === 'saving') {
    return <span className={cn('text-xs text-zinc-500 animate-pulse', className)}>Saving...</span>;
  }

  if (status === 'saved') {
    return (
      <span className={cn('text-xs text-green-400 flex items-center gap-1', className)}>
        <CheckIcon />
        Saved
      </span>
    );
  }

  if (status === 'error') {
    return (
      <span className={cn('text-xs text-red-400', className)}>{error ?? 'Failed to save'}</span>
    );
  }

  return null;
}
