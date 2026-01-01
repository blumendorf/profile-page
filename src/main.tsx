import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import LabIndex from '@/features/lab/LabIndex'
import { ConfigLanding, ConfigPlayground } from '@/features/lab/config'
import { HTMLPlayground } from '@/features/lab/html'
import { CanvasLanding, CanvasPlayground } from '@/features/lab/canvas'
import { EvalPlayground } from '@/features/lab/eval/EvalPlayground'
import { initializeTheme } from '@/features/shared'
import './index.css'

// Initialize theme before render to prevent flash of wrong theme
initializeTheme();

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
    path: '/lab/config/playground',
    element: <ConfigPlayground />,
  },
  // HTML Generator experiment
  {
    path: '/lab/html',
    element: <HTMLPlayground />,
  },
  // Living Canvas experiment
  {
    path: '/lab/canvas',
    element: <CanvasLanding />,
  },
  {
    path: '/lab/canvas/playground',
    element: <CanvasPlayground />,
  },
  // Evaluation playground
  {
    path: '/lab/eval',
    element: <EvalPlayground />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
