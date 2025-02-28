import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/index'
import { Login } from './pages/Login/index'
import './App.css'
import { PrivateRoute } from './components/PrivateRoute/index'
import CreateMovie from './pages/CreateMovie/index'
import ViewMovie from './pages/ViewMovie/index'
import Account from './pages/Account'

function App() {
  return (
    <BrowserRouter>
      <PrivateRoute>
        <Routes>
          <Route path="/view-movie/:id" element={<ViewMovie />} />
          <Route path="/create-movie" element={<CreateMovie />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/list" element={<Index />} />
        </Routes>
      </PrivateRoute>
    </BrowserRouter>
  )
}

export default App
