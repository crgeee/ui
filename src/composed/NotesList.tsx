import { useState } from 'react';
import { cn } from '../utils/cn';

export interface Note {
  id: string;
  text: string;
  createdAt: string;
}

export interface NotesListProps {
  notes: Note[];
  onAddNote?: (text: string) => void;
  className?: string;
}

export function NotesList({ notes, onAddNote, className }: NotesListProps) {
  const [draft, setDraft] = useState('');

  function handleSubmit() {
    const text = draft.trim();
    if (!text || !onAddNote) return;
    onAddNote(text);
    setDraft('');
  }

  return (
    <div className={cn('space-y-2', className)}>
      {notes.length === 0 && !onAddNote && <p className="text-xs text-zinc-500">No notes</p>}

      {notes.map((note) => (
        <div key={note.id} className="text-sm text-zinc-300 bg-zinc-800/50 rounded-lg px-3 py-2">
          <p className="whitespace-pre-wrap">{note.text}</p>
          <p className="text-[10px] text-zinc-600 mt-1">{note.createdAt}</p>
        </div>
      ))}

      {onAddNote && (
        <div className="flex gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit();
            }}
            placeholder="Add a note..."
            aria-label="Add a note"
            className="flex-1 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 focus-visible:ring-2 focus-visible:ring-amber-500/60"
          />
          <button
            onClick={handleSubmit}
            disabled={!draft.trim()}
            className="px-3 py-1.5 text-xs bg-zinc-700 text-zinc-200 rounded-lg hover:bg-zinc-600 transition-colors disabled:opacity-50"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
