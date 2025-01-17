import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Index } from './pages/index.tsx'
import { Login } from './pages/Login/index.tsx'
import { useState } from 'react'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
