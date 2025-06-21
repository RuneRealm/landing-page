import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoute } from './utils/routing'
import { Analytics } from './shared/components'
import Layout from './shared/components/Layout'
import { Loading } from './shared/components/Loading/Loading'
import HomePage from './pages/Home/HomePage'
import GlobalStyles from './GlobalStyles'

// Create route with automatic eager loading
const Roadmap = createRoute(() => import('./pages/Roadmap'))

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Analytics>
          <Layout>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<Roadmap />} />
              </Routes>
            </Suspense>
          </Layout>
        </Analytics>
      </BrowserRouter>
    </>
  )
}

export default App
