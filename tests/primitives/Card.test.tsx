import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from '../../src/primitives';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Content</Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies padding variant', () => {
    const { container } = render(<Card padding="lg">Large</Card>);
    expect(container.firstChild).toHaveClass('p-6');
  });

  it('merges className', () => {
    const { container } = render(<Card className="max-w-sm">Narrow</Card>);
    expect(container.firstChild).toHaveClass('max-w-sm');
  });
});
