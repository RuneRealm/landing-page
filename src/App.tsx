import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from './shared/components'
import Layout from './shared/components/Layout'
import { Loading } from './shared/components/Loading/Loading'
import HomePage from './pages/Home/HomePage'
import GlobalStyles from './GlobalStyles'
import { createRoute } from './utils/routing'

// Create route with automatic eager loading
const Roadmap = createRoute(() => import('./pages/Roadmap/RoadmapPage'))
const Game = createRoute(() => import('./pages/Game/GamePage'))


function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Analytics>
          <Layout>
            {/* <Suspense fallback={<Loading />}> */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/game" element={<Game />} />
                <Route path="/game/:section" element={<Game />} />
                <Route path="/features" element={<HomePage />} />
                <Route path="/experience" element={<HomePage />} />
                <Route path="/ownership" element={<HomePage />} />
                <Route path="/signup" element={<HomePage />} />
              </Routes>
            {/* </Suspense> */}
          </Layout>
        </Analytics>
      </BrowserRouter>
    </>
  )
}

export default App
