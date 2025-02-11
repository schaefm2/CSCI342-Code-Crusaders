import React, { useState } from "react";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";

// import { ColorThemeProvider, colorTheme } from './ColorTheme/ColorTheme.jsx';
import { userColorTheme } from "../ColorTheme/ColorTheme";
import './Search.css';


const Search = () => {
  const [query, setQuery] = useState("");
  const { theme } = userColorTheme();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", query);
    // Add your search logic here
  };

  const handlePlaceSelect = (value) => {
    console.log("Selected place:", value);
    setQuery(value.properties.formatted);
  };

  return (
    <>
      <GeoapifyContext apiKey="e96aed6945a84bcbb46d19d02f54e66c">
        <div>
          {/* below is the textfield used in the search */}
          <GeoapifyGeocoderAutocomplete
            placeholder="Enter a location or address"
            type="city"
            value={query}
            // onChange={handleInputChange} 
            // onSelect={handlePlaceSelect} 
          />

          {/* Button used to submit search */}
          <button
            className="search-button"
            onClick={handleSearch} // Trigger search on click of button
          >
            Search
          </button>

        </div>
      </GeoapifyContext>
    </>
  );
};

export default Search;
