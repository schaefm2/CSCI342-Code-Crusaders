import React, { useState, useRef } from "react";
import AirportSearch from "../components/AirportSearch/AirportSearch";
import arrow from "../assets/arrow.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAccessToken } from "../components/AccessTokenContext/AccessTokenContext.jsx";
import flightSearch from "../components/FlightData/FlightData.jsx";
import { formatProdErrorMessage } from "@reduxjs/toolkit";
import { computedTypesResolver } from "@hookform/resolvers/computed-types";

const FlightsPage = () => {
  const [oneWay, setOneWay] = useState(false);
  const { accessToken, loading } = useAccessToken();

  const [originState, setOrigin] = useState('JFK');
  const [destinationState, setDestination] = useState('LAX');
  const [departureDateState, setDepartureDate] = useState(new Date('2025-05-01'));
  const [returnDateState, setReturnDate] = useState(new Date('2025-05-10'));
  const [adultsState, setAdults] = useState('2');
  const [maxPriceState, setMaxPrice] = useState('499');
  const [currencyCodeState, setCurrencyCode] = useState('USD');

  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);

  const originRef = useRef();
  const destinationRef = useRef();

  // Format to 'YYYY-MM-DD' but not needed if doing it directly in useStates
  // const formattedDepartureDate = departureDateState.toISOString().split('T')[0];
  // const formattedReturnDate = returnDateState.toISOString().split('T')[0]; 


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

  // used to make sure default of 5pm doesn't round the scheduled day to the following day from rounding
  const setDateToMidnight = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0); // Set time to midnight
    return d;
  };

  const handleSearch = () => {
    if (loading) {
      console.log("Awaiting access token");
    }

    if (!accessToken) {
      console.log("Failed to get access token");
      return;
    }

    console.log(`None formatted depart date: ${departureDateState}  with formatted return date: ${returnDateState}`)

    const formattedDepartureDate = setDateToMidnight(departureDateState).toISOString().split('T')[0]; // Format to 'YYYY-MM-DD'
    const formattedReturnDate = setDateToMidnight(returnDateState).toISOString().split('T')[0]; // Format to 'YYYY-MM-DD'
    console.log(`Formatted depart date: ${formattedDepartureDate}  with formatted return date: ${formattedReturnDate}`)

    // Slice here to get last 5 characters which are the airport code: (###)
    // const originAirport = originRef.current.value.slice(-5);
    // const destinationAirport = destinationRef.current.value.slice(-5);

    const originAirport = originRef.current.value.slice(-4, -1);
    const destinationAirport = destinationRef.current.value.slice(-4, -1);

    console.log(`Departure airport: ${originAirport}    Destination airport: ${destinationAirport}`)

    setOrigin(originAirport);
    setDestination(destinationAirport);
    console.log(`Updated Departure state airport: ${originAirport}    Updated Destination state airport: ${destinationAirport}`);


    flightSearch({
      accessToken,
      // originLocationCode: originState,
      // destinationLocationCode: destinationState,
      originLocationCode: originAirport,
      destinationLocationCode: destinationAirport,
      departureDate: formattedDepartureDate,
      returnDate: !oneWay ? formattedReturnDate : null,
      adults: Number(adultsState),
      maxPrice: Number(maxPriceState),
      currencyCode: currencyCodeState,
      setFlights,
      setError,
    });
    console.log(flights);


    // setOrigin(originAirport);
    // setDestination(destinationAirport);
    // console.log(`Updated Departure state airport: ${originAirport}    Updated Destination state airport: ${destinationAirport}`);

    return null;
  };

  
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex flex-row items-center justify-center">
      <AirportSearch 
          placeholder="From" 
          // onSelect={(airportCode) => setOrigin(airportCode)} // Update origin airport for search
          ref={originRef}
        />
        {renderArrow()}
        <AirportSearch 
          placeholder="To" 
          // onSelect={(airportCode) => setDestination(airportCode)} // Update destination airport for search
          ref={destinationRef}
          />
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
      <div className="w-full mt-10">
        {flights.map((flight, index) => {
          const departureAirport = flight.itineraries[0].segments[0].departure.iataCode;
          const departureTime = flight.itineraries[0].segments[0].departure.at;
          const arrivalAirport = flight.itineraries[0].segments[0].arrival.iataCode;
          const arrivalTime = flight.itineraries[0].segments[0].arrival.at;

          return (
            <div key={index} className="flex flex-col items-center bg-white shadow-lg rounded-lg mb-6 p-6">
              <div className="w-full flex justify-between items-center">
                <div className="text-xl font-semibold">{departureAirport} to {arrivalAirport}</div>
                <div className="text-lg font-semibold">{flight.price.base} {flight.price.currency}</div>
              </div>
              <div className="w-full mt-2 flex justify-between">
                <div className="text-sm">Departure: {new Date(departureTime).toLocaleString()}</div>
                <div className="text-sm">Arrival: {new Date(arrivalTime).toLocaleString()}</div>
              </div>
              <button className="bg-black text-white p-2 rounded-full mt-4">Add</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlightsPage;
