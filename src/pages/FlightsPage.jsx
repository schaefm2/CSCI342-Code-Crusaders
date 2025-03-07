import React, { useState } from "react";
import AirportSearch from "../components/AirportSearch/AirportSearch";
import arrow from "../assets/arrow.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FlightsPage = () => {
  const [oneWay, setOneWay] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
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
    </div>
  );
};

export default FlightsPage;
