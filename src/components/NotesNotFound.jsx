import { NotebookIcon } from "lucide-react";
const NotesNotFound = ({ isSearchActive, onCreateNote }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-indigo-100 rounded-full p-8">
        <NotebookIcon className="size-10 text-indigo-600" />
      </div>
      <h3 className="text-2xl font-bold text-slate-800">
        {isSearchActive ? "No Results Found" : "No notes yet"}
      </h3>
      <p className="text-slate-600">
        {isSearchActive 
          ? "We couldn't find any notes matching your search. Try different keywords." 
          : "Ready to organize your thoughts? Create your first note to get started on your journey."
        }
      </p>

      {!isSearchActive && (
        <button 
          onClick={onCreateNote} 
          className="px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
        >
          Create Your First Note
        </button>
      )}
    </div>
  );
};

export default NotesNotFound;
