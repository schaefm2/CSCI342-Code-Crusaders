import React, { useState } from "react";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";

const Search = ({ placeholder, className, value, onPlaceSelect }) => {
  const [query, setQuery] = useState(value);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handlePlaceSelect = (value) => {
    console.log("handlePlaceSelect called with value: ", value);
    if (onPlaceSelect) {
      onPlaceSelect(value);
    }
  };

  return (
    <GeoapifyContext apiKey="e96aed6945a84bcbb46d19d02f54e66c">
      <div className={className}>
        <GeoapifyGeocoderAutocomplete
          placeholder={placeholder}
          type="city"
          value={query}
          onChange={(e) => handleInputChange(e)}
          onPlaceSelect={(value) => handlePlaceSelect(value)}
          className="rounded-full"
        />
      </div>
    </GeoapifyContext>
  );
};

export default Search;
