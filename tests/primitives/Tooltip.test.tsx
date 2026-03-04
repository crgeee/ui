import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tooltip } from '../../src/primitives';

describe('Tooltip', () => {
  it('shows content on hover', () => {
    render(
      <Tooltip content="Tip text">
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    fireEvent.mouseEnter(screen.getByText('Hover me').parentElement!);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tip text');
  });

  it('hides on mouse leave', () => {
    render(
      <Tooltip content="Tip text">
        <button>Hover me</button>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByText('Hover me').parentElement!);
    fireEvent.mouseLeave(screen.getByText('Hover me').parentElement!);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
