import "./App.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HotelsPage from "./pages/HotelsPage";
import FlightsPage from "./pages/FlightsPage";
import RentalsPage from "./pages/RentalsPage";
import TripsPage from "./pages/TripsPage";
import Navigation from "./pages/Navigation";
import { Outlet } from "react-router-dom";

import {
  ColorThemeProvider,
  colorTheme,
} from "./components/ColorTheme/ColorTheme.jsx";
// import AmadeusAPITokenCreation from "./components/FlightData/AmadeusAPITokenCreation.jsx";
import FlightData from "./components/FlightData/FlightData.jsx";
import fetchAccessToken from "./components/FlightData/AmadeusAPITokenCreation.jsx";

function App() {
  const [themeState, setThemeState] = useState(colorTheme);
  const [accessToken, setAccessToken] = useState(null);

  // Uncomment below if need to use access tokens

  // Checks and generates access tokens
  // useEffect(() => {
  //   const storedToken = localStorage.getItem('accessToken');
  //   if (storedToken) {
  //     console.log("Stored token found: ", storedToken);
  //     setAccessToken(storedToken); // Use stored token if available
  //   } else {
  //     console.log("Fetching token...");
  //     fetchAccessToken(setAccessToken);
  //   }
  // }, []);

  const renderFlightDataOrLoading = () => {
    if (accessToken) {
      return <FlightData accessToken={accessToken} />;
    } else {
      return (
        <div className="loading-message">
          Fetching API token, please wait...
        </div>
      );
    }
  };

  return (
    <ColorThemeProvider>
      <div>
        {/* <h1>Flight Data</h1>
        {renderFlightDataOrLoading()} */}

        {/* WARNING WARNING WARNING!!! DONT UNCOMMENT BELOW */}
        {/* Currently Generates 2 tokens and i've probably already used 500 debugging giving up for now */}

        {/* If accessToken hasn't been acquired yet, then make token */}
        {/* {!accessToken && <AmadeusAPITokenCreation fetchedToken={getAccesstoken} />} */}

        <Navigation />
        <Outlet />
      </div>
    </ColorThemeProvider>
  );
}

export default App;
