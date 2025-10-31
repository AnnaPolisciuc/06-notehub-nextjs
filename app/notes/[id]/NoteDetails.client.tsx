"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Loading from "@/app/notes/loading";
import ErrorComponent from "@/app/notes/error";
import NoteDetails from "@/components/NoteDetails/NoteDetails";

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <Loading />;
  if (error || !data)
    return <ErrorComponent error={error!} reset={() => window.location.reload()} />;

  return <NoteDetails note={data} />;
}
