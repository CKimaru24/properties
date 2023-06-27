// Write your code here
import React, {Component, useContext} from 'react'
import { ThemeContext } from '../components/context/ThemeProvider';

import './ldm.css'

const LightDarkMode = () => {
    const { theme, changeTheme } = useContext(ThemeContext);
  
    const onClickButton = () => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      changeTheme(newTheme);
    };
  
    const modeClassName = theme === 'dark' ? 'dark-mode' : 'light-mode';
    const buttonText = theme === 'dark' ? 'Light Mode' : 'Dark Mode';

    return (
      <div className="app-container">
        <div className={`container ${modeClassName}`}>
          <h1 className="heading">Click To Change Mode</h1>
          <button type="button" onClick={this.onClickButton} className="button">
            {buttonText}
          </button>
        </div>
      </div>
    )
}

export default LightDarkMode



