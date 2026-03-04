import { useState, useId } from 'react';
import { Modal } from '../primitives/Modal';
import { Button } from '../primitives/Button';
import { ButtonSpinner } from '../primitives/ButtonSpinner';
import { cn } from '../utils/cn';

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
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
  const [confirming, setConfirming] = useState(false);
  const titleId = useId();

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setConfirming(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={titleId}
      className={cn('max-w-sm', className)}
    >
      <div className="space-y-4">
        <div>
          <p id={titleId} className="text-zinc-100 font-medium">
            {title}
          </p>
          {description && <p className="text-zinc-400 text-sm mt-1">{description}</p>}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} disabled={confirming}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={handleConfirm}
            disabled={confirming}
          >
            {confirming && <ButtonSpinner className="mr-1.5" />}
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
