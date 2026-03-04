import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SaveIndicator } from '../../src/primitives';

describe('SaveIndicator', () => {
  it('renders empty for idle', () => {
    render(<SaveIndicator status="idle" />);
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
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

  it('has aria-live region', () => {
    render(<SaveIndicator status="saving" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });
});
