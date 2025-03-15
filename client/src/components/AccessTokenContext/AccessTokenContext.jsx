import React, { createContext, useState, useContext, useEffect } from 'react';

import fetchAccessToken from "../FlightData/AmadeusAPITokenCreation.jsx";


// Create context for AccessToken
const AccessTokenContext = createContext();

export const useAccessToken = () => {
  return useContext(AccessTokenContext);
};

// Create a provider component
export const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await fetchAccessToken(); // Define this in your logic
        setAccessToken(token);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching token", error);
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  // Return the context provider with accessToken and loading state
  return (
    <AccessTokenContext.Provider value={{ accessToken, loading }}>
      {children}
    </AccessTokenContext.Provider>
  );
};
