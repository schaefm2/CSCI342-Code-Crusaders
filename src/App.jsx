import "./App.css";
import React, { useState, useEffect } from "react";
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
import AmadeusAPITokenCreation from "./components/FlightData/AmadeusAPITokenCreation.jsx";
import FlightData from "./components/FlightData/FlightData.jsx";
import fetchAccessToken from "./components/FlightData/AmadeusAPITokenCreation.jsx";

function App() {
  const [themeState, setThemeState] = useState(colorTheme);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Uncomment below if need to use access tokens

  // Checks and generates access tokens
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await fetchAccessToken();
        setAccessToken(token);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch token:', error);
        setLoading(false);
      }
    };

    getAccessToken();
  }, []);

  
  const renderFlightDataOrLoading = () => {

    if (loading) {
      return <div className="loading-message">Fetching API token, please wait...</div>;
    }

    if (accessToken) {
      return <FlightData accessToken={accessToken} />;
    } else {
      return <div>Failed to fetch access token.</div>;
      // return (
      //   <div className="loading-message">
      //     Fetching API token, please wait...
      //   </div>
      // );
    }
  };

  return (
    <ColorThemeProvider>
      <div>
        <h1>Flight Data</h1>

        {/* TODO: Uncommenting below gets token and allows flight access*/}
        {/* {renderFlightDataOrLoading()} */}


        <Navigation />
        <Outlet />
      </div>
    </ColorThemeProvider>
  );
}

export default App;
