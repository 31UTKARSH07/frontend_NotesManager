import { useEffect, useState } from "react";
import axios from "../lib/axios";
import {NoteCard} from "../components/NoteCard";

export default function ArchivePage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchArchived = async () => {
      try {
        const res = await axios.get("/notes/archived");
        setNotes(res.data);
      } catch (err) {
        console.error("Failed to fetch archived notes:", err);
      }
    };
    fetchArchived();
  }, []);
  const handleUnarchive = async (id) => {
    try {
      await axios.put(`/notes/${id}/archive`);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Failed to unarchive note:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Archived Notes</h2>
      {notes.length === 0 ? (
        <p className="text-gray-500">No archived notes found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onUnarchive={() => handleUnarchive(note._id)}
              isArchivedPage
            />
          ))}
        </div>
      )}
    </div>
  );
}
