import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from '../../src/primitives';

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(
      <Modal open={false} onClose={() => {}}>
        Content
      </Modal>,
    );
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('renders children when open', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        Content
      </Modal>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('has dialog role', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        Content
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls onClose on Escape', () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose}>
        Content
      </Modal>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose on backdrop mousedown', () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose}>
        Content
      </Modal>,
    );
    // The backdrop is the outer div wrapping the dialog
    const backdrop = screen.getByRole('dialog').parentElement!;
    fireEvent.mouseDown(backdrop, { target: backdrop, currentTarget: backdrop });
    expect(onClose).toHaveBeenCalledOnce();
  });
});
