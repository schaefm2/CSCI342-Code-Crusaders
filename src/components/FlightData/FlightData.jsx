
// API Key for Send/Recieve: d3xJ8zGuTjV0GwRNAmlzk6TvXHMy
// what is gave me the second time????? AFTTuMIzzrnEysC0SwGEYtTv1OO4

import React, { useEffect, useState, useRef } from 'react';

// const accessToken = 'AFTTuMIzzrnEysC0SwGEYtTv1OO4'; // generated token from other response

const logFlightData = (flights) => {
    console.log(`Flight object length: ${flights.length}`)
    for (let i = 0; i < flights.length; i++) {
        const flight = flights[i];
        // Log relevant flight information to the console
        console.log(`Flight ${i + 1}:`);
        console.log(`Departure: ${flight.itineraries[0].segments[0].departure.iataCode}`);
        console.log(`Arrival: ${flight.itineraries[0].segments[0].arrival.iataCode}`);
        console.log(`Price: ${flight.price.total} ${flight.price.currency}`);
        console.log('------------------------');
    }
};

// This is for querying the API to access some flight search data
// Removed useState and useEffect hooks from this function
const flightSearch = async ({
    accessToken,
    originLocationCode,
    destinationLocationCode,
    departureDate,
    returnDate,
    adults,
    maxPrice,
    currencyCode,
    setFlights,
    setError
  }) => {
    try {
      // Log the parameters to confirm they're correctly passed
      console.log('Inside flightSearch with params:', {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        returnDate,
        adults,
        maxPrice,
        currencyCode,
      });
  
      const params = {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        returnDate,
        adults,
        maxPrice,
        currencyCode
      };
  
      const url = new URL('https://test.api.amadeus.com/v2/shopping/flight-offers');
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from API:', errorText);
        throw new Error(`Failed to fetch flight from Amadeus API: ${errorText}`);
      }
  
      const data = await response.json();

      setFlights(data.data); // Update state here

      // used to check that they were gotten successfully
      logFlightData(data.data);

    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error(err);
    }
  };
  
export default flightSearch;
