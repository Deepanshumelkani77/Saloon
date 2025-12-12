import React, { useContext, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
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
import Footer from './components/Footer'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { admin, token } = useContext(AppContext);
  const location = useLocation();

  if (!admin || !token) {
    // Redirect to login but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const App = () => {
  const { sidebarOpen, admin, token } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to login if not authenticated and not already on login page
  useEffect(() => {
    if (!admin && !token && location.pathname !== '/login') {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [admin, token, location, navigate]);

  // If not authenticated, only show login page
  if (!admin && !token) {
    return (
      <div className="min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" state={{ from: location.pathname }} replace />} />
        </Routes>
        <ToastContainer />
      </div>
    );
  }

  // If authenticated, show the full layout
  return (
    <div className="min-h-screen">
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
          ${sidebarOpen ? 'ml-64' : 'ml-0'}
        `}>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/appointments" element={
              <ProtectedRoute>
                <Appointment />
              </ProtectedRoute>
            } />
            <Route path="/services" element={
              <ProtectedRoute>
                <Service />
              </ProtectedRoute>
            } />
            <Route path="/staff" element={
              <ProtectedRoute>
                <Specialist />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            } />
            <Route path="/inventory" element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            } />
            <Route path="/feedback" element={
              <ProtectedRoute>
                <Feedback />
              </ProtectedRoute>
            } />
            <Route path="/login" element={
              <Navigate to="/" replace />
            } />
            <Route path="*" element={
              <ProtectedRoute>
                <Navigate to="/" replace />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>

      {/* Footer */}
      <Footer />
      
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
