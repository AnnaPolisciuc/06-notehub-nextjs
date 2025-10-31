import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import NoteDetails from "@/components/NoteDetails/NoteDetails";

export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;  
  const { id } = resolvedParams;

  if (!id) {
    return <p>Note ID is missing!</p>;
  }

  const note: Note = await fetchNoteById(id);
  return <NoteDetails note={note} />;
}
