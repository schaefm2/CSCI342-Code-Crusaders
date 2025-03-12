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
  
  // This function queries the API to access hotel search data
  // Removed useState and useEffect hooks from this function
  const hotelSearch = async ({
    accessToken,
    cityCode,
    radius,
    setHotels,
    setError
  }) => {
    try {
      // Log the parameters to confirm they're correctly passed
      console.log("Inside hotelSearch with params:", { accessToken, cityCode, radius });
  
      const params = {
        cityCode,         // e.g., "NYC" or "NCE"
        radius,           // Example: radius 1 kilometer
        radiusUnit: 'MILE' // Unit for radius - 'KM' or 'MILE'
      };
  
      const url = new URL('https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city');
      Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from API hotel call:', errorText);
        throw new Error(`Failed to fetch hotels from Amadeus API: ${errorText}`);
      }
  
      const data = await response.json();
  
      setHotels(data.data); // Update state with the fetched hotels data
      logHotelData(data.data); // Log hotel data to console
  
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error(err);
    }
  };
  
  export default hotelSearch;
  