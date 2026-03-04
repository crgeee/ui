import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FilterBar } from '../../src/composed';

describe('FilterBar', () => {
  it('renders children', () => {
    render(
      <FilterBar>
        <span>Child</span>
      </FilterBar>,
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('renders search input', () => {
    const onChange = vi.fn();
    render(
      <FilterBar search={{ value: '', onChange, placeholder: 'Search tasks...' }}>
        <span>Filters</span>
      </FilterBar>,
    );
    expect(screen.getByPlaceholderText('Search tasks...')).toBeInTheDocument();
  });

  it('calls search onChange', () => {
    const onChange = vi.fn();
    render(
      <FilterBar search={{ value: '', onChange }}>
        <span>Filters</span>
      </FilterBar>,
    );
    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'test' },
    });
    expect(onChange).toHaveBeenCalledWith('test');
  });

  it('shows reset button when onReset is provided', () => {
    const onReset = vi.fn();
    render(
      <FilterBar onReset={onReset}>
        <span>Filters</span>
      </FilterBar>,
    );
    fireEvent.click(screen.getByText('Reset'));
    expect(onReset).toHaveBeenCalled();
  });

  it('hides reset when onReset is not provided', () => {
    render(
      <FilterBar>
        <span>Filters</span>
      </FilterBar>,
    );
    expect(screen.queryByText('Reset')).not.toBeInTheDocument();
  });

  it('accepts className', () => {
    const { container } = render(
      <FilterBar className="custom">
        <span>Test</span>
      </FilterBar>,
    );
    expect(container.firstChild).toHaveClass('custom');
  });
});
