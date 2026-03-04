import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatCell, StatStrip } from '../../src/composed';

describe('StatCell', () => {
  it('renders label and value', () => {
    render(<StatCell label="Due" value={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Due')).toBeInTheDocument();
  });

  it('applies warn color', () => {
    render(<StatCell label="Overdue" value={3} warn />);
    expect(screen.getByText('3')).toHaveClass('text-red-400');
  });

  it('applies accent color', () => {
    render(<StatCell label="Active" value={2} accent />);
    expect(screen.getByText('2')).toHaveClass('text-amber-400');
  });
});

describe('StatStrip', () => {
  it('renders children in grid', () => {
    const { container } = render(
      <StatStrip>
        <StatCell label="A" value={1} />
        <StatCell label="B" value={2} />
      </StatStrip>,
    );
    expect(container.firstChild).toHaveClass('grid');
  });
});
