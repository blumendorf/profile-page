import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import LabIndex from '@/features/lab/LabIndex'
import { HTMLPlayground } from '@/features/lab/html'
import { EvalPlayground } from '@/features/lab/eval/EvalPlayground'
import { CompareViewsPlayground } from '@/features/lab/compare'
import { Impressum } from '@/features/home'
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
  // HTML Generator experiment
  {
    path: '/lab/html',
    element: <HTMLPlayground />,
  },
  // Evaluation playground
  {
    path: '/lab/eval',
    element: <EvalPlayground />,
  },
  // Compare Views experiment
  {
    path: '/lab/compare',
    element: <CompareViewsPlayground />,
  },
  // Impressum (Legal Notice)
  {
    path: '/impressum',
    element: <Impressum />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
