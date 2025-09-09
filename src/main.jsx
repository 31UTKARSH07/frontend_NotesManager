
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/authContext.jsx'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    <Toaster/>
    </BrowserRouter>
)
