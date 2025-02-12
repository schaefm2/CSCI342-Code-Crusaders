
// API Key for Send/Recieve: d3xJ8zGuTjV0GwRNAmlzk6TvXHMy
// what is gave me the second time????? AFTTuMIzzrnEysC0SwGEYtTv1OO4

import React, { useEffect, useState } from 'react';

// const accessToken = 'AFTTuMIzzrnEysC0SwGEYtTv1OO4'; // generated token from other response

// This is for querying the API to access some flight search data
const flightSearch = ({ accessToken }) => {

    // useStates for flight search querys
    const [flights, setFlights] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {

        console.log("Starting flight search, using 1 token...")

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

                const response = await fetch(url, {
                
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },

                });

                if (!response.ok) {
                    throw new Error('Failed to fetch flight from Amadeus API search');
                }

                const data = await response.json();

                // Handle flight data as needed
                console.log(data);

                setFlights(data.data); // Set the flights data in state
            } catch (err) {
                setError(`Error: ${err.message}`);
                console.error(err);
            }
        };

        fetchFlights();
    }, [accessToken]);  // keep dependency empty or it might run more than once, wasting tokens!

    if (error) {
        return <div>{error}</div>;
    }

    if (flights.length === 0) {
        return <div>Loading flights...</div>;
    }

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
}

export default flightSearch;
