
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
const flightSearch = ({ accessToken }) => {

    // useStates for flight search querys
    const [flights, setFlights] = useState([]);
    const [error, setError] = useState(null);
    
    const searchMade = useRef(false);

    useEffect(() => {

        if (accessToken && !searchMade.current) {

            console.log(`Starting flight search using acquired token: ${accessToken}`)

            const fetchFlights = async () => {
            try {

                // Define the query parameters for the flight search here, do dynamically later
                const params = {
                    originLocationCode: 'JFK',
                    destinationLocationCode: 'LAX',
                    departureDate: '2025-05-01',
                    returnDate: '2025-05-10',
                    adults: '2',
                    maxPrice: '499',
                    currencyCode: 'USD',
                }

                const url = new URL('https://test.api.amadeus.com/v2/shopping/flight-offers');

                // Adds the parameter to the url here so the fetch can work
                Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

                // After each key is appended to the url the search should then work

                console.log(`Adding the accessToken to the response: ${accessToken}`)

                const response = await fetch(url, {
                
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },

                });

                if (!response.ok) {
                    // throw new Error('Failed to fetch flight from Amadeus API search');

                    const errorText = await response.text();
                    console.error('Error response from API:', errorText);
                    throw new Error(`Failed to fetch flight from Amadeus API: ${errorText}`);
                }

                const data = await response.json();

                // Handle flight data as needed
                console.log(data);

                setFlights(data.data); // Set the flights data in state

                searchMade.current = true;

            } catch (err) {
                setError(`Error: ${err.message}`);
                console.error(err);
            }
        };

        fetchFlights();

            // if (accessToken) {
                // fetchFlights();
            // }
        }

    }, [accessToken]);  // keep dependency empty or it might run more than once, wasting tokens!

    useEffect(() => {
        if (flights.length > 0) {
            logFlightData(flights);
        }
    }, [flights]);  // when flights change run this i.e. when flights gets filled

    if (error) {
        console.error(error);
    }

    // if (flights.length === 0) {
    //     return <div>Loading flights...</div>;
    // }

    // logFlightData(flights);   // This is used for testing...

    // Below can be used to render the flight to screen but this can be done elsewhere with raw data object
    // return (
    //     <div>
    //         <h2>Flight Search Results</h2>

    //         <ul>
    //             {flights.map((flight, index) => ( // map the flight state to get each flight
    //             <li key={index}>
    //                 <f1>{flight.itineraries[0].segments[0].departure.iataCode}</f1> to{' '}
    //                 <f2>{flight.itineraries[0].segments[0].arrival.iataCode}</f2> -{' '}

    //                 {flight.price.total} {flight.price.currency}
    //             </li>
    //             ))}
    //         </ul>
    //     </div>
    // );

    

    return null;

}

export default flightSearch;
