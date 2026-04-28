import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { PageLoader } from '@/components/ui'
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
const DesignAndAiIntro = lazy(() =>
  import('@/features/lab/design-and-ai').then((m) => ({ default: m.IntroPage }))
)
const DesignAndAiDesignMd = lazy(() =>
  import('@/features/lab/design-and-ai').then((m) => ({ default: m.DesignMdPage }))
)
const DesignAndAiStorybook = lazy(() =>
  import('@/features/lab/design-and-ai').then((m) => ({ default: m.StorybookPage }))
)
const DesignAndAiComponentsAndTokens = lazy(() =>
  import('@/features/lab/design-and-ai').then((m) => ({ default: m.ComponentsAndTokensPage }))
)
const DesignAndAiFigmaJobs = lazy(() =>
  import('@/features/lab/design-and-ai').then((m) => ({ default: m.FigmaJobsPage }))
)
const DesignAndAiTools = lazy(() =>
  import('@/features/lab/design-and-ai').then((m) => ({ default: m.ToolsPage }))
)
const DesignAndAiWorkflow = lazy(() =>
  import('@/features/lab/design-and-ai').then((m) => ({ default: m.WorkflowPage }))
)
const Impressum = lazy(() =>
  import('@/features/home').then((m) => ({ default: m.Impressum }))
)

const router = createBrowserRouter(
  [
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
      path: '/lab/design-and-ai',
      element: <Suspense fallback={<PageLoader />}><DesignAndAiIntro /></Suspense>,
    },
    {
      path: '/lab/design-and-ai/design-md',
      element: <Suspense fallback={<PageLoader />}><DesignAndAiDesignMd /></Suspense>,
    },
    {
      path: '/lab/design-and-ai/storybook',
      element: <Suspense fallback={<PageLoader />}><DesignAndAiStorybook /></Suspense>,
    },
    {
      path: '/lab/design-and-ai/components-and-tokens',
      element: <Suspense fallback={<PageLoader />}><DesignAndAiComponentsAndTokens /></Suspense>,
    },
    {
      path: '/lab/design-and-ai/figma-jobs',
      element: <Suspense fallback={<PageLoader />}><DesignAndAiFigmaJobs /></Suspense>,
    },
    {
      path: '/lab/design-and-ai/tools',
      element: <Suspense fallback={<PageLoader />}><DesignAndAiTools /></Suspense>,
    },
    {
      path: '/lab/design-and-ai/workflow',
      element: <Suspense fallback={<PageLoader />}><DesignAndAiWorkflow /></Suspense>,
    },
    {
      path: '/impressum',
      element: <Suspense fallback={<PageLoader />}><Impressum /></Suspense>,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
