import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { SessionProvider } from './hooks/SignOut.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SnackbarProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </SnackbarProvider>
  </BrowserRouter>,
)
