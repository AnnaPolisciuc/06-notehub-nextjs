"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, createNote } from "@/lib/api";
import type { Note, NoteResponse } from "@/types/note";
import NotesList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Loading from "./loading";
import ErrorComponent from "./error";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import { deleteNote } from "@/lib/api";

interface NotesClientProps {
  initialData: NoteResponse;
}

export default function NotesClient({ initialData }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const { data, isLoading, error } = useQuery<NoteResponse, Error>({
    queryKey: ["notes", page],
    queryFn: () => fetchNotes(page),
    initialData: page === 1 ? initialData : undefined,
    placeholderData: (prev) => prev,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  const queryClient = useQueryClient();

  const { mutate: addNote } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error("Failed to create note:", error);
      alert("Something went wrong");
    },
  });

  const { mutate: removeNote, isPending: isDeleting } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => {
      console.error("Failed to delete note:", error);
      alert("Failed to delete note.");
    },
  });
  

  const handleSearch = (query: string) => {
    if (searchTimeout) clearTimeout(searchTimeout);

    const timeout = setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(lowerQuery) ||
          note.content.toLowerCase().includes(lowerQuery)
      );
      setFilteredNotes(filtered);
    }, 300); 

    setSearchTimeout(timeout);
  };

  if (isLoading) return <Loading />;
  if (error || !data) return <ErrorComponent error={error!} reset={() => setPage(1)} />;

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => setIsModalOpen(true)}
      >
        Create Note +
      </button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onSubmit={(note) => addNote(note)} />
        </Modal>
      )}
<SearchBox onSearch={handleSearch} />
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}

      <NotesList notes={filteredNotes} onDelete={(id) => removeNote(id)} />
    </div>
  );
}
