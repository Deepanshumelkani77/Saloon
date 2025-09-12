import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"


const App = () => {
  return (
    <div>
      <Navbar/>

      <main>
<Routes>
  <Route path='/' element={<Home/>}/>
</Routes>
      </main>
      
    </div>
  )
}

export default App
