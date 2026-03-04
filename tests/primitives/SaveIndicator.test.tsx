import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SaveIndicator } from '../../src/primitives';

describe('SaveIndicator', () => {
  it('renders nothing for idle', () => {
    const { container } = render(<SaveIndicator status="idle" />);
    expect(container.firstChild).toBeNull();
  });

  it('shows saving text', () => {
    render(<SaveIndicator status="saving" />);
    expect(screen.getByText('Saving...')).toBeInTheDocument();
  });

  it('shows saved text', () => {
    render(<SaveIndicator status="saved" />);
    expect(screen.getByText('Saved')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<SaveIndicator status="error" error="Network fail" />);
    expect(screen.getByText('Network fail')).toBeInTheDocument();
  });

  it('shows default error', () => {
    render(<SaveIndicator status="error" />);
    expect(screen.getByText('Failed to save')).toBeInTheDocument();
  });
});
