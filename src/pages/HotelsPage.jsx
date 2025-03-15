import React, { useState, useRef, useEffect } from "react";
import HotelList from "../components/HotelList/HotelList";
import Search from "../components/Search/Search";
import { hotelSearch, getHotelSearchResults} from "../components/Hotels/HotelData";
import { useAccessToken } from "../components/AccessTokenContext/AccessTokenContext.jsx";


const HotelsPage = () => {

  const { accessToken, loading } = useAccessToken();

  const [cityCodeState, setCityCode] = useState();
  const [radiusState, setRadius] = useState();

  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);  // copy for filtering without manipulating original result
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(400);


  const [error, setError] = useState(null);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // State for price sorting


  const handleSearch = () =>{
    if (!accessToken) {
      console.log("Failed to get access token");
      return;
    }

    console.log('Calling HotelSearch from HotelsPage');

    hotelSearch({
      accessToken,
      cityCode: 'SEA',
      radius: 20,
      setHotels,
      setError
    }).finally(() => {
      setSearchTriggered(true);
    });
  };

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
        getHotelSearchResults(hotels, accessToken, minPrice, maxPrice, setFilteredHotels, setError);

        console.log("Filtered hotels inside hotelsPage: ", filteredHotels);
      }
    }
  }, [hotels]);

  useEffect(() => {

    console.log("Updated filtered hotels:", filteredHotels);

  }, [filteredHotels]);

  // extracts all the ids from the hotels list
  const extractHotelIds = (hotels) => {
    return hotels.map(hotel => hotel.hotelId);
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
          </div>
  
          <button
            className="bg-black text-white p-3 rounded-full"
            onClick={handleSearch}
          >
            Search Hotels
          </button>

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
