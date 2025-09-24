import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI";
import NotesNotFound from "../components/NotesNotFound";
import toast from "react-hot-toast";
import { NoteCard } from "../components/NoteCard.jsx";
import NoteModal from "../components/NoteModal.jsx";
import api from "../lib/axios.js";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/notes");
      setNotes(res.data);
      setAllNotes(res.data);
      setIsRateLimited(false);
    } catch (error) {
      console.log("Error fetching notes", error);
      if (error.response?.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error("Failed to load notes");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchResults = (searchResults, isSearch) => {
    setIsSearchActive(isSearch);
    if (isSearch) {
      setNotes(searchResults);
    } else {
      setNotes(allNotes);
    }
  };

  const showAllNotes = () => {
    setNotes(allNotes);
    setIsSearchActive(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
  };

  const handleSavedNote = async (noteData) => {
    try {
      if (editingNote) {
        await api.put(`/notes/${editingNote._id}`, noteData);
        toast.success("Note Updated Successfully");
      } else {
        await api.post("/notes", noteData);
        toast.success("Note created Successfully!");
      }
      handleCloseModal();
      fetchNotes();
    } catch (error) {
      console.error("Failed to save note", error);
      toast.error("Failed to save note");
    }
  };

  return (
    <div className="min-h-screen bg-sky-100">
      <Navbar
        onSearchResults={handleSearchResults}
        onCreateNote={handleOpenCreateModal}
      />

      {isRateLimited && <RateLimitedUI />}

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="pt-8">
          {isSearchActive && (
            <div className="mb-6 p-3 bg-indigo-100 border border-indigo-200 rounded-lg flex justify-between items-center text-sm">
              <p className="text-indigo-800">
                Showing <span className="font-semibold">{notes.length}</span>{" "}
                search result{notes.length !== 1 ? "s" : ""}.
              </p>
              <button
                onClick={showAllNotes}
                className="font-medium text-indigo-600 hover:text-indigo-800"
              >
                Show All Notes
              </button>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700"></div>
            </div>
          )}

          {!loading && notes.length === 0 && !isRateLimited && (
            <NotesNotFound
              isSearchActive={isSearchActive}
              onCreateNote={handleOpenCreateModal}
            />
          )}

          {!loading && notes.length > 0 && !isRateLimited && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  setNotes={setNotes}
                  onEdit={handleOpenEditModal}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSavedNote}
        note={editingNote}
      />
    </div>
  );
};
export default HomePage;
