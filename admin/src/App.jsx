import React, { useContext, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard.jsx'
import Appointment from './pages/Appointment.jsx'
import Service from './pages/Service.jsx'
import Specialist from './pages/Specialist.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'
import Feedback from './pages/Feedback.jsx'
import { AppContext } from './context/AppContext'
import Order from "./pages/Order.jsx"
import Inventory from './pages/Inventory.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const { sidebarOpen, admin, token, openLogin, setOpenLogin } = useContext(AppContext);
  const location = useLocation();

  // Check for justLoggedIn or justSignedUp flags
  useEffect(() => {
    const justLoggedIn = localStorage.getItem('justLoggedIn');
    const justSignedUp = localStorage.getItem('justSignedUp');

    if (justLoggedIn) {
      localStorage.removeItem('justLoggedIn');
      // Force scroll to top after login
      window.scrollTo(0, 0);
    }

    if (justSignedUp) {
      localStorage.removeItem('justSignedUp');
      setOpenLogin(true);
    }
  }, []);

  // If not logged in and not on login page, redirect to login
  if (!admin && !token && location.pathname !== '/login') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If logged in and on login page, redirect to home
  if ((admin || token) && location.pathname === '/login') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen">
      {/* Show navbar only when logged in */}
      {admin && token && <Navbar />}

      {/* Main Layout */}
      <div className="flex relative">
        {/* Show sidebar only when logged in */}
        {admin && token && <Sidebar />}
        
        {/* Main Content */}
        <main className={`
          flex-1 
          transition-all duration-300 ease-in-out
          ${admin && token ? 'h-[90vh]' : 'h-screen'}
          overflow-y-auto 
          ${sidebarOpen ? 'ml-64' : 'ml-0'}
        `}>
          <Routes>
            <Route path="/login" element={!admin && !token ? <Login /> : <Navigate to="/" replace />} />
            <Route path="/" element={admin && token ? <Dashboard /> : <Navigate to="/login" replace />} />
            <Route path="/appointments" element={admin && token ? <Appointment /> : <Navigate to="/login" replace />} />
            <Route path="/services" element={admin && token ? <Service /> : <Navigate to="/login" replace />} />
            <Route path="/staff" element={admin && token ? <Specialist /> : <Navigate to="/login" replace />} />
            <Route path="/profile" element={admin && token ? <Profile /> : <Navigate to="/login" replace />} />
            <Route path="/orders" element={admin && token ? <Order /> : <Navigate to="/login" replace />} />
            <Route path="/feedback" element={admin && token ? <Feedback /> : <Navigate to="/login" replace />} />
            <Route path="/inventory" element={admin && token ? <Inventory /> : <Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Show footer only when logged in */}
      {admin && token && <Footer />}
      
      {/* Toast Container */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default App
