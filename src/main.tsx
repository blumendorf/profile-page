import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import LabIndex from './pages/lab/LabIndex'
import { ConfigLanding, ConfigAdaptive } from './pages/lab/config'
import { HTMLLanding, HTMLPlayground } from './pages/lab/html'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/lab',
    element: <LabIndex />,
  },
  // Config Generator experiment
  {
    path: '/lab/config',
    element: <ConfigLanding />,
  },
  {
    path: '/lab/config/adaptive',
    element: <ConfigAdaptive />,
  },
  // HTML Generator experiment
  {
    path: '/lab/html',
    element: <HTMLLanding />,
  },
  {
    path: '/lab/html/playground',
    element: <HTMLPlayground />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
