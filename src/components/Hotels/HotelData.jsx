import React, { useEffect, useState, useRef } from 'react';

// Log function to inspect hotel data
const logHotelData = (hotels) => {
    console.log(`Hotel object length: ${hotels.length}`);
    hotels.forEach((hotel, index) => {
        console.log(`Hotel ${index + 1}:`);
        console.log(`Name: ${hotel.name}`);
        console.log(`City: ${hotel.address.countryCode}`);
        console.log(`Latitude: ${hotel.geoCode.latitude}, Longitude: ${hotel.geoCode.longitude}`);
        console.log(`Distance from reference point: ${hotel.distance.value} ${hotel.distance.unit}`);
        console.log('------------------------');
    });
};

// Function for querying the API to access hotel data
const HotelSearch = ({ accessToken, cityCode }) => {
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState(null);
    const searchMade = useRef(false);

    useEffect(() => {
        if (accessToken && !searchMade.current) {
            console.log(`Starting hotel search using acquired token: ${accessToken}`);

            const fetchHotels = async () => {
                try {
                    const params =  {
                        cityCode: cityCode,         // e.g., "NYC" or "NCE"
                        radius: 1,                  // Example: radius 1 kilometer
                        radiusUnit: 'KM',           // Unit for radius - 'KM' or 'MILE'
                    };


            

                    const url = new URL('https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city');

                    // Add parameters to the URL
                    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

                    console.log(`Adding the accessToken to the response: ${accessToken}`);

                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error('Error response from API:', errorText);
                        throw new Error(`Failed to fetch hotels from API: ${errorText}`);
                    }

                    const data = await response.json();

                    // Handle hotel data as needed
                    console.log(data);

                    setHotels(data.data); // Set the hotel data in state
                    searchMade.current = true;
                } catch (err) {
                    setError(`Error: ${err.message}`);
                    console.error(err);
                }
            };

            fetchHotels();
        }
    }, [accessToken, cityCode]); // Dependency on accessToken and cityCode

    useEffect(() => {
        if (hotels.length > 0) {
            logHotelData(hotels);
        }
    }, [hotels]);

    if (error) {
        console.error(error);
    }

    // Optionally, return loading or error states if needed
    return null;
};

export default HotelSearch;
