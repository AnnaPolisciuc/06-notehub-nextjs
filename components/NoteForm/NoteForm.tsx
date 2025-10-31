"use client";

import { useState } from "react";
import css from "./NoteForm.module.css";
import type { NoteCreate } from "@/types/note";

interface NoteFormProps {
  onSubmit: (note: NoteCreate) => void;
}

export default function NoteForm({ onSubmit }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmit({
        title, content,
        tag: "Todo"
    });
    setTitle("");
    setContent("");
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={css.textarea}
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className={css.submitButton} type="submit">Create Note</button>
    </form>
  );
}
