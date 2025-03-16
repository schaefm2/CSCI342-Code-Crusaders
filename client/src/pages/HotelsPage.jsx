import React, { useState, useRef, useEffect } from "react";
import HotelList from "../components/HotelList/HotelList";
import Search from "../components/Search/Search";
import {
  hotelSearch,
  getHotelSearchResults,
} from "../components/Hotels/HotelData";
import { useAccessToken } from "../components/AccessTokenContext/AccessTokenContext.jsx";
import DatePicker from "react-datepicker";
import { format } from "date-fns"; // Import the format function

const HotelsPage = () => {
  const { accessToken, loading } = useAccessToken();

  const cityRef = useRef();

  const [cityCodeState, setCityCode] = useState(null);
  const [radiusState, setRadius] = useState();

  const [longitudeCodeState, setlongitudeState] = useState();
  const [latitudeCodeState, setlatitudeState] = useState();

  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]); // copy for filtering without manipulating original result
  const [minPrice, setMinPrice] = useState(80);
  const [maxPrice, setMaxPrice] = useState(400);

  const [adults, setAdults] = useState(1);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const [error, setError] = useState(null);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // State for price sorting

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = () => {
    if (!accessToken) {
      console.log("Failed to get access token");
      return;
    }

    if (longitudeCodeState === undefined || latitudeCodeState == undefined) {
      console.log("Please enter a city and select it in the search bar");
      setError("Please enter valid city and select it");
      return;
    }

    console.log("Calling HotelSearch from HotelsPage");

    setLoadingSearch(true);
    setError(null);
    setSearchPerformed(true);

    setHotels([]);
    setFilteredHotels([]);

    // console.log("cityCodeState: ", cityCodeState);

    hotelSearch({
      accessToken,
      // cityCode: "Sea",
      longitude: longitudeCodeState,
      latitude: latitudeCodeState,
      radius: 20,
      setHotels,
      setError,
    }).finally(() => {
      setSearchTriggered(true);
      // setLoadingSearch(false);
    });
  };

  useEffect(() => {
    console.log("cityCodeState updated:", cityCodeState);
  }, [cityCodeState]);

  useEffect(() => {
    if (searchTriggered) {
      console.log("Updated hotels:", hotels);

      if (hotels && hotels.length > 0) {
        // Extract hotelIds from the list of hotels
        // const hotelIds = extractHotelIds(hotels);

        // console.log("hotelIds: ", hotelIds);

        // const trimmedHotelIds = hotelIds.slice(0, 10);

        // console.log("hotelIds Trimmed: ", trimmedHotelIds);

        // Fetch more hotel information based on these IDs
        // getHotelSearchResults(trimmedHotelIds, accessToken, setError);
        getHotelSearchResults(
          hotels,
          accessToken,
          minPrice,
          maxPrice,
          format(checkInDate, "yyyy-MM-dd"), // Format the check-in date
          format(checkOutDate, "yyyy-MM-dd"), // Format the check-out date
          adults,
          setFilteredHotels,
          setError
        ).finally(() => {
          setLoadingSearch(false);
        });

        console.log("Filtered hotels inside hotelsPage: ", filteredHotels);
      }
    }
  }, [hotels]);

  useEffect(() => {
    console.log("Updated filtered hotels:", filteredHotels);
  }, [filteredHotels]);

  useEffect(() => {
    console.log("LongitudeState updated:", longitudeCodeState);
    console.log("LatitudeState updated:", latitudeCodeState);
  }, [longitudeCodeState, latitudeCodeState]);

  // extracts all the ids from the hotels list
  const extractHotelIds = (hotels) => {
    return hotels.map((hotel) => hotel.hotelId);
  };

  const sortHotelsByPrice = (hotels, order) => {
    const hotelsCopy = [...hotels];

    // use a shallow copy and then sort it based on price
    return hotelsCopy.sort((a, b) => {
      const priceA = Number(a.price.base);
      const priceB = Number(b.price.base);

      if (order === "asc") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
  };

  const handleCitySelect = (place) => {
    console.log("Place selected:", place);

    // Accessing longitude and latitude
    const longitude = place.geometry.coordinates[0];
    const latitude = place.geometry.coordinates[1];

    console.log("Longitude:", longitude);
    console.log("Latitude:", latitude);

    // Set state for longitude and latitude
    setlongitudeState(longitude);
    setlatitudeState(latitude);

    if (place) {
      // Assuming place.iataCode contains the city code, but you can modify this as needed
      setCityCode(place.properties.cityCode || place.properties.iataCode);
    }
  };

  const handleHotelFilter = () => {
    // Use the existing copy of the hotels array to prevent mutating the original data
    const sortedHotels = sortHotelsByPrice(hotels, sortOrder);

    setFilteredHotels(sortedHotels);

    console.log(filteredHotels);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Show error message if there is an error during handling search*/}
      {error && (
        <div className="text-red-500 mb-4 font-semibold">
          {
            "Search failed, please enter a city and select it from the dropdown menu."
          }
        </div>
      )}

      <div className="mb-4">
        <Search
          className="rounded-full shadow p-2 mb-4"
          placeholder="Enter A City"
          onSelect={handleCitySelect}
        />

        {/* Dropdown for price sorting */}
        <div className="mt-4 flex items-center">
          <div className="mr-4">
            <label htmlFor="sortOrder" className="mr-4 text-lg">
              Sort by Price:
            </label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={handleSortChange}
              className="p-2 border rounded-full"
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
            <div className="mt-2">
              <label>Check In Date</label>
              <DatePicker
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                dateFormat={"yyyy-MM-dd"}
              />
              <label>Check Out Date</label>
              <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                dateFormat={"yyyy-MM-dd"}
              />
            </div>
            <label className="mr-2">Adults</label>
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="p-2 border rounded"
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-black text-white p-3 rounded-full"
              onClick={handleSearch}
            >
              Search Hotels
            </button>

            {/* Render the loading spinner next to the button instead of inside of it*/}
            {loadingSearch && (
              <div className="ml-2 w-4 h-4 border-4 border-t-transparent border-solid border-black rounded-full animate-spin"></div>
            )}
          </div>

          {/* <button
            className="bg-black text-white p-3 rounded-full"
            onClick={handleHotelFilter}
          >
            Filter Hotels
          </button> */}
        </div>
      </div>

      {/* Render sorted and filtered hotels */}
      <HotelList hotels={filteredHotels} />
    </div>
  );
};

export default HotelsPage;
