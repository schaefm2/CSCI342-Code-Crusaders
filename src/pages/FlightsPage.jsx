import React, { useState } from "react";
import AirportSearch from "../components/AirportSearch/AirportSearch";
import arrow from "../assets/arrow.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAccessToken } from "../components/AccessTokenContext/AccessTokenContext.jsx";
import flightSearch from "../components/FlightData/FlightData.jsx";

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
  const [error, setError] = useState(null);

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
    if (loading) {
      console.log("Awaiting access token");
    }

    if (!accessToken) {
      console.log("Failed to get access token");
      return;
    }
    flightSearch({
      accessToken,
      originLocationCode: "JFK",
      destinationLocationCode: destinationState,
      departureDate: departureDateState,
      returnDate: returnDateState,
      adults: Number(adultsState),
      maxPrice: Number(maxPriceState),
      currencyCode: currencyCodeState,
      setFlights,
      setError,
    });
    console.log(flights);
    return null;
  };
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex flex-row items-center justify-center">
        <AirportSearch placeholder="From" />
        {renderArrow()}
        <AirportSearch placeholder="To" />
      </div>
      <div className="px-4 flex flex-row items-center justify-center">
        <div className="flex flex-col items-center p-4">
          <label className="mb-2 text-lg font-semibold">Departing</label>
          <DatePicker
            selected={departureDateState}
            onChange={(date) => setDepartureDate(date)}
            className="w-full p-2 rounded-full shadow text-center"
          />
        </div>
        {!oneWay && (
          <div className="flex flex-col items-center p-4">
            <label className="mb-2 text-lg font-semibold">Returning</label>
            <DatePicker
              selected={returnDateState}
              onChange={(date) => setReturnDate(date)}
              className="w-full p-2 rounded-full shadow text-center"
            />
          </div>
        )}
      </div>
      <button className="bg-black text-white" onClick={handleSearch}>
        Search Flights
      </button>
      {flights.map((flight, index) => {
        return (
          <div className="flex justiy-center shadow">
            <div className="p-4" key={index}>
              From {flight.itineraries[0].segments[0].departure.iataCode}
            </div>
            <div className="p-4">Price {flight.price.base}</div>
            <div className="p-4">
              {flight.itineraries[0].segments[0].departure.at}
            </div>
            <button className="bg-black text-white">Add</button>
          </div>
        );
      })}
    </div>
  );
};

export default FlightsPage;
