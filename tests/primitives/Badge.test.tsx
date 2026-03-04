import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from '../../src/primitives';

describe('Badge', () => {
  it('renders label', () => {
    render(<Badge label="Active" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders color dot', () => {
    const { container } = render(<Badge label="Tag" color="#ff0000" />);
    const dot = container.querySelector('[style*="background-color"]');
    expect(dot).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { container } = render(<Badge label="Sm" size="sm" />);
    expect(container.firstChild).toHaveClass('text-[10px]');
  });

  it('merges className', () => {
    const { container } = render(<Badge label="Custom" className="mx-2" />);
    expect(container.firstChild).toHaveClass('mx-2');
  });

  it('applies lg size classes', () => {
    const { container } = render(<Badge label="Large" size="lg" />);
    expect(container.firstChild).toHaveClass('text-sm');
  });
});
