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

  it('has alert role', () => {
    render(<Toast id="1" message="Alert" onDismiss={() => {}} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
