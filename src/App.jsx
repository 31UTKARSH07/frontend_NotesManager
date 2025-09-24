import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import NotesNotFound from "./components/NotesNotFound.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";
import TagPage from "./pages/TagPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";

const App = () => {
  console.log("App rendered"); 
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0 -z-10 min-h-screen w-full items-center
       px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"
      />
      {/* <button className='btn btn-primary'>Click Me</button> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
          <Route path="/tags/:tag" element={<TagPage />} />
        <Route path="*" element={<NotesNotFound />} />
      </Routes>
    </div>
  );
};
export default App;
