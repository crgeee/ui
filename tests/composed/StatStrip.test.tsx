import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatStrip } from '../../src/composed';

describe('StatStrip', () => {
  it('renders children', () => {
    render(
      <StatStrip>
        <div>Stat 1</div>
        <div>Stat 2</div>
      </StatStrip>,
    );
    expect(screen.getByText('Stat 1')).toBeInTheDocument();
    expect(screen.getByText('Stat 2')).toBeInTheDocument();
  });

  it('defaults to 4 columns', () => {
    const { container } = render(
      <StatStrip>
        <div>A</div>
      </StatStrip>,
    );
    expect(container.firstChild).toHaveClass('sm:grid-cols-4');
  });

  it('accepts columns prop', () => {
    const { container } = render(
      <StatStrip columns={3}>
        <div>A</div>
      </StatStrip>,
    );
    expect(container.firstChild).toHaveClass('sm:grid-cols-3');
  });

  it('merges className', () => {
    const { container } = render(
      <StatStrip className="custom">
        <div>A</div>
      </StatStrip>,
    );
    expect(container.firstChild).toHaveClass('custom');
  });
});
