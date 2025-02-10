import React, { useState } from "react";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";

const Search = () => {
  const [query, setQuery] = useState("");

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
          <GeoapifyGeocoderAutocomplete
            placeholder="Enter a location or address"
            type="city"
            value={query}
          />
        </div>
      </GeoapifyContext>
    </>
  );
};

export default Search;
