import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Select } from '../../src/primitives';

describe('Select', () => {
  const options = [
    { value: 'a', label: 'Alpha' },
    { value: 'b', label: 'Beta' },
  ];

  it('renders options', () => {
    render(<Select options={options} label="Pick" />);
    expect(screen.getByLabelText('Pick')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLSelectElement | null };
    render(<Select ref={ref} options={options} />);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });
});
