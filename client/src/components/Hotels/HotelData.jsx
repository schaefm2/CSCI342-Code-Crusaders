// Log function to inspect hotel data
const logHotelData = (hotels) => {
  console.log(`Hotel object length: ${hotels.length}`);
  hotels.forEach((hotel, index) => {
    console.log(`Hotel ${index + 1}:`);
    console.log(`Name: ${hotel.name}`);
    console.log(`City: ${hotel.address.countryCode}`);
    console.log(
      `Latitude: ${hotel.geoCode.latitude}, Longitude: ${hotel.geoCode.longitude}`
    );
    console.log(
      `Distance from reference point: ${hotel.distance.value} ${hotel.distance.unit}`
    );
    console.log("------------------------");
  });
};

// This function queries the API to access hotel search data
// Removed useState and useEffect hooks from this function
const hotelSearch = async ({
  accessToken,
  cityCode,
  radius,
  setHotels,
  setError,
}) => {
  try {
    // Log the parameters to confirm they're correctly passed
    console.log("Inside hotelSearch with params:", {
      accessToken,
      cityCode,
      radius,
    });

    const params = {
      cityCode, // e.g., "NYC" or "NCE"
      radius, // Example: radius 1 kilometer
      radiusUnit: "MILE", // Unit for radius - 'KM' or 'MILE'
    };

    const url = new URL(
      "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city"
    );
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response from API hotel call:", errorText);
      throw new Error(`Failed to fetch hotels from Amadeus API: ${errorText}`);
    }

    const data = await response.json();

    // console.log("Fetched hotels data:", data.data);
    setHotels(data.data); // Update state with the fetched hotels data
    //logHotelData(data.data); // Log hotel data to console
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
// searches API with all hotelIds gotten from the search by the city
const getHotelSearchResults = async (
  hotels,
  accessToken,
  minPrice,
  maxPrice,
  setFilteredHotels,
  setError
) => {
  console.log("Start of getHotelSearchResults");

  try {
    const hotelIds = hotels
      .slice(0, hotels.length)
      .map((hotel) => hotel.hotelId);
    console.log("Hotel IDs to be processed:", hotelIds);

    const chunkSize = 40;
    const chunks = [];
    for (let i = 0; i < hotelIds.length; i += chunkSize) {
      chunks.push(hotelIds.slice(i, i + chunkSize));
    }

    let filteredHotels = [];

    for (let i = 0; i < chunks.length; i++) {
      console.log(`Fetching details for chunk ${i + 1}...`);

      // Create the request URL for the current chunk of hotel IDs
      const offerURL = new URL(
        "https://cors-anywhere.herokuapp.com/https://test.api.amadeus.com/v3/shopping/hotel-offers"
      );

      const params = {
        hotelIds: chunks[i].join(","), // Join hotel IDs into a comma-separated list
        minPrice: minPrice, // Add minPrice filter
        maxPrice: maxPrice, // Add maxPrice filter
      };

      // Append the parameters to the URL
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          // Ensure the parameter is not null or undefined (but shouldnt ever happen!)
          offerURL.searchParams.append(key, params[key]);
        }
      });

      // Fetch data for the current chunk
      const response = await fetch(offerURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from hotel search by IDs:", errorText);
        throw new Error(
          `Failed to fetch hotels by IDs from Amadeus API: ${errorText}`
        );
      }

      const data = await response.json();
      console.log(`Fetched hotel details for chunk ${i + 1}:`, data);

      // Append the results of this batch to filteredHotels
      filteredHotels = [...filteredHotels, ...data.data]; // Assuming 'data.data' contains the hotels
    }

    // Set the final filtered hotels after all batches are fetched
    setFilteredHotels(filteredHotels);

    console.log("Filtered hotels inside hotelData:", filteredHotels);
  } catch (error) {
    setError(`Error: ${error.message}`);
    console.error("Error fetching hotel search results:", error);
  }
};

export { hotelSearch, getHotelSearchResults };
