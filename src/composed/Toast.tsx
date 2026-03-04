import { cn } from '../utils/cn';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToastData {
  id: string;
  message: string;
  variant?: ToastVariant;
}

export interface ToastProps extends ToastData {
  onDismiss: (id: string) => void;
  className?: string;
}

const variantStyles: Record<ToastVariant, string> = {
  success: 'border-green-800/60 bg-green-950/50 text-green-300',
  error: 'border-red-800/60 bg-red-950/50 text-red-300',
  warning: 'border-amber-800/60 bg-amber-950/50 text-amber-300',
  info: 'border-blue-800/60 bg-blue-950/50 text-blue-300',
};

export function Toast({ id, message, variant = 'info', onDismiss, className }: ToastProps) {
  return (
    <div
      role="alert"
      className={cn(
        'anim-slide-up flex items-center gap-3 px-4 py-3 border rounded-lg shadow-lg text-sm',
        variantStyles[variant],
        className,
      )}
    >
      <span className="flex-1">{message}</span>
      <button
        onClick={() => onDismiss(id)}
        className="text-current opacity-60 hover:opacity-100 transition-opacity flex-shrink-0"
        aria-label="Dismiss"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
