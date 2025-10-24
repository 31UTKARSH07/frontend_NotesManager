import { useEffect, useState } from "react";
import axios from "../lib/axios";
import {NoteCard} from "../components/NoteCard";

export default function TrashPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchTrashed = async () => {
      try {
        const res = await axios.get("/notes/trashed");
        setNotes(res.data);
      } catch (err) {
        console.error("Failed to fetch trashed notes:", err);
      }
    };
    fetchTrashed();
  }, []);

  const handleRestore = async (id) => {
    try {
      await axios.put(`/notes/${id}/restore`);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Restore failed:", err);
    }
  };

  const handlePermanentDelete = async (id) => {
    if (!window.confirm("Permanently delete this note?")) return;
    try {
      await axios.delete(`/notes/${id}/permanent`);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Permanent delete failed:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Trash</h2>
      {notes.length === 0 ? (
        <p className="text-gray-500">Trash is empty.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onRestore={() => handleRestore(note._id)}
              onPermanentDelete={() => handlePermanentDelete(note._id)}
              isTrashPage // 👈 ADD THIS LINE
            />
          ))}
        </div>
      )}
    </div>
  );
}
