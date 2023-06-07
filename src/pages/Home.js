import React, { useState } from 'react';
import Navbars from '../components/Navbars';
import Dropdown from '../components/Dropdown';
import Hero from '../components/Hero';
import { SliderData } from '../data/SliderData';
import GlobalStyle from '../globalStyles';

const Home = ({toggle, isOpen}) => {

  return (
    <>
      <GlobalStyle />
      <Navbars toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <Hero slides={SliderData} />
      
    </>
  );
};

export default Home;
