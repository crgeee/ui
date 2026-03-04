import { describe, it, expect } from 'vitest';
import { cn } from '../../src/utils';

describe('cn', () => {
  it('merges classes', () => {
    expect(cn('text-sm', 'text-zinc-300')).toBe('text-sm text-zinc-300');
  });

  it('handles conditional classes', () => {
    const isHidden = false;
    expect(cn('base', isHidden && 'hidden', 'extra')).toBe('base extra');
  });

  it('resolves Tailwind conflicts (last wins)', () => {
    const result = cn('px-4', 'px-2');
    expect(result).toBe('px-2');
  });
});
