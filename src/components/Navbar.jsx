import { PlusIcon, SearchIcon } from 'lucide-react'
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from '../lib/axios'

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  }
}

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const debouncedSearch = debounce(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    try {
      const response = await axios.get(`/notes/search?query=${searchQuery}`);
      setSearchResults(response.data);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
      setShowResults(false);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(query);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  }

  const handleBlur = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  }

  return (
    <header className="bg-base-300 border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
            ThinkBoard
          </h1>

          <div className="relative flex items-center gap-2">
            <input
              type="text"
              placeholder="Search notes..."
              value={query}
              onChange={handleInputChange}
              onFocus={() => {
                if (searchResults.length > 0 || query.length > 0) {
                  setShowResults(true);
                }
              }}
              onBlur={handleBlur}
              className="input input-bordered"
            />
            <SearchIcon className="size-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />

            {showResults && (
              <div className="absolute top-full w-full mt-2 bg-base-200 border border-base-content/10 rounded-box shadow-lg z-10 max-h-60 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((note) => (
                    <Link
                      key={note._id}
                      to={`/notes/${note._id}`}
                      className="block p-3 hover:bg-base-300 transition-colors duration-200"
                    >
                      <p className="font-semibold text-sm">{note.title}</p>
                    </Link>
                  ))
                ) : (
                  <p className="p-3 text-sm text-center text-base-content/60">
                    No notes found
                  </p>
                )}
              </div>
            )}
          </div>

          <div>
            <Link to="/create" className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
