import React, { useState, useEffect } from 'react';
import './App.css';
import { ThemeContext, themes } from '../src/components/context/themeContext';
import ToggleDark from '../src/components/ToggleDark';
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
import Drafts from './components/Drafts'
import AddListing from './components/AddListing';
import Listings from './components/Listings'
import Sliding from './components/Sliding';
import Listing from './components/Listing';
import Booking from './components/Booking'
import LandlordLogin from './pages/LandlordLogin';
import Logout from './components/Logout';
import Change from './components/Change';
import Profile from "./components/Profile"
import LightDarkMode from './components/LightDarkMode';
import ThemeProvider from './components/context/ThemeProvider';
import TenantLayoutSettings from './components/Layout/TenantLayoutSettings';
import LandlordTenants from './components/LandlordTenants';
import AddTenants from './components/AddTenants';
import LeaseAgreement from './components/LeaseAgreement';
import OtherDocuments from './components/OtherDocuments';
import MaintenanceRequest from './components/MaintenanceRequest';
import ApartmentsManagers from './components/ApartmentsManagers';
import AddManager from './components/AddManager';
import PropertyManager from './components/PropertyManager';
import Tenants from './components/Tenants';
import Tenant from './components/Tenant';


function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const [landlord, setLandlord] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((landlord) => setLandlord(landlord));
      }
    });
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  

  return (
    <Router>
      <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} landlord={landlord} setLandlord={setLandlord} />
        <Route path="#" element={<Form />} />
        <Route path="/landlordSignup" element={<Landlord />} setLandlord={setLandlord} />
        <Route path="/landlordLogin" element={<LandlordLogin />} setLandlord={setLandlord} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/landlorddashboard" element={<LayoutSettings><LandlordDashboard /></LayoutSettings>} />
        <Route path="/properties" element={<LayoutSettings><Properties /></LayoutSettings>} />
        <Route path="/mail" element={<LayoutSettings><Mail /></LayoutSettings>} />
        <Route path="/compose" element={<LayoutSettings><Compose /></LayoutSettings>} />
        {/* <Route path="/compose" element={<Compose />} /> */}
        <Route path="/sentEmails" element={<LayoutSettings><SentMails /></LayoutSettings>} />
        <Route path="/inbox" element={<LayoutSettings><Inbox /></LayoutSettings>} />
        <Route path="/sentEmail/:id" element={<SentMail />} />
        {/* <Route path="/inbox" element={<Inbox />} /> */}
        {/* <Route path="/drafts" element={<Drafts />} /> */}
        <Route path="/drafts" element={<LayoutSettings><Drafts /></LayoutSettings>} />
        <Route path="/addlisting" element={<LayoutSettings><AddListing /></LayoutSettings>} />
        <Route path="/listings" element={<LayoutSettings><Listings /></LayoutSettings>} />
        <Route path="/listing/:id" element={<LayoutSettings><Listing /></LayoutSettings>}/>
        <Route path="/addManager" element={<LayoutSettings><AddManager /></LayoutSettings>} />
        <Route path="/manager/:id" element={<LayoutSettings><PropertyManager /></LayoutSettings>} />
        <Route path="/tenant/:id" element={<LayoutSettings><Tenant /></LayoutSettings>} />
        <Route path="/apartmentsManagers" element={<LayoutSettings><ApartmentsManagers /></LayoutSettings>} />
        <Route path="/booking" element={<LayoutSettings><Booking /></LayoutSettings>}/>
        <Route path="/sliding" element={<LayoutSettings><Sliding /> </LayoutSettings> } />
        <Route path="/logout" element={<Logout />} />
        <Route path="/lightDarkMode" element={<LayoutSettings><LightDarkMode /></LayoutSettings>} />
        <Route path="/profile" element={<LayoutSettings><Profile /></LayoutSettings>} />
        <Route path="/landlordTenants" element={<TenantLayoutSettings><LandlordTenants/></TenantLayoutSettings>} />
        <Route path="/addTenants" element={<TenantLayoutSettings><AddTenants /></TenantLayoutSettings>} />
        <Route path="/tenants" element={<TenantLayoutSettings><Tenants /></TenantLayoutSettings>} />
        <Route path="/leaseAgreement" element={<TenantLayoutSettings><LeaseAgreement /></TenantLayoutSettings>} />
        <Route path="/otherDocuments" element={<TenantLayoutSettings><OtherDocuments /></TenantLayoutSettings>} />
        <Route path="/maintenaceRequest" element={<TenantLayoutSettings><MaintenanceRequest /></TenantLayoutSettings>} />
        {/* <Route path="/change" element={<LayoutSettings><Change /></LayoutSettings>} /> */}
      </Routes>
      </ThemeProvider>
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
