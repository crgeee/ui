import { describe, it, expect } from 'vitest';
import { pillStyle } from '../../src/utils';

describe('pillStyle', () => {
  it('returns color with alpha', () => {
    const style = pillStyle('#ff0000');
    expect(style.backgroundColor).toBe('#ff000033');
    expect(style.color).toBe('#ff0000');
  });

  it('returns fallback for null', () => {
    const style = pillStyle(null);
    expect(style.backgroundColor).toBe('rgba(113, 113, 122, 0.2)');
    expect(style.color).toBe('#a1a1aa');
  });
});
