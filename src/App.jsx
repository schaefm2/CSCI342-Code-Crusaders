import "./App.css";
import React, { useState } from "react";
import Navigation from "./pages/Navigation";
import { Outlet } from "react-router-dom";

import {
  ColorThemeProvider,
  colorTheme,
} from "./components/ColorTheme/ColorTheme.jsx";

function App() {
  const [themeState, setThemeState] = useState(colorTheme);

  return (
    <ColorThemeProvider>
      <div>
        <Navigation />
        <Outlet />
      </div>
    </ColorThemeProvider>
  );
}

export default App;
