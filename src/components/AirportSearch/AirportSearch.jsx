import React, { useState, useCallback } from "react";
import { useDebounce } from "react-use";
import { fetchAirportCities } from "../FlightData/AmadeusAPITokenCreation";

// Forward ref to the input element
const AirportSearch = React.forwardRef(({ placeholder }, ref) => {
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
    500, // Delay in ms 500 is .5 seconds
    [query]
  );

  // Handle selection of a suggestion
  const handleSelect = (item) => {
    setSelected(item);
    setQuery(`${item.name} (${item.iataCode})`); // Display selected value
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div className="relative">
      <input
        ref={ref}
        className="w-50 h-15 text-lg px-2 bg-gray-100 rounded-md"
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelected(null);
        }}
      />

      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 bg-white shadow-lg rounded-md max-h-40 overflow-auto w-full z-10 border border-gray-300">
          {suggestions.map((item) => (
            <li
              className="cursor-pointer px-4 py-2 hover:bg-gray-200"
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
});

export default AirportSearch;
