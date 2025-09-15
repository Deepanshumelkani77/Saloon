import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"
import Footer from "./components/Footer.jsx"
import Hair from "./pages/Hair.jsx"
import Skin from "./pages/Skin.jsx"

const App = () => {
  return (
    <div className="min-h-screen w-full ">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="w-full   px-0">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/hair' element={<Hair />} />
          <Route path='/skin' element={<Skin/>}/>
        </Routes>
      </main>
       <Footer/>
     
    </div>
  )
}

export default App
