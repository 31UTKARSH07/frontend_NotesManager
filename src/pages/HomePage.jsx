import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import NotesNotFound from '../components/NotesNotFound'
import toast from 'react-hot-toast';
import { NoteCard } from '../components/NoteCard';
import api from '../lib/axios';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const fetchNotes = async () => {
    try {
      // const res = await fetch("http://localhost:5001/api/notes");
      // const data = await res.json();
      // console.log(data);
      const res = await api.get("/notes");
      // console.log(res)
      console.log(res.data)
      setNotes(res.data)
      setAllNotes(res.data)
      setIsRateLimited(false)
    } catch (error) {
      console.log("Error fetching notes")
      console.log(error);
      if (error.response?.status === 429) {
        setIsRateLimited(true)
      } else {
        toast.error("Failed to load notes")
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSearchResults = (searchResults, isSearch) => {
    if (!isSearch) {
      // No search query, show all notes
      setNotes(allNotes)
      setIsSearchActive(false)
    } else {
      // Show search results
      setNotes(searchResults)
      setIsSearchActive(true)
    }
  }
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setNotes(allNotes)
      setIsSearchActive(false);
      return;
    }
    
    try {
      setLoading(true);
      const res = await api.get(`/notes/search?query=${encodeURIComponent(query)}`);
      setNotes(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  }
  const showAllNotes = () => {
    setNotes(allNotes)
    setIsSearchActive(false)
  }
  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <div className='min-h-screen'>
      <Navbar onSearchResults={handleSearchResults} onSearch={handleSearch} />
      {isRateLimited && <RateLimitedUI />}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {isSearchActive && (
          <div className="mb-4 p-3 bg-info/10 rounded-box flex justify-between items-center">
            <p className="text-sm text-blue-300">
              {notes.length === 1
                ? `Showing: ${notes[0].title}`
                : `Showing ${notes.length} search result${notes.length !== 1 ? 's' : ''}`
              }
            </p>
            <button
              onClick={showAllNotes}
              className="btn btn-sm btn-ghost text-info-content-blue text-blue-300"
            >
              Show All Notes
            </button>
          </div>
        )}
        {loading && <div className='text-center text-primary py-10'></div>}
        {notes.length === 0 && !isRateLimited && <NotesNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default HomePage