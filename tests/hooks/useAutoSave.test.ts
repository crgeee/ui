import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAutoSave } from '../../src/hooks';

describe('useAutoSave', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with idle status', () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useAutoSave({ values: { name: 'test' }, onSave }));
    expect(result.current.status).toBe('idle');
    expect(result.current.error).toBeNull();
  });

  it('does not save when values match initial', () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const { rerender } = renderHook(({ values }) => useAutoSave({ values, onSave }), {
      initialProps: { values: { name: 'test' } },
    });

    rerender({ values: { name: 'test' } });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(onSave).not.toHaveBeenCalled();
  });

  it('saves after delay when values change', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const { result, rerender } = renderHook(
      ({ values }) => useAutoSave({ values, onSave, delay: 300 }),
      { initialProps: { values: { name: 'a' } } },
    );

    rerender({ values: { name: 'b' } });
    expect(onSave).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(300);
    });
    expect(onSave).toHaveBeenCalledWith({ name: 'b' });
    expect(result.current.status).toBe('saved');
  });

  it('transitions to saving status', async () => {
    let resolvePromise: () => void;
    const savePromise = new Promise<void>((r) => {
      resolvePromise = r;
    });
    const onSave = vi.fn().mockReturnValue(savePromise);

    const { result, rerender } = renderHook(
      ({ values }) => useAutoSave({ values, onSave, delay: 100 }),
      { initialProps: { values: { name: 'a' } } },
    );

    rerender({ values: { name: 'b' } });
    await act(async () => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.status).toBe('saving');

    await act(async () => {
      resolvePromise!();
    });
    expect(result.current.status).toBe('saved');
  });

  it('sets error status on save failure', async () => {
    const onSave = vi.fn().mockRejectedValue(new Error('Network error'));
    const { result, rerender } = renderHook(
      ({ values }) => useAutoSave({ values, onSave, delay: 100 }),
      { initialProps: { values: { name: 'a' } } },
    );

    rerender({ values: { name: 'b' } });
    await act(async () => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.status).toBe('error');
    expect(result.current.error).toBe('Network error');
  });

  it('does not save when disabled', () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const { rerender } = renderHook(
      ({ values, enabled }) => useAutoSave({ values, onSave, enabled, delay: 100 }),
      { initialProps: { values: { name: 'a' }, enabled: false } },
    );

    rerender({ values: { name: 'b' }, enabled: false });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(onSave).not.toHaveBeenCalled();
  });

  it('debounces rapid changes', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const { rerender } = renderHook(({ values }) => useAutoSave({ values, onSave, delay: 300 }), {
      initialProps: { values: { name: 'a' } },
    });

    rerender({ values: { name: 'b' } });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    rerender({ values: { name: 'c' } });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    rerender({ values: { name: 'd' } });

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith({ name: 'd' });
  });

  it('saved status fades back to idle', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const { result, rerender } = renderHook(
      ({ values }) => useAutoSave({ values, onSave, delay: 100 }),
      { initialProps: { values: { name: 'a' } } },
    );

    rerender({ values: { name: 'b' } });
    await act(async () => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.status).toBe('saved');

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.status).toBe('idle');
  });
});
