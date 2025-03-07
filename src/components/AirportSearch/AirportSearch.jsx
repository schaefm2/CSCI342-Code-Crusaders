import React, { useState, useCallback } from "react";
import { useDebounce } from "react-use";
import { fetchAirportCities } from "../FlightData/AmadeusAPITokenCreation";
const AirportSearch = ({ placeholder }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);

  // Debounce the search input
  useDebounce(
    async () => {
      if (query.length > 2 && !selected) {
        const results = await fetchAirportCities(query);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    },
    500, // Delay in ms
    [query]
  );

  // Handle selection of a suggestion
  const handleSelect = (item) => {
    setSelected(item);
    setQuery(`${item.name} (${item.iataCode})`); // Display selected value
    setSuggestions([]); // Clear suggestions
  };
  return (
    <div className="shadow">
      <input
        className="w-50 h-15 text-lg px-2"
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelected(null);
        }}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((item) => (
            <li
              className="cursor-pointer"
              key={item.id}
              onClick={() => handleSelect(item)}
            >
              {item.name} ({item.iataCode}) - {item.address.countryCode}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AirportSearch;
