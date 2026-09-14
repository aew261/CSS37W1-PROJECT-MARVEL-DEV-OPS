import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '../styles/shared/global.css'
import '../styles/shared/variables.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
