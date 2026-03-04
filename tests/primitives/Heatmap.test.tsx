import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Heatmap } from '../../src/primitives';

describe('Heatmap', () => {
  it('renders without data', () => {
    const { container } = render(<Heatmap data={{}} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders legend', () => {
    render(<Heatmap data={{}} />);
    expect(screen.getByText('Less')).toBeInTheDocument();
    expect(screen.getByText('More')).toBeInTheDocument();
  });

  it('accepts className', () => {
    const { container } = render(<Heatmap data={{}} className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('renders cells for data', () => {
    const today = new Date().toISOString().split('T')[0]!;
    const data = { [today]: 3 };
    const { container } = render(<Heatmap data={data} days={7} />);
    const cells = container.querySelectorAll('[data-date]');
    expect(cells.length).toBeGreaterThan(0);
  });

  it('renders day labels', () => {
    render(<Heatmap data={{}} days={30} />);
    // Odd-indexed days show abbreviated labels (M, W, F)
    expect(screen.getByText('M')).toBeInTheDocument();
  });
});
