import React, {useState} from "react";
import NavigationBar from "./components/Navbar";
import GlobalStyle from "./globalStyles";
import Navbars from "./components/Navbars";
import Dropdown from "./components/Dropdown";
import Hero from "./components/Hero";
import { SliderData } from "./data/SliderData";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <GlobalStyle/>
      {/* <NavigationBar/> */}
      <Navbars toggle={toggle}/>
      <Dropdown isOpen={isOpen} toggle={toggle}/>
      <Hero slides={SliderData}/>
    </>
  );
}

export default App;
