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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
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
          md:ml-64
          min-h-[calc(100vh-10vh)]
          p-4 md:p-6 lg:p-8
          bg-gradient-to-br from-gray-900/30 via-black/30 to-gray-900/30
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
