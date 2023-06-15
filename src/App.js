import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/Form'
import Contact from './pages/Contact';
import About from './pages/About';
import Navbars from './components/Navbars';
import Landlord from './pages/Landlord';
import LandlordDashboard from './pages/LandlordDashboard';
import Properties from './components/Properties';
import Topbar from './components/Layout/Topbar';
import Sidenav from './components/Layout/Sidenav';
import LayoutSettings from './components/Layout/LayoutSettings';
import Mail from './pages/Mail';
import Compose from '../src/components/Compose'
import SentMails from './components/SentMails';
import SentMail from './components/SentMail';
import Inbox from './components/Inbox';


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
        <Route path="#" element={<Form />} />
        <Route path="/landlordSignup" element={<Landlord />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/landlorddashboard" element={<LayoutSettings><LandlordDashboard /></LayoutSettings>} />
        <Route path="/properties" element={<LayoutSettings><Properties /></LayoutSettings>} />
        <Route path="/mail" element={<LayoutSettings><Mail /></LayoutSettings>} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/sentEmails" element={<SentMails />} />
        <Route path="/sentEmail/:id" element={<SentMail />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
    </Router>
  );
}

// const Layout = ({ children }) => {
//   return (
//     <>
//       <LayoutSettings/>
//       {children}
//     </>
//   );
// };

export default App;
