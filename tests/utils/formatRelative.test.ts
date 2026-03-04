import { describe, it, expect, vi, afterEach } from 'vitest';
import { formatRelative } from '../../src/utils';

describe('formatRelative', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "just now" for recent dates', () => {
    expect(formatRelative(new Date().toISOString())).toBe('just now');
  });

  it('returns minutes ago', () => {
    vi.useFakeTimers();
    const now = new Date('2026-01-01T12:05:00Z');
    vi.setSystemTime(now);
    expect(formatRelative('2026-01-01T12:02:00Z')).toBe('3m ago');
  });

  it('returns hours ago', () => {
    vi.useFakeTimers();
    const now = new Date('2026-01-01T15:00:00Z');
    vi.setSystemTime(now);
    expect(formatRelative('2026-01-01T12:00:00Z')).toBe('3h ago');
  });

  it('returns days ago', () => {
    vi.useFakeTimers();
    const now = new Date('2026-01-04T12:00:00Z');
    vi.setSystemTime(now);
    expect(formatRelative('2026-01-01T12:00:00Z')).toBe('3d ago');
  });

  it('returns locale date for 7+ days', () => {
    vi.useFakeTimers();
    const now = new Date('2026-01-15T12:00:00Z');
    vi.setSystemTime(now);
    const result = formatRelative('2026-01-01T12:00:00Z');
    // Should be a locale date string, not "Xd ago"
    expect(result).not.toContain('d ago');
  });

  it('returns input string for invalid date', () => {
    expect(formatRelative('not-a-date')).toBe('not-a-date');
  });
});
