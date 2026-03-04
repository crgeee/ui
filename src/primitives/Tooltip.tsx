import { useState, type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={cn(
            'absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 px-2.5 py-1.5 bg-zinc-800 border border-zinc-700 text-zinc-300 text-[11px] rounded-md shadow-lg whitespace-nowrap z-50 anim-fade-in',
            className,
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}
