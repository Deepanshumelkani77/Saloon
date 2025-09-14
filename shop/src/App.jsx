import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"
import Footer from "./components/Footer.jsx"
import Hair from "./pages/Hair.jsx"

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
      
     
    </div>
  )
}

export default App
