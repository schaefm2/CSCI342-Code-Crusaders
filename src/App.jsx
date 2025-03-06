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
import HotelData from "./components/Hotels/HotelData.jsx";



function App() {
  const [themeState, setThemeState] = useState(colorTheme);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cityCode, setCityCode] = useState("NYC"); // for testing purposes

  const [tokenFetched, setTokenFetched] = useState(false);


  // Uncomment below if need to use access tokens

  // Checks and generates access tokens
  useEffect(() => {
    // if (!tokenFetched) {
      const getAccessToken = async () => {
        try {
          const token = await fetchAccessToken();
          setAccessToken(token);
          setLoading(false);
          // setTokenFetched(true);
        } catch (error) {
          console.error('Failed to fetch token:', error);
          setLoading(false);
        }
      };

      // if (!tokenFetched) {  // if not fetched...
        getAccessToken();
        // setTokenFetched(true);
      // }
    // }

  }, [tokenFetched]);

  // const getAccessToken = async () => {
  //   try {
  //     const token = await fetchAccessToken();
  //     setAccessToken(token);  // Set the fetched token
  //     setLoading(false);  // Set loading to false after token is fetched
  //   } catch (error) {
  //     console.error('Failed to fetch token:', error);
  //     setLoading(false);  // Set loading to false in case of an error
  //   }
  // };

  // // Check token status and fetch it when the app is first loaded
  // if (accessToken === null) {
  //   getAccessToken();  // Only run once when the app is first loaded
  // }

  
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

  const renderHotelDataOrLoading = () => {

    if (loading) {
      return <div className="loading-message">Fetching API token, please wait...</div>;
    }

    if (accessToken) {
      return <HotelData accessToken={accessToken} cityCode={cityCode} />;  // Hotel search component call
    } else {
      return <div>Failed to fetch access token for hotel search.</div>;
    }
  };

  return (
    <ColorThemeProvider>
      <div>
        <h1>Flight Data</h1>

        {/* TODO: Uncommenting below gets token and allows flight access*/}
        {
        /* 
        {renderFlightDataOrLoading()}
        {renderHotelDataOrLoading()}
        */
        }



        <Navigation />
        <Outlet />
      </div>
    </ColorThemeProvider>
  );
}

export default App;
