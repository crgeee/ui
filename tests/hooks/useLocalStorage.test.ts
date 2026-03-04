import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useLocalStorage } from '../../src/hooks';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial value', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('persists value', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    act(() => {
      result.current[1]('updated');
    });
    expect(result.current[0]).toBe('updated');
    expect(JSON.parse(localStorage.getItem('key')!)).toBe('updated');
  });

  it('reads persisted value', () => {
    localStorage.setItem('key', JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    expect(result.current[0]).toBe('stored');
  });

  it('falls back to initial on corrupted JSON', () => {
    localStorage.setItem('key', '{broken');
    const { result } = renderHook(() => useLocalStorage('key', 'fallback'));
    expect(result.current[0]).toBe('fallback');
  });
});
