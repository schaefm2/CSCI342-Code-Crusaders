import React, { useState } from "react";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";

const Search = ({ placeholder, className, onSelect }) => {
  const onPlaceSelect = (place) => {
    console.log("onPlaceSelect fired");
    if (place) {
      console.log("Place selected:", place);
      onSelect(place);
    } else {
      console.log("No place data received.");
    }
  };
  return (
    <GeoapifyContext apiKey="e96aed6945a84bcbb46d19d02f54e66c">
      <div className={className}>
        <GeoapifyGeocoderAutocomplete
          placeholder={placeholder}
          type="city"
          placeSelect={onPlaceSelect}
        />
      </div>
    </GeoapifyContext>
  );
};

export default Search;
