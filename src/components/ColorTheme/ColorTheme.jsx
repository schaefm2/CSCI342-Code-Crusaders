import React, { createContext, useContext, useState } from 'react';

const themeConstant = createContext();

export const colorTheme = {
  buttonColor: '#6cc14f',
  iconColor: '#6cc14f',
}

export const userColorTheme = () => useContext(themeConstant);

export const ColorThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(colorTheme);  // add colors to this constant for more website colors


  // add more color theming here for different website elements


  return (
    <themeConstant.Provider value={{theme, setTheme}}>
      {children}
    </themeConstant.Provider>
  );
}


export const ColorScheme= () => {
  const { theme } = useColorTheme(); // Access colors from the theme context

  return (
    <div>

        {/* TODO: Add more colon themes here for different future components */}

      <button style={{ backgroundColor: buttonColor }} className="button-class">
        Button
      </button>

      <i style={{ color: iconColor }} className="icon-class">
        Icon
      </i>

    </div>
  );
}
