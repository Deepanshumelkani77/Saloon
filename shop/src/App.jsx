import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"
import Footer from "./components/Footer.jsx"
import Hair from "./pages/Hair.jsx"
import Skin from "./pages/Skin.jsx"
import Accessories from './pages/Accessories.jsx';
import Men from './pages/Men.jsx'
import Women from './pages/Women.jsx'
import Show from './pages/Show.jsx'
import Cart from './pages/Cart.jsx'
import Order from './pages/Order.jsx'
import MyOrder from './pages/MyOrder.jsx';
import LoginModal from './components/LoginModal.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loginMode, setLoginMode] = useState('login');

  return (
    <div className="min-h-screen w-full ">
      {/* Navigation */}
      <Navbar setLogin={setShowLogin} setLoginMode={setLoginMode} />

      {/* Main Content */}
      <main className="w-full   px-0">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/hair' element={<Hair />} />
          <Route path='/skin' element={<Skin/>}/>
          <Route path="/accessories" element={<Accessories/>}></Route>
          <Route path='/men' element={<Men/>}/>
          <Route path='/women' element={<Women/>}/>
          <Route path='/show/:id' element={<Show/>} />
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/order' element={<Order/>}/>
              <Route path='/my-order' element={<MyOrder/>}/>
        </Routes>
      </main>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        loginMode={loginMode}
        setLoginMode={setLoginMode}
      />

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
