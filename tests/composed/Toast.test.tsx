import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Toast } from '../../src/composed';

describe('Toast', () => {
  it('renders message', () => {
    render(<Toast id="1" message="Saved!" onDismiss={() => {}} />);
    expect(screen.getByText('Saved!')).toBeInTheDocument();
  });

  it('calls onDismiss', () => {
    const onDismiss = vi.fn();
    render(<Toast id="1" message="Test" onDismiss={onDismiss} />);
    fireEvent.click(screen.getByLabelText('Dismiss'));
    expect(onDismiss).toHaveBeenCalledWith('1');
  });

  it('uses role="status" for non-error toasts', () => {
    render(<Toast id="1" message="Info" variant="info" onDismiss={() => {}} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('uses role="alert" for error toasts', () => {
    render(<Toast id="1" message="Fail" variant="error" onDismiss={() => {}} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
