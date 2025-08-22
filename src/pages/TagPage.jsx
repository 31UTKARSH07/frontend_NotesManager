import { use, useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react";


const TagPage = () => {
    const { tag } = useParams();
    const [notes, setNotes] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get(`/notes/tag/${tag}`);
                setNotes(res.data);
            } catch (error) {
                console.error("Error fetching notes by tag: ", error);
                toast.error("Failed to load notes")
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
            <h1 className="text-2xl font-bold mb-4">
                Notes tagged with: <span className="text-primary">#{tag}</span>
            </h1>
            {notes.length === 0 ? (
                <p>No notes found for this tag.</p>
            ) : (
                <div className="grid gap-4">
                    {notes.map((note) => (
                        <Link
                            to={`/notes/${note._id}`}
                            key={note._id}
                            className="card bg-base-100 shadow-md p-4 hover:shadow-lg"
                        >
                            <h2 className="text-lg font-semibold">{note.title}</h2>
                            <p className="text-gray-600">{note.content.slice(0, 100)}...</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TagPage;