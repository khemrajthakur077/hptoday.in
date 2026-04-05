import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Tracker from './components/Tracker.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Tracker /> {/* ✅ visitor tracking */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)