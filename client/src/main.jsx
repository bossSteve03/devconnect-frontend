import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ProjectsProvider ,UserProvider } from './context/index.jsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>

  <ProjectsProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ProjectsProvider>
  </UserProvider>
)
