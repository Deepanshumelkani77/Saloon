import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Ladies from './pages/Ladies.jsx';
import Gents from './pages/Gents.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Appointment from './pages/Appointment.jsx';

function App() {
  return (
    <div className="min-h-screen  flex flex-col">
      <Navbar />
      <main className="flex-1 w-full  mx-auto  mt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ladies" element={<Ladies />} />
          <Route path="/gents" element={<Gents />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={<Appointment />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;