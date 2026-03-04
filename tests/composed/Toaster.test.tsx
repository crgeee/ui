import { render, screen, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Toaster, useToaster } from '../../src/composed';

describe('useToaster', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with empty toasts', () => {
    const { result } = renderHook(() => useToaster());
    expect(result.current.toasts).toEqual([]);
  });

  it('adds toast', () => {
    const { result } = renderHook(() => useToaster());
    act(() => {
      result.current.toast('Hello', 'success');
    });
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]?.message).toBe('Hello');
    expect(result.current.toasts[0]?.variant).toBe('success');
  });

  it('defaults to info variant', () => {
    const { result } = renderHook(() => useToaster());
    act(() => {
      result.current.toast('Test');
    });
    expect(result.current.toasts[0]?.variant).toBe('info');
  });

  it('dismisses toast', () => {
    const { result } = renderHook(() => useToaster());
    act(() => {
      result.current.toast('Test');
    });
    const id = result.current.toasts[0]!.id;
    act(() => {
      result.current.dismiss(id);
    });
    expect(result.current.toasts).toHaveLength(0);
  });

  it('auto-dismisses after delay', () => {
    const { result } = renderHook(() => useToaster(1000));
    act(() => {
      result.current.toast('Test');
    });
    expect(result.current.toasts).toHaveLength(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.toasts).toHaveLength(0);
  });

  it('cleans up timers on unmount', () => {
    const clearSpy = vi.spyOn(globalThis, 'clearTimeout');
    const { result, unmount } = renderHook(() => useToaster(5000));
    act(() => {
      result.current.toast('Test');
    });
    unmount();
    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });
});

describe('Toaster', () => {
  it('renders nothing when no toasts', () => {
    const { container } = render(<Toaster toasts={[]} onDismiss={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders toasts', () => {
    const toasts = [
      { id: '1', message: 'Success!', variant: 'success' as const },
      { id: '2', message: 'Error!', variant: 'error' as const },
    ];
    render(<Toaster toasts={toasts} onDismiss={() => {}} />);
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });

  it('accepts className', () => {
    const toasts = [{ id: '1', message: 'Test' }];
    const { container } = render(
      <Toaster toasts={toasts} onDismiss={() => {}} className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
