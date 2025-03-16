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

// Function to filter out hotels with no rooms available or invalid property codes
const filterAvailableHotels = (hotelsData) => {
  return hotelsData.filter((hotel) => {
    // Check for error codes and filter them out
    if (hotel.errors) {
      hotel.errors.forEach((error) => {
        console.error(`Error for hotel ${hotel.hotelId}:`, error.detail);
      });
    }
    return (
      !hotel.errors ||
      !hotel.errors.some(
        (error) =>
          errorCodes.includes("3664") ||
          errorCodes.includes("1257") ||
          errorCodes.includes("1351") ||
          errorCodes.includes("11")
      )
    );
  });
};

// This function queries the API to access hotel search data
// Removed useState and useEffect hooks from this function
const hotelSearch = async ({
  accessToken,
  longitude,
  latitude,
  radius,
  setHotels,
  setError,
}) => {
  try {
    // Log the parameters to confirm they're correctly passed
    console.log("Inside hotelSearch with params:", {
      accessToken,
      longitude,
      latitude,
      radius,
    });

    const params = {
      longitude,
      latitude,
      radius, // Example: radius 1 kilometer
      radiusUnit: "MILE", // Unit for radius - 'KM' or 'MILE'
    };

    const url = new URL(
      "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode"
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

// searches API with all hotelIds gotten from the search by the city
const getHotelSearchResults = async (
  hotels,
  accessToken,
  minPrice,
  maxPrice,
  checkInDate,
  checkOutDate,
  adults,
  setFilteredHotels,
  setError
) => {
  console.log("Start of getHotelSearchResults");

  // console.log("Filtered hotels before filtering:", hotels);
  // const availableHotels = filterAvailableHotels(hotels);
  // console.log("Available hotels after filtering:", availableHotels);

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
      if (i == 3) {
        console.log("Shrinking search to prevent long load times...");
        break;
      }
      console.log(`Fetching details for chunk ${i + 1}...`);

      // Create the request URL for the current chunk of hotel IDs
      const offerURL = new URL(
        "https://cors-anywhere.herokuapp.com/https://test.api.amadeus.com/v3/shopping/hotel-offers"
      );

      const params = {
        hotelIds: chunks[i].join(","), // Join hotel IDs into a comma-separated list
        adults: parseInt(adults, 10), // Ensure adults is an integer
        checkInDate: checkInDate, // Dates are already strings
        checkOutDate: checkOutDate, // Dates are already strings
        minPrice: minPrice, // Ensure minPrice is a string
        maxPrice: maxPrice, // Ensure maxPrice is a string
      };

      console.log("Fetching with params:", JSON.stringify(params, null, 2));

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
        console.log("Filtering failed, ", [chunks[i]]);
        const errorText = await response.text();
        console.error("Error response from hotel search by IDs:", errorText);
        throw new Error(
          `Failed to fetch hotels by IDs from Amadeus API: ${errorText}`
        );
      }

      const data = await response.json();
      console.log(`Fetched hotel details for chunk ${i + 1}:`, data);
      // const availableHotels = filterAvailableHotels(data.data);

      // Append the results of this batch to filteredHotels
      filteredHotels = [...filteredHotels, ...data.data];
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
