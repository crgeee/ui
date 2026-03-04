import { useState, useCallback, useRef } from 'react';

export function useCopyToClipboard(resetDelay = 2000): {
  copied: boolean;
  error: Error | null;
  copy: (text: string) => Promise<boolean>;
} {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), resetDelay);
        return true;
      } catch (e) {
        const err = e instanceof Error ? e : new Error('Failed to copy');
        console.warn('useCopyToClipboard: copy failed', err);
        setCopied(false);
        setError(err);
        return false;
      }
    },
    [resetDelay],
  );

  return { copied, error, copy };
}
