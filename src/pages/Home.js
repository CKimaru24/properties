import React, { useState } from 'react';
import Navbars from '../components/Navbars';
import Dropdown from '../components/Dropdown';
import Hero from '../components/Hero';
import { SliderData } from '../data/SliderData';
import GlobalStyle from '../globalStyles';
import Sliding from '../components/Sliding';

const Home = ({toggle, isOpen, landlords, setLandlord}) => {

  return (
    <>
      <GlobalStyle />
      <Navbars isDark={true} toggle={toggle} landlords={landlords} setLandlord={setLandlord} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <Sliding />
      {/* <Hero slides={SliderData} /> */}
      
    </>
  );
};

export default Home;
