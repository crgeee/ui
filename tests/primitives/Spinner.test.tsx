import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from '../../src/primitives';

describe('Spinner', () => {
  it('renders with default label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  it('renders custom label text', () => {
    render(<Spinner label="Please wait" />);
    expect(screen.getByText('Please wait')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { container } = render(<Spinner size="lg" />);
    expect(container.querySelector('.w-12')).toBeInTheDocument();
  });

  it('merges className', () => {
    render(<Spinner className="mt-4" />);
    expect(screen.getByRole('status')).toHaveClass('mt-4');
  });
});
