import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"

const App = () => {
  return (
    <div className="min-h-screen ">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="w-full ">
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </main>
      
      {/* Footer Spacer */}
      <div className="h-20"></div>
    </div>
  )
}

export default App
