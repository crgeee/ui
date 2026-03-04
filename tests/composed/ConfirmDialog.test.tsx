import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ConfirmDialog } from '../../src/composed';

describe('ConfirmDialog', () => {
  it('renders nothing when closed', () => {
    render(<ConfirmDialog open={false} onClose={() => {}} onConfirm={() => {}} title="Sure?" />);
    expect(screen.queryByText('Sure?')).not.toBeInTheDocument();
  });

  it('renders title when open', () => {
    render(<ConfirmDialog open={true} onClose={() => {}} onConfirm={() => {}} title="Delete?" />);
    expect(screen.getByText('Delete?')).toBeInTheDocument();
  });

  it('calls onConfirm and onClose', async () => {
    const onConfirm = vi.fn();
    const onClose = vi.fn();
    render(<ConfirmDialog open={true} onClose={onClose} onConfirm={onConfirm} title="Confirm?" />);
    fireEvent.click(screen.getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledOnce();
    await waitFor(() => {
      expect(onClose).toHaveBeenCalledOnce();
    });
  });

  it('waits for async onConfirm before closing', async () => {
    let resolveConfirm: () => void;
    const onConfirm = vi.fn(
      () =>
        new Promise<void>((r) => {
          resolveConfirm = r;
        }),
    );
    const onClose = vi.fn();
    render(<ConfirmDialog open={true} onClose={onClose} onConfirm={onConfirm} title="Async?" />);
    fireEvent.click(screen.getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(onClose).not.toHaveBeenCalled();

    resolveConfirm!();
    await waitFor(() => {
      expect(onClose).toHaveBeenCalledOnce();
    });
  });
});
