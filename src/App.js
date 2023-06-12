import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/Form'
import Contact from './pages/Contact';
import About from './pages/About';
import Navbars from './components/Navbars';
import Landlord from './pages/Landlord';
import LandlordDashboard from './pages/LandlordDashboard';

function App() {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      {/* <Navbars isDark={true} /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="#" element={<Form />}/>
        <Route path="/landlordSignup" element={<Landlord/>}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/about" element={<About  />} />
        <Route path="/landlorddashboard" element={<LandlordDashboard  />} />
      </Routes>
    </Router>
  );
}

export default App;
