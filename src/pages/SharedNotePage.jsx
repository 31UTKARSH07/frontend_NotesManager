import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../lib/axios'; // 👈 THE ONLY CHANGE IS ON THIS LINE

const SharedNotePage = () => {
  const { sharedId } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!sharedId) return;

    const fetchSharedNote = async () => {
      try {
        // This now uses your configured axios instance
        const response = await axios.get(`/notes/public/${sharedId}`);
        setNote(response.data);
      } catch (err) {
        setError('Note not found or is no longer shared.');
        console.error("Error fetching shared note:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedNote();
  }, [sharedId]);

  if (loading) {
    return <div className="text-center p-10">Loading note...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-base-200 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4">{note.title}</h1>
      <p className="text-sm text-base-content/60 mb-6">
        Last updated on {new Date(note.updatedAt).toLocaleDateString()}
      </p>
      <div className="prose max-w-none">
        <p>{note.content}</p>
      </div>
    </div>
  );
};

export default SharedNotePage;