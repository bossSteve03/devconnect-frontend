import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ProjectsProvider } from './context/index.jsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ProjectsProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ProjectsProvider>
)
