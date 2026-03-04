import { Modal } from '../primitives/Modal';
import { Button } from '../primitives/Button';
import { cn } from '../utils/cn';

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'default';
  className?: string;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  className,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} className={cn('max-w-sm', className)}>
      <div className="space-y-4">
        <div>
          <p className="text-zinc-100 font-medium">{title}</p>
          {description && <p className="text-zinc-400 text-sm mt-1">{description}</p>}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
