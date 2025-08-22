import { PlusIcon, SearchIcon } from 'lucide-react'
import { Link } from "react-router-dom"
import { useState } from 'react'

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  }
  return (
    <header className='bg-base-300 border-base-content/10'>
      <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter'>ThinkBoard</h1>
          <form onSubmit={handleSearch} className='flex items-center gap-2'>
            <input
              type='text'
              placeholder='Search notes...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='input imput-bordered'
            />
            <button type='submit' className='btn btn-secondary'>
              <SearchIcon className='size-5 ' />
            </button>
          </form>
          <div>
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className='size-5' />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Navbar