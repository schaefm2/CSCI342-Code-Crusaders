import React, { useState, useEffect } from "react";
import Search from "../Search/Search.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import minus from "../../assets/minus.svg";
import axios from "axios";
import { useSelector } from "react-redux";

const CreateTrip = ({ setCreatingTrip }) => {
  const [locations, setLocations] = useState([
    { place: "", startDate: new Date(), endDate: new Date() },
  ]);
  const [trip, setTrip] = useState({ title: "", locations: locations });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setTrip((prevTrip) => ({ ...prevTrip, locations }));
  }, [locations]);

  const handleAddLocation = () => {
    setLocations([
      ...locations,
      { place: "", startDate: new Date(), endDate: new Date() },
    ]);
  };

  const handleRemoveLocation = (index) => {
    const newLocations = locations.filter((_, i) => i !== index);
    setLocations(newLocations);
  };

  const handleChange = (index, field, value) => {
    console.log("Changing " + field + " to " + value);
    const newLocations = locations.map((location, i) =>
      i === index ? { ...location, [field]: value } : location
    );
    setLocations(newLocations);
  };

  const handleTitleChange = (e) => {
    setTrip({ ...trip, title: e.target.value });
  };

  const handlePlaceSelect = (index, place) => {
    console.log(
      `handlePlaceSelect called for index ${index} with place: `,
      place
    );
    handleChange(index, "place", place.properties.formatted);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/trip", {
        email: user.email,
        tripName: trip.title,
        startDate: locations[0].startDate.toISOString().split("T")[0],
        endDate: locations[locations.length - 1].endDate
          .toISOString()
          .split("T")[0],
        days: locations.map((location) => ({
          location: location.place,
          date: location.startDate.toISOString().split("T")[0],
          events: [],
        })),
        flights: [],
        hotels: [],
      });

      if (response.status !== 201) {
        throw new Error(response.data.message || "Something went wrong");
      }
      setCreatingTrip(false);
    } catch (error) {
      console.error("Error creating trip:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-white shadow p-10 max-w-3xl mx-auto"
      onSubmit={handleSubmit}
      disabled={loading}
    >
      <input
        className="bg-gray-100 p-2 rounded-full shadow w-full mb-4"
        placeholder="Title of your trip"
        value={trip.title}
        onChange={handleTitleChange}
      />
      {locations.map((location, index) => (
        <div key={index} className="bg-white mb-6 p-4 rounded-lg shadow-md">
          <div className="p-4">
            <Search
              placeholder={"Search a city/place"}
              className="shadow rounded-full w-full mb-4"
              onSelect={(place) => handlePlaceSelect(index, place)}
            />
            <div>
              <DatePicker
                selected={location.startDate}
                onChange={(date) => handleChange(index, "startDate", date)}
                className="w-full mb-4 p-2 rounded-full shadow"
              />
              <DatePicker
                selected={location.endDate}
                onChange={(date) => handleChange(index, "endDate", date)}
                className="w-full mb-4 p-2 rounded-full shadow"
              />
            </div>
          </div>
          <button
            className="rounded-full bg-red-500 text-white p-2"
            title="Delete"
            type="button"
            onClick={() => handleRemoveLocation(index)}
          >
            <img src={minus} className="w-4 h-4" alt="Minus" />
          </button>
        </div>
      ))}
      <div className="flex flex-col">
        <button
          type="button"
          onClick={handleAddLocation}
          className="mt-4 bg-blue-500 text-white p-2 rounded-full shadow"
        >
          Add location
        </button>
        <button
          type="submit"
          className="mt-4 bg-orange-500 text-white p-2 rounded-full shadow"
        >
          Create Trip
        </button>
      </div>
    </form>
  );
};

export default CreateTrip;
