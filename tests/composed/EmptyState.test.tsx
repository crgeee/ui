import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EmptyState } from '../../src/composed';

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(<EmptyState title="No items" description="Add something" />);
    expect(screen.getByText('No items')).toBeInTheDocument();
    expect(screen.getByText('Add something')).toBeInTheDocument();
  });

  it('renders action', () => {
    render(<EmptyState title="Empty" action={<button>Add</button>} />);
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });
});
