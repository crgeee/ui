import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Chip, ChipGroup } from '../../src/primitives';

describe('Chip', () => {
  it('renders children', () => {
    render(<Chip>Tag</Chip>);
    expect(screen.getByText('Tag')).toBeInTheDocument();
  });

  it('applies active styles', () => {
    render(<Chip active>Active</Chip>);
    expect(screen.getByText('Active')).toHaveClass('bg-zinc-700');
  });
});

describe('ChipGroup', () => {
  const options = [
    { value: 'a' as const, label: 'Alpha' },
    { value: 'b' as const, label: 'Beta' },
  ];

  it('renders all options', () => {
    render(<ChipGroup value="a" options={options} onChange={() => {}} />);
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('calls onChange on click', () => {
    const onChange = vi.fn();
    render(<ChipGroup value="a" options={options} onChange={onChange} />);
    fireEvent.click(screen.getByText('Beta'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('renders label', () => {
    render(<ChipGroup label="Topic" value="a" options={options} onChange={() => {}} />);
    expect(screen.getByText('Topic')).toBeInTheDocument();
  });
});
