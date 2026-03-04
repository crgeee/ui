import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ScoreCard } from '../../src/primitives';

describe('ScoreCard', () => {
  it('renders label and score', () => {
    render(<ScoreCard label="Clarity" score={4} />);
    expect(screen.getByText('Clarity')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('/5')).toBeInTheDocument();
  });

  it('applies green for high scores', () => {
    const { container } = render(<ScoreCard label="Test" score={5} />);
    expect(container.firstChild).toHaveClass('bg-green-950/30');
  });

  it('applies red for low scores', () => {
    const { container } = render(<ScoreCard label="Test" score={1} />);
    expect(container.firstChild).toHaveClass('bg-red-950/30');
  });

  it('renders custom max', () => {
    render(<ScoreCard label="Test" score={8} max={10} />);
    expect(screen.getByText('/10')).toBeInTheDocument();
  });
});
