const clientID = "NkMFkZLtqmt4Mls7Qtmgc8JpPtzsu8Yp";
const clientSecret = "Dn3qINbKSQnwTt6x";

import axios from "axios";

const fetchAccessToken = async () => {
  try {
    const storedToken = localStorage.getItem("accessToken");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    // Check if token exists and is not expired
    if (
      storedToken &&
      tokenExpiration &&
      new Date().getTime() < tokenExpiration
    ) {
      console.log(`Using existing token... ${storedToken}`);
      return storedToken;
    }

    // Fetch a new token if none exists or if the token has expired
    console.log("Fetching new token...");
    const response = await fetch(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientID,
          client_secret: clientSecret,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch access token from Amadeus API");
    }

    const data = await response.json();
    const token = data.access_token;
    const expirationTime = new Date().getTime() + data.expires_in * 1000; // Token expiration time in ms

    // Store token and expiration time in localStorage
    localStorage.setItem("accessToken", token);
    localStorage.setItem("tokenExpiration", expirationTime.toString());

    console.log("New Token:", token);
    return token;
  } catch (e) {
    console.error("Error fetching token:", e);
  }
};

// autocomplte functionality
export async function fetchAirportCities(query) {
  if (!query) return [];

  const token = await fetchAccessToken();

  const response = await axios.get(
    "https://test.api.amadeus.com/v1/reference-data/locations",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        subType: "CITY,AIRPORT",
        keyword: query,
        view: "LIGHT",
      },
    }
  );

  return response.data.data;
}

export default fetchAccessToken;
