import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Appointment from './pages/Appointment'
import Service from './pages/Service'
import Specialist from './pages/Specialist'


const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />

      <main>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/appointments' element={<Appointment />} />
          <Route path='/services' element={<Service />} />
           <Route path='/specialists' element={<Specialist />} />

        </Routes>
      </main>

      <Footer />

    </div>
  )
}

export default App


      
  
