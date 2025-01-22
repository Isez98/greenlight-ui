import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Index } from './pages/index.tsx'
import { Login } from './pages/Login/index.tsx'
import './App.css'
import { PrivateRoute } from './components/PrivateRoute/index.tsx'
import { CreateMovie } from './pages/CreateMovie/index.tsx'

function App() {
  return (
    <BrowserRouter>
      <PrivateRoute>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create-movie" element={<CreateMovie />} />
          <Route path="/" element={<Index />} />
        </Routes>
      </PrivateRoute>
    </BrowserRouter>
  )
}

export default App
