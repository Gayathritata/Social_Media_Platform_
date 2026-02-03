import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './theme/theme.css'

import App from './App.jsx'
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { PostProvider } from './context/PostContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <PostProvider>
          <App />
        </PostProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
