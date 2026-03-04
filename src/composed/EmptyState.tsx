import { type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}
    >
      {icon && <div className="text-zinc-600 mb-3">{icon}</div>}
      <p className="text-zinc-300 font-medium text-sm">{title}</p>
      {description && <p className="text-zinc-500 text-xs mt-1 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
