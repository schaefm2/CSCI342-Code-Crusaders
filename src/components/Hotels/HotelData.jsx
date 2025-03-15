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
  
      // console.log("Fetched hotels data:", data.data);

      setHotels(data.data); // Update state with the fetched hotels data
      logHotelData(data.data); // Log hotel data to console
  
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error(err);
    }
  };
  
  
  // const hotelData = data.data.map((hotel) => ({
  //   hotelId: hotel.hotelId,
  //   name: hotel.name
  // }));
    
  // searches api with all hotelids gotten from the search by the city
  const getHotelSearchResults = async (hotels, accessToken, setError) => {

    console.log("start of getHotelSearchResults");

    try {

      const hotelIds = hotels.slice(0, 50).map((hotel) => hotel.hotelId)

      console.log("hotelIds: ", hotelIds);

      const offerURL = new URL("https://cors-anywhere.herokuapp.com/https://test.api.amadeus.com/v3/shopping/hotel-offers");
  
      const params = {
        hotelIds: hotelIds  // Pass the hotel IDs as a comma-separated list
      }

      Object.keys(params).forEach((key) =>
        offerURL.searchParams.append(key, params[key])
      );

      const response = await fetch(offerURL, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from hotel search by IDs:', errorText);
        throw new Error(`Failed to fetch hotels by IDs from Amadeus API: ${errorText}`);
      }
  
      const data = await response.json();
      console.log("Fetched hotel details by IDs:", data);
      // Further handling of the data (e.g., set it to state) can be done here
    } catch (error) {
      setError(`Error: ${error.message}`);
      console.error("Error fetching hotel search results:", error);
    }
  };
  
  export { hotelSearch, getHotelSearchResults };