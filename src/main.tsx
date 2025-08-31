import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import HomePage from './pages/home'
import NewsPage from './pages/news'
import NewsDetailPage from './pages/news/NewsDetail'
import SectionDetailPage from './pages/section/SectionDetail'


const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    // errorElement: <ErrorBoundary />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/news', element: <NewsPage /> },
      { path: '/news/:id', element: <NewsDetailPage /> },
      // Маршрут для страниц подразделов
      { path: '/:section', element: <SectionDetailPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
