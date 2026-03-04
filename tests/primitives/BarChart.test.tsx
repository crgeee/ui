import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BarChart } from '../../src/primitives';

describe('BarChart', () => {
  it('renders labels and values', () => {
    render(<BarChart data={{ Coding: 5, Design: 3 }} />);
    expect(screen.getByText('Coding')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('merges className', () => {
    const { container } = render(<BarChart data={{ A: 1 }} className="mt-4" />);
    expect(container.firstChild).toHaveClass('mt-4');
  });
});
