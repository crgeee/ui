import { render, fireEvent } from '@testing-library/react';
import { useRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { useClickOutside } from '../../src/hooks';

function TestComponent({ handler, enabled }: { handler: () => void; enabled?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, handler, enabled);
  return (
    <div>
      <div ref={ref} data-testid="inside">
        Inside
      </div>
      <div data-testid="outside">Outside</div>
    </div>
  );
}

describe('useClickOutside', () => {
  it('calls handler on outside click', () => {
    const handler = vi.fn();
    const { getByTestId } = render(<TestComponent handler={handler} />);
    fireEvent.mouseDown(getByTestId('outside'));
    expect(handler).toHaveBeenCalledOnce();
  });

  it('does not call handler on inside click', () => {
    const handler = vi.fn();
    const { getByTestId } = render(<TestComponent handler={handler} />);
    fireEvent.mouseDown(getByTestId('inside'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('respects enabled flag', () => {
    const handler = vi.fn();
    const { getByTestId } = render(<TestComponent handler={handler} enabled={false} />);
    fireEvent.mouseDown(getByTestId('outside'));
    expect(handler).not.toHaveBeenCalled();
  });
});
