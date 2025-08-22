import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import NoteDetailPage from "./pages/NoteDetailPage"
import CreatePage from "./pages/CreatePage"
import toast from 'react-hot-toast'
import TagPage from "./pages/TagPage"
const App = () => {
  return (
    <div className='relative h-full w-full'>
      <div className="absolute inset-0 -z-10 h-full w-full items-center
       px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      {/* <button className='btn btn-primary'>Click Me</button> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
        <Route path="/tags/:tag" element={<TagPage/>}/>
      </Routes>
    </div>
  )
}
export default App

