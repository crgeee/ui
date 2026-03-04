import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NotesList } from '../../src/composed';

describe('NotesList', () => {
  const notes = [
    { id: '1', text: 'First note', createdAt: '2026-01-01' },
    { id: '2', text: 'Second note', createdAt: '2026-01-02' },
  ];

  it('renders notes', () => {
    render(<NotesList notes={notes} />);
    expect(screen.getByText('First note')).toBeInTheDocument();
    expect(screen.getByText('Second note')).toBeInTheDocument();
  });

  it('shows add input when onAddNote provided', () => {
    render(<NotesList notes={[]} onAddNote={() => {}} />);
    expect(screen.getByPlaceholderText('Add a note...')).toBeInTheDocument();
  });

  it('calls onAddNote on submit', () => {
    const onAdd = vi.fn();
    render(<NotesList notes={[]} onAddNote={onAdd} />);
    fireEvent.change(screen.getByPlaceholderText('Add a note...'), {
      target: { value: 'New note' },
    });
    fireEvent.click(screen.getByText('Add'));
    expect(onAdd).toHaveBeenCalledWith('New note');
  });
});
