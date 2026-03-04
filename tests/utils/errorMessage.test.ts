import { describe, it, expect } from 'vitest';
import { errorMessage } from '../../src/utils';

describe('errorMessage', () => {
  it('extracts Error message', () => {
    expect(errorMessage(new Error('boom'), 'fallback')).toBe('boom');
  });

  it('returns fallback for non-Error', () => {
    expect(errorMessage('string', 'fallback')).toBe('fallback');
    expect(errorMessage(42, 'fallback')).toBe('fallback');
    expect(errorMessage(null, 'fallback')).toBe('fallback');
  });
});
