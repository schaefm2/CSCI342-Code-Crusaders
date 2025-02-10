import React, { createContext, useContext, useState } from 'react';

const themeConstant = createContext();

export const colorTheme = {
  blackButtonColor: '#2754b5', // the black on the login & logout button on Figma
  blueButtonColor: '#2754b5', // blue button on the alternative login & logout buttons
  iconColor: '#6cc14f',
  reviewColor: '#fef6eb',  // background color of 'top flight reviews' from figma

  // big fan of it unsure what we're using it for but we can change name
  passiveGreen: '#b7d2ad'  // green color originally on Figma
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

      <button style={{ color: blackButtonColor }} className="button-class">
        Button
      </button>

      <i style={{ color: iconColor }} className="icon-class">
        Icon
      </i>

    </div>
  );
}
