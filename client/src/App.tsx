import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Index } from './pages/index.tsx'
import { Login } from './pages/Login/index.tsx'
import './App.css'
import { PrivateRoute } from './components/PrivateRoute/index.tsx'

function App() {
  return (
    <BrowserRouter>
      <PrivateRoute>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
        </Routes>
      </PrivateRoute>
    </BrowserRouter>
  )
}

export default App
