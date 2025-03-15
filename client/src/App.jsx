import "./App.css";
import React, { useState, useEffect } from "react";
import Navigation from "./components/Nav/Navigation.jsx";
import { Outlet } from "react-router-dom";

import {
  ColorThemeProvider,
  colorTheme,
} from "./components/ColorTheme/ColorTheme.jsx";
import AmadeusAPITokenCreation from "./components/FlightData/AmadeusAPITokenCreation.jsx";
import FlightData from "./components/FlightData/FlightData.jsx";
import fetchAccessToken from "./components/FlightData/AmadeusAPITokenCreation.jsx";
// import HotelData from "./components/Hotels/HotelData.jsx";
import Footer from "./components/Footer/Footer.jsx";

import { AccessTokenProvider } from "./components/AccessTokenContext/AccessTokenContext.jsx";

import { Toaster } from "react-hot-toast";

function App() {
  const [themeState, setThemeState] = useState(colorTheme);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cityCode, setCityCode] = useState("NYC"); // for testing purposes

  const [tokenFetched, setTokenFetched] = useState(false);

  // Uncomment below if need to use access tokens

  // Checks and generates access tokens
  // useEffect(() => {
  //   // if (!tokenFetched) {
  //     const getAccessToken = async () => {
  //       try {
  //         const token = await fetchAccessToken();
  //         setAccessToken(token);
  //         setLoading(false);
  //         // setTokenFetched(true);
  //       } catch (error) {
  //         console.error('Failed to fetch token:', error);
  //         setLoading(false);
  //       }
  //     };

  //     // if (!tokenFetched) {  // if not fetched...
  //       getAccessToken();
  //       // setTokenFetched(true);
  //     // }
  //   // }

  // }, [tokenFetched]);

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
      return (
        <div className="loading-message">
          Fetching API token, please wait...
        </div>
      );
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
      return (
        <div className="loading-message">
          Fetching API token, please wait...
        </div>
      );
    }

    if (accessToken) {
      return <HotelData accessToken={accessToken} cityCode={cityCode} />; // Hotel search component call
    } else {
      return <div>Failed to fetch access token for hotel search.</div>;
    }
  };

  return (
    <ColorThemeProvider>
      <AccessTokenProvider>
        <div className="flex flex-col min-h-screen w-full"> {/* Ensure full height */}
          <Navigation />
          <main className="flex-1 pt-16"> {/* Grow to push footer down */}
            <Outlet />
          </main>
          <Toaster />
          <Footer />
        </div>
      </AccessTokenProvider>
    </ColorThemeProvider>
  );
}

export default App;
