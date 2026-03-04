import { render, screen, fireEvent } from '@testing-library/react';
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

  it('calls onConfirm and onClose', () => {
    const onConfirm = vi.fn();
    const onClose = vi.fn();
    render(<ConfirmDialog open={true} onClose={onClose} onConfirm={onConfirm} title="Confirm?" />);
    fireEvent.click(screen.getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(onClose).toHaveBeenCalledOnce();
  });
});
