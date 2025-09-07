import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Appointment from './pages/Appointment'
import Service from './pages/Service'
import Specialist from './pages/Specialist'
import { AppContext } from './context/AppContext'

const App = () => {
  const { sidebarOpen } = useContext(AppContext)

  return (
    <div className="min-h-screen ">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex relative">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className={`
          flex-1 
          transition-all duration-300 ease-in-out
          h-[90vh]
          overflow-y-auto 
          
          
        `}>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/appointments' element={<Appointment />} />
            <Route path='/services' element={<Service />} />
            <Route path='/specialists' element={<Specialist />} />
          </Routes>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
