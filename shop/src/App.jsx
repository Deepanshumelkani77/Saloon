import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"

const App = () => {
  return (
    <div className="min-h-screen w-full ">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="w-full   px-0">
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </main>
      
      {/* Footer Spacer */}
      <div className="h-16 sm:h-20 md:h-24"></div>
    </div>
  )
}

export default App
