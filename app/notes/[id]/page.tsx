import NoteDetailsClient from "./NoteDetails.client";

export default function NotePage({ params }: { params: { id: string } }) {
  return <NoteDetailsClient id={params.id} />;
}
