import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <div className="min-h-screen  flex flex-col">
      <Navbar />
      <main className="flex-1 w-full  mx-auto  mt-20">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;