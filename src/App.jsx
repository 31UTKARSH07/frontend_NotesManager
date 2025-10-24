import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import NotesNotFound from "./components/NotesNotFound.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";
import TagPage from "./pages/TagPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ArchivedPage from "./pages/ArchivedPage.jsx";
import TrashPage from "./pages/TrashPage.jsx";
import SharedNotePage from "./pages/SharedNotePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const App = () => {
  return (
    <div className="p-5">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/archived" element={<ArchivedPage />} />
        <Route path="/trash" element={<TrashPage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
        <Route path="/tags/:tag" element={<TagPage />} />
        <Route path="/share/:sharedId" element={<SharedNotePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotesNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
