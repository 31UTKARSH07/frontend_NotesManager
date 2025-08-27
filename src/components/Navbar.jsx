import { PlusIcon, SearchIcon } from 'lucide-react'
import { Link } from "react-router-dom"
import { useState } from 'react'
import axios from '../lib/axios'

const Navbar = ({ onSearchResults }) => {
  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) {
      setSearchResults([])
      setShowDropdown(false)
      // Pass empty results to parent to show all notes
      if (onSearchResults) {
        onSearchResults([])
      }
      return
    }

    setIsSearching(true)
    try {
      const response = await axios.get(`/notes/search?query=${encodeURIComponent(query.trim())}`)
      setSearchResults(response.data)
      setShowDropdown(true)
      
      if (onSearchResults) {
        onSearchResults(response.data,true)
      }
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
      setShowDropdown(false)
      if (onSearchResults) {
        onSearchResults([],false)
      }
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false)
    }, 200)
  }

  const handleClearSearch = () => {
    setQuery("")
    setSearchResults([])
    setShowDropdown(false)
    if (onSearchResults) {
      onSearchResults([],false)
    }
  }

  const handleNoteSelect = (note) => {
    if (onSearchResults) {
      onSearchResults([note], true)
    }
    setShowDropdown(false)
    setQuery(note.title)
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
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (searchResults.length > 0) {
                  setShowDropdown(true)
                }
              }}
              onBlur={handleBlur}
              className="input input-bordered pr-20"
            />
            
            <SearchIcon
              onClick={handleSearch}
              className={`size-5 absolute right-12 top-1/2 -translate-y-1/2 cursor-pointer ${
                isSearching ? 'text-primary animate-pulse' : 'text-gray-400 hover:text-primary'
              }`}
            />
            
            {/* Clear button when there's a query */}
            {query && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 -translate-y-4 text-gray-400 hover:text-primary text-xl font-bold"
              >
                ×
              </button>
            )}

            {/* Dropdown for quick navigation */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full w-full mt-2 bg-base-200 border border-base-content/10 rounded-box shadow-lg z-10 max-h-60 overflow-y-auto">
                {searchResults.map((note) => (
                  <div
                    key={note._id}
                    className="block p-3 hover:bg-base-300 transition-colors duration-200 cursor-pointer"
                    onClick={() => handleNoteSelect(note)}
                  >
                    <p className="font-semibold text-sm">{note.title}</p>
                    {note.content && (
                      <p className="text-xs text-base-content/60 truncate mt-1">
                        {note.content.substring(0, 100)}...
                      </p>
                    )}
                  </div>
                ))}
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
  )
}

export default Navbar