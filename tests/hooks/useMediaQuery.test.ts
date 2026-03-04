import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useMediaQuery } from '../../src/hooks';

describe('useMediaQuery', () => {
  let listeners: ((e: { matches: boolean }) => void)[];
  let mockMatches: boolean;

  beforeEach(() => {
    listeners = [];
    mockMatches = false;

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: mockMatches,
        media: query,
        addEventListener: (_: string, handler: (e: { matches: boolean }) => void) => {
          listeners.push(handler);
        },
        removeEventListener: (_: string, handler: (e: { matches: boolean }) => void) => {
          listeners = listeners.filter((l) => l !== handler);
        },
      })),
    });
  });

  afterEach(() => {
    listeners = [];
  });

  it('returns initial match state', () => {
    mockMatches = true;
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('returns false when no match', () => {
    mockMatches = false;
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);
  });

  it('updates when media query changes', () => {
    mockMatches = false;
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);

    act(() => {
      listeners.forEach((l) => l({ matches: true }));
    });
    expect(result.current).toBe(true);
  });

  it('cleans up listener on unmount', () => {
    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(listeners).toHaveLength(1);
    unmount();
    expect(listeners).toHaveLength(0);
  });
});
