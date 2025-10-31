
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { NoteResponse } from '@/types/note';

export default async function NotesPage() {
  const initialData: NoteResponse = await fetchNotes(1);
    return <NotesClient initialData={initialData} />;
  }

