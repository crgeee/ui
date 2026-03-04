import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useCopyToClipboard } from '../../src/hooks';

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with copied = false', () => {
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.current.copied).toBe(false);
  });

  it('copies text and sets copied to true', async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      const success = await result.current.copy('hello');
      expect(success).toBe(true);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello');
    expect(result.current.copied).toBe(true);
  });

  it('resets copied after delay', async () => {
    const { result } = renderHook(() => useCopyToClipboard(1000));

    await act(async () => {
      await result.current.copy('text');
    });
    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.copied).toBe(false);
  });

  it('returns false and exposes error on clipboard failure', async () => {
    (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Not allowed'),
    );

    const { result } = renderHook(() => useCopyToClipboard());
    await act(async () => {
      const success = await result.current.copy('text');
      expect(success).toBe(false);
    });
    expect(result.current.copied).toBe(false);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Not allowed');
  });

  it('starts with error = null', () => {
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.current.error).toBeNull();
  });

  it('clears error on successful copy', async () => {
    (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Fail'),
    );

    const { result } = renderHook(() => useCopyToClipboard());
    await act(async () => {
      await result.current.copy('text');
    });
    expect(result.current.error).not.toBeNull();

    await act(async () => {
      await result.current.copy('text');
    });
    expect(result.current.error).toBeNull();
  });
});
