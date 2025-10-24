# ThinkBoard 📝

A modern, intelligent note-taking application built with React and featuring cloud sync, tagging system, and intuitive organization.

## ✨ Features

- **Rich Note Management** - Create, edit, archive, and organize your notes effortlessly
- **Intelligent Search** - Quickly find notes with real-time search functionality
- **Tagging System** - Organize notes with flexible tags for easy categorization
- **Archive & Trash** - Safely manage notes with archive and trash functionality
- **Share Notes** - Generate shareable links for your notes
- **Profile Management** - Upload profile pictures and track your note statistics
- **Dark Mode** - Toggle between light and dark themes for comfortable viewing
- **Responsive Design** - Works seamlessly across desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API server running (default: `http://localhost:5001/api`)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/31UTKARSH07/frontend_NotesManager.git
cd thinkboard
```

2. Install dependencies:
```bash
npm install
```

3. Configure the backend URL:
   - Open `src/lib/axios.js`
   - Update `BASE_URL` if your backend is hosted elsewhere

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **React** - UI framework
- **React Router** - Navigation and routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Toast notifications
- **Framer Motion** - Animation library

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar with search
│   ├── NoteCard.jsx    # Individual note display card
│   ├── NoteModal.jsx   # Create/edit note modal
│   ├── ThemeToggle.jsx # Dark/light mode toggle
│   └── ...
├── pages/              # Page components
│   ├── HomePage.jsx    # Main notes dashboard
│   ├── LandingPage.jsx # Welcome/landing page
│   ├── LoginPage.jsx   # User login
│   ├── RegisterPage.jsx # User registration
│   ├── NoteDetailPage.jsx # Individual note view
│   ├── ArchivedPage.jsx # Archived notes
│   ├── TrashPage.jsx   # Deleted notes
│   ├── ProfilePage.jsx # User profile
│   └── ...
├── lib/                # Utility functions
│   ├── axios.js        # Axios configuration
│   └── utils.js        # Helper functions
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

## 🔑 Key Features Explained

### Note Management
- Create notes with titles and content
- Edit notes inline or in detail view
- Add and manage tags for organization
- Archive notes to declutter your workspace
- Move notes to trash (soft delete)
- Permanently delete notes from trash

### Search Functionality
- Real-time search across all notes
- Search results dropdown with previews
- Clear search to return to all notes
- Keyboard shortcuts (Enter to search)

### Sharing
- Generate shareable links for individual notes
- Automatic clipboard copy
- Public access to shared notes (no login required)

### Profile Features
- Upload custom profile pictures
- View total note count
- Display user information

## 🎨 Theming

ThinkBoard supports light and dark themes using DaisyUI. The theme preference is persisted in localStorage and automatically applied on reload.

## 🔐 Authentication

The app uses cookie-based authentication. All API requests include credentials automatically. Users must register and login to access the note-taking features.

## 📱 Responsive Design

ThinkBoard is fully responsive with breakpoints for:
- Mobile devices (< 640px)
- Tablets (640px - 1024px)
- Desktop (> 1024px)

## 🚧 Rate Limiting

The app includes built-in rate limit handling. When rate limits are exceeded, users see a friendly message asking them to wait.

## 🔄 API Integration

All API calls are made through the configured axios instance in `src/lib/axios.js`. The app expects the following endpoints:

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /notes` - Fetch all notes
- `POST /notes` - Create new note
- `PUT /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note
- `PUT /notes/:id/archive` - Toggle archive status
- `PUT /notes/:id/trash` - Move to trash
- `PUT /notes/:id/restore` - Restore from trash
- `GET /notes/search` - Search notes
- `GET /notes/tag/:tag` - Get notes by tag
- `POST /notes/:id/share` - Generate share link
- `GET /notes/public/:sharedId` - Get shared note
- `GET /user/profile` - Get user profile
- `PUT /user/profile/picture` - Upload profile picture

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI components from [DaisyUI](https://daisyui.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

Built with ❤️ using React
