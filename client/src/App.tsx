import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Index } from './pages/index.tsx'
import { Login } from './pages/Login/index.tsx'
import './App.css'
import { PrivateRoute } from './components/PrivateRoute/index.tsx'
import { CreateMovie } from './pages/CreateMovie/index.tsx'
import { ViewMovie } from './pages/ViewMovie/index.tsx'

function App() {
  return (
    <BrowserRouter>
      <PrivateRoute>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/view-movie/:id" element={<ViewMovie />} />
          <Route path="/create-movie" element={<CreateMovie />} />
          <Route path="/" element={<Index />} />
        </Routes>
      </PrivateRoute>
    </BrowserRouter>
  )
}

export default App
