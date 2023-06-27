import React from 'react'
import { ThemeContext, themes } from '../components/context/themeContext';
import ToggleDark from '../components/ToggleDark';

function Change() {
    const [darkMode, setDarkMode] = React.useState(true);

    return (
        <ThemeContext.Consumer>
            {({ changeTheme }) => (
            <ToggleDark
                toggleDark={() => {
                setDarkMode(!darkMode);
                changeTheme(darkMode ? themes.light : themes.dark);
                }}
            />
            )}
        </ThemeContext.Consumer>
    )
}

export default Change