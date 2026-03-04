import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from '../../src/composed';

describe('Skeleton', () => {
  it('renders single line with loading role', () => {
    render(<Skeleton />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders multiple lines', () => {
    const { container } = render(<Skeleton lines={3} />);
    // 3 pulse bars inside the status container
    expect(container.querySelectorAll('.h-4')).toHaveLength(3);
  });

  it('has aria-label', () => {
    render(<Skeleton />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });
});
