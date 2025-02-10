import "./App.css";
import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HotelsPage from "./pages/HotelsPage";
import FlightsPage from "./pages/FlightsPage";
import RentalsPage from "./pages/RentalsPage";
import TripsPage from "./pages/TripsPage";
import Navigation from "./pages/Navigation";
import NotFoundPage from "./pages/NotFoundPage";

import { ColorThemeProvider, colorTheme } from './components/ColorTheme/ColorTheme.jsx';

function App() {

  const [themeState, setThemeState] = useState(colorTheme);

  return (
    <ColorThemeProvider>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/rentals" element={<RentalsPage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
    </ColorThemeProvider>
  );
}

export default App;
