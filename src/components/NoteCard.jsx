import {
  PenSquare,
  Trash2,
  Archive,
  ArchiveRestore,
  RotateCcw,
  XCircle,
  Share2,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { formatDate } from "../lib/utils.js";

export const NoteCard = ({
  note,
  onEdit,
  setNotes,
  onUnarchive,
  onRestore,
  onPermanentDelete,
  isArchivedPage,
  isTrashPage,
}) => {
  const [loading, setLoading] = useState(false);

  const handleShare = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/notes/${note._id}/share`);
      const shareLink = `${window.location.origin}/share/${res.data.sharedId}`;

      // Copy link to clipboard
      await navigator.clipboard.writeText(shareLink);
      toast.success("Shareable link copied to clipboard!");
    } catch (err) {
      console.error("Share failed", err);
      toast.error("Failed to create share link");
    }
  };

  const toggleArchive = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.put(`/notes/${note._id}/archive`);
      toast.success(
        res.data.note.isArchived
          ? "Note moved to Archive"
          : "Note restored from Archive"
      );
      if (setNotes) {
        setNotes((prev) =>
          prev.map((n) =>
            n._id === note._id
              ? { ...n, isArchived: res.data.note.isArchived }
              : n
          )
        );
      }
    } catch (err) {
      console.error("Archive failed", err);
      toast.error("Failed to update archive status");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Move this note to Trash?")) return;
    try {
      setNotes((prev) => prev.filter((note) => note._id !== id));
      await api.put(`/notes/${id}/trash`);
      toast.success("Note moved to Trash");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to move note to Trash");
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    onEdit && onEdit(note);
  };

  const truncate = (str, num) => {
    return str.length > num ? str.slice(0, num) + "..." : str;
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className={`group flex flex-col rounded-lg border transition-all duration-300
        ${
          note.isArchived
            ? "bg-gray-200 border-gray-300"
            : "bg-white border-slate-200 hover:shadow-xl hover:-translate-y-1"
        }
      `}
    >
      <div
        className={`w-full h-1.5 rounded-t-lg ${
          note.isArchived ? "bg-gray-400" : "bg-[#00FF9D]"
        }`}
      ></div>

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
          {/* When on Trash Page */}
          {isTrashPage ? (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onRestore && onRestore(note._id);
                }}
                className="p-2 rounded-md hover:bg-green-100 hover:text-green-700"
                disabled={loading}
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onPermanentDelete && onPermanentDelete(note._id);
                }}
                className="p-2 rounded-md hover:bg-red-100 hover:text-red-700"
                disabled={loading}
              >
                <XCircle size={16} />
              </button>
            </>
          ) : isArchivedPage ? (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onUnarchive && onUnarchive(note._id);
                }}
                className="p-2 rounded-md hover:bg-blue-100 hover:text-blue-700"
                disabled={loading}
              >
                <ArchiveRestore size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="p-2 rounded-md hover:bg-slate-100 hover:text-slate-700"
                disabled={loading}
              >
                <PenSquare size={16} />
              </button>

              <button
                onClick={toggleArchive}
                className="p-2 rounded-md hover:bg-blue-100 hover:text-blue-700"
                disabled={loading}
              >
                {note.isArchived ? (
                  <ArchiveRestore size={16} />
                ) : (
                  <Archive size={16} />
                )}
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-md hover:bg-green-100 hover:text-green-700"
              >
                <Share2 size={16} />
              </button>
              <button
                onClick={(e) => handleDelete(e, note._id)}
                className="p-2 rounded-md hover:bg-red-100 hover:text-red-600"
                disabled={loading}
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
