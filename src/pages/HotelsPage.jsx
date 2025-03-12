import React, { useState, useRef, useEffect } from "react";
import HotelList from "../components/HotelList/HotelList";
import Search from "../components/Search/Search";
import HotelSearch from "../components/Hotels/HotelData";
import { useAccessToken } from "../components/AccessTokenContext/AccessTokenContext.jsx";


const HotelsPage = () => {

  const { accessToken, loading } = useAccessToken();

  const [cityCodeState, setCityCode] = useState();
  const [radiusState, setRadius] = useState();

  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);  // copy for filtering without manipulating original result

  const [error, setError] = useState(null);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const handleSearch = () =>{
    if (!accessToken) {
      console.log("Failed to get access token");
      return;
    }

    console.log('Calling HotelSearch from HotelsPage');

    HotelSearch({
      accessToken,
      cityCode: 'SEA',
      radius: 5,
      setHotels,
      setError
    });

    console.log(hotels);

    setSearchTriggered(true);

    return null;
  };
  

  const handleCitySelect = (place) => {
    if (place) {
      // Assuming place.iataCode contains the city code, but you can modify this as needed
      setCityCode(place.properties.cityCode || place.properties.iataCode);
    }
  };


  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4">
        <Search
          className="rounded-full shadow p-2 mb-4"
          placeholder="Enter A City"
          onSelect={handleCitySelect}
        />

        <button className="bg-black text-white" onClick={handleSearch}>
          Search Hotels
        </button>

        <div className="space-x-2">
          <button className="!bg-white text-black px-4 py-2 rounded !hover:bg-blue-700 !active:bg-blue-900">
            Price Ascending
          </button>
          <button className="!bg-white text-black px-4 py-2 rounded !hover:bg-blue-700 !active:bg-blue-900">
            Price Descending
          </button>
          <button className="!bg-white text-black px-4 py-2 rounded ">
            Rating
          </button>
        </div>
      </div>
      

      <HotelList />
    </div>
  );
};

export default HotelsPage;
