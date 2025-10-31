"use client";

import css from "./NoteList.module.css";
import type { Note } from "@/types/note";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  if (!notes.length) {
    return <p className={css.message}>No notes found.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content.slice(0, 100)}...</p>
          <div className={css.actions}>
            <button
              className={css.deleteButton}
              onClick={() => onDelete(note.id)}
            >
              Delete note
            </button>
          </div>
          <Link href={`/notes/${note.id}`} className={css.link}>View details</Link>
        </li>
      ))}
    </ul>
  );
}
