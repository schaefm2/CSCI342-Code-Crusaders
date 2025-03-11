import React, { useState } from "react";
import AirportSearch from "../components/AirportSearch/AirportSearch";
import arrow from "../assets/arrow.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAccessToken } from "../components/AccessTokenContext/AccessTokenContext.jsx";

const FlightsPage = () => {
  const [oneWay, setOneWay] = useState(false);
  const { accessToken, loading } = useAccessToken();

  const [originState, setOrigin] = useState("JFK");
  const [destinationState, setDestination] = useState("LAX");
  const [departureDateState, setDepartureDate] = useState("2025-05-01");
  const [returnDateState, setReturnDate] = useState("2025-05-10");
  const [adultsState, setAdults] = useState("2");
  const [maxPriceState, setMaxPrice] = useState("499");
  const [currencyCodeState, setCurrencyCode] = useState("USD");

  const [flights, setFlights] = useState([]);

  const renderArrow = () => {
    if (oneWay) {
      return (
        <img
          onClick={() => setOneWay(!oneWay)}
          src={arrow}
          className="cursor-pointer w-6 h-6"
        />
      );
    } else {
      return (
        <div className="cursor-pointer" onClick={() => setOneWay(!oneWay)}>
          <img src={arrow} className="w-6 h-6 transform rotate-180" />
          <img src={arrow} className="w-6 h-6" />
        </div>
      );
    }
  };
  const handleSearch = () => {
    return null;
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center justify-center">
        <AirportSearch placeholder="From" />
        {renderArrow()}
        <AirportSearch placeholder="To" />
      </div>
      <div className="px-4 flex flex-row items-center justify-center">
        <div className="flex flex-col items-center p-4">
          <label className="mb-2 text-lg font-semibold">Departing</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="w-full p-2 rounded-full shadow text-center"
          />
        </div>
        {!oneWay && (
          <div className="flex flex-col items-center p-4">
            <label className="mb-2 text-lg font-semibold">Returning</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="w-full p-2 rounded-full shadow text-center"
            />
          </div>
        )}
      </div>
      <button className="bg-black text-white" onClick={handleSearch}>
        Search Flights
      </button>
    </div>
  );
};

export default FlightsPage;
