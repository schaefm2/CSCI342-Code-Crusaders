import React, { useState } from "react";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";

// import { ColorThemeProvider, colorTheme } from './ColorTheme/ColorTheme.jsx';
import { userColorTheme } from "../ColorTheme/ColorTheme";

const Search = ({ placeholder, className }) => {
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
        <div className={className}>
          {/* below is the textfield used in the search */}
          <GeoapifyGeocoderAutocomplete
            placeholder={placeholder}
            type="city"
            value={query}
            onChange={handleInputChange}
            onSelect={handlePlaceSelect}
          />
        </div>
      </GeoapifyContext>
    </>
  );
};

export default Search;
