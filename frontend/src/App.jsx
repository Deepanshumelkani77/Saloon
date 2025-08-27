import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Services from './pages/Services.jsx';

function App() {
  return (
    <div className="min-h-screen  flex flex-col">
      <Navbar />
      <main className="flex-1 w-full  mx-auto  mt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;