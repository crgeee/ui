import { useState, useCallback, useRef, useEffect } from 'react';
import { Toast, type ToastData, type ToastVariant } from './Toast';
import { cn } from '../utils/cn';

let toastCounter = 0;
function generateId(): string {
  return `toast-${++toastCounter}-${Date.now()}`;
}

export interface ToasterHandle {
  toast: (message: string, variant?: ToastVariant) => void;
  dismiss: (id: string) => void;
}

export function useToaster(autoDismiss = 4000): ToasterHandle & { toasts: ToastData[] } {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (message: string, variant: ToastVariant = 'info') => {
      const id = generateId();
      setToasts((prev) => [...prev, { id, message, variant }]);
      if (autoDismiss > 0) {
        const timer = setTimeout(() => dismiss(id), autoDismiss);
        timersRef.current.set(id, timer);
      }
    },
    [autoDismiss, dismiss],
  );

  // Cleanup all timers on unmount
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  return { toasts, toast, dismiss };
}

export interface ToasterProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
  className?: string;
}

export function Toaster({ toasts, onDismiss, className }: ToasterProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none',
        className,
      )}
    >
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <Toast {...t} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
}
