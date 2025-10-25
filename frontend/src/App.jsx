import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Ladies from './pages/Ladies.jsx';
import Gents from './pages/Gents.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Appointment from './pages/Appointment.jsx';
import Login from './pages/Login.jsx';
import {useState, useEffect, useContext} from 'react';
import { AppContext } from './context/AppContext.jsx';
import Cookies from 'js-cookie';
import MyAppointment from './pages/MyAppointment.jsx';
import MyProfile from './pages/MyProfile.jsx';
import Offer from './pages/Offer.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

const [login,setLogin] = useState(false);
const [loginMode, setLoginMode] = useState('login');
const { setUser } = useContext(AppContext);

// Handle Google OAuth callback
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const userParam = urlParams.get('user');
  
  if (token && userParam) {
    try {
      const userData = JSON.parse(decodeURIComponent(userParam));
      
      // Store token and user data
      Cookies.set("token", token, { expires: 1 });
      Cookies.set("user", JSON.stringify(userData), { expires: 1 });
      setUser(userData);
      
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (error) {
      console.error("Error parsing Google OAuth response:", error);
    }
  }
}, [setUser]);

  return (
    <div className="min-h-screen  flex flex-col">
      <Navbar setLogin={setLogin} setLoginMode={setLoginMode} />
       {login && <Login onClose={() => setLogin(false)} initialMode={loginMode} />}
      <main className="flex-1 w-full  mx-auto  mt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ladies" element={<Ladies />} />
          <Route path="/gents" element={<Gents />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/my-appointments" element={<MyAppointment />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/offer" element={<Offer />} />
         
        </Routes>
      </main>
      <Footer/>
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
  );
}

export default App;