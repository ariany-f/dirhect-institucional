import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './components/HomeFoldLayout.css?v=home-fold-20260602'
import App from './App.jsx?v=home-fold-20260605'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
