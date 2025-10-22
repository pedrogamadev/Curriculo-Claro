import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ResumeProvider } from './context/ResumeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ResumeProvider>
      <App />
    </ResumeProvider>
  </StrictMode>,
)
