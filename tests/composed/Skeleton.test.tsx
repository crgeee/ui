import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from '../../src/composed';

describe('Skeleton', () => {
  it('renders single line', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('animate-pulse');
  });

  it('renders multiple lines', () => {
    const { container } = render(<Skeleton lines={3} />);
    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(3);
  });
});
