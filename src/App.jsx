import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotesNotFound from "./components/NotesNotFound";
import NoteDetailPage from "./pages/NoteDetailPage";
import CreatePage from "./pages/CreatePage";
import TagPage from "./pages/TagPage";
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
          <Route path="/tags/:tag" element={<TagPage />} />
        <Route path="*" element={<NotesNotFound />} />
      </Routes>
    </div>
  );
};
export default App;
