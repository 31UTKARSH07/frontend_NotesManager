import { PenSquare, Trash2 } from "lucide-react"; 
import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { formatDate } from "../lib/utils"; 

export const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); 
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      // Optimistic UI update for a faster feel
      setNotes((prev) => prev.filter((note) => note._id !== id));
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
      // Here you might want to add the note back if the API call fails
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    // Here you would navigate to the edit page or open a modal
    // For now, let's just log it.
    // navigate(`/note/edit/${note._id}`);
    console.log("Edit note:", note._id);
    toast("Edit functionality coming soon!");
  };

  const truncate = (str, num) => {
    return str.length > num ? str.slice(0, num) + "..." : str;
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="group flex flex-col bg-white rounded-lg border border-slate-200 
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-full h-1.5 bg-[#00FF9D] rounded-t-lg"></div>

      <div className="p-6 flex-grow">
        <h3 className="font-bold text-lg text-slate-800 mb-2">{note.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {truncate(note.content, 120)}
        </p>
      </div>

      <div className="border-t border-slate-100 px-6 py-4 flex justify-between items-center">
        <span className="text-xs text-slate-500">
          {formatDate(new Date(note.createdAt))}
        </span>

        <div className="flex items-center gap-2 text-slate-400">
          <button
            onClick={handleEdit}
            className="p-2 rounded-md hover:bg-slate-100 hover:text-slate-700 transition-colors"
            aria-label="Edit Note"
          >
            <PenSquare size={16} />
          </button>
          <button
            onClick={(e) => handleDelete(e, note._id)}
            className="p-2 rounded-md hover:bg-red-100 hover:text-red-600 transition-colors"
            aria-label="Delete Note"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
};
