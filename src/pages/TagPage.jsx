import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react";

const TagPage = () => {
  const navigate = useNavigate();
  const { tag } = useParams();
  const [notes, setNotes] = useState([]); // ✅ initialize as []
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/tag/${tag}`);
        setNotes(res.data);
      } catch (error) {
        console.error("Error fetching notes by tag: ", error);
        toast.error("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [tag]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Notes tagged with: <span className="text-primary">#{tag}</span>
      </h2>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-gray-700 text-white px-4 py-2 rounded-md mb-4 hover:bg-gray-600"
      >
        ← Back
      </button>

      {notes.length === 0 ? (
        <p>No notes found for this tag.</p>
      ) : (
        <div className="grid gap-4">
          {notes.map((note) => (
            <Link
              key={note._id}
              to={`/notes/${note._id}`}
              className="card bg-base-100 shadow-md p-4 hover:shadow-lg"
            >
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <p className="text-gray-600">
                {note.content.substring(0, 80)}...
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagPage;
