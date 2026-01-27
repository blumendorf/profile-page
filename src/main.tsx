import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { PageLoader } from '@/components/ui'
import { initializeTheme } from '@/features/shared'
import './index.css'

// Lazy load non-critical routes for code splitting
const LabIndex = lazy(() => import('@/features/lab/LabIndex'))
const HTMLPlayground = lazy(() =>
  import('@/features/lab/html').then((m) => ({ default: m.HTMLPlayground }))
)
const EvalPlayground = lazy(() =>
  import('@/features/lab/eval/EvalPlayground').then((m) => ({ default: m.EvalPlayground }))
)
const CompareViewsPlayground = lazy(() =>
  import('@/features/lab/compare').then((m) => ({ default: m.CompareViewsPlayground }))
)
const Impressum = lazy(() =>
  import('@/features/home').then((m) => ({ default: m.Impressum }))
)

// Initialize theme before render to prevent flash of wrong theme
initializeTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/lab',
    element: <Suspense fallback={<PageLoader />}><LabIndex /></Suspense>,
  },
  {
    path: '/lab/html',
    element: <Suspense fallback={<PageLoader />}><HTMLPlayground /></Suspense>,
  },
  {
    path: '/lab/eval',
    element: <Suspense fallback={<PageLoader />}><EvalPlayground /></Suspense>,
  },
  {
    path: '/lab/compare',
    element: <Suspense fallback={<PageLoader />}><CompareViewsPlayground /></Suspense>,
  },
  {
    path: '/impressum',
    element: <Suspense fallback={<PageLoader />}><Impressum /></Suspense>,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
