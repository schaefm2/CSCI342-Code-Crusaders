import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateTrip from "../components/Trip/CreateTrip";
import Trips from "../components/Trip/Trips";
import { NavLink } from "react-router-dom";
import ItinView from "../components/Itinerary/ItinView";
const itinerary = {
  title: "My trip",
  startDate: "3/01/2025",
  endDate: "3/03/2025",
  dayInfo: [
    {
      location: "Seattle",
      date: "3/01/2025",
      activities: [
        {
          name: "Check In",
          time: "9:00am",
          address: "",
          description: "",
        },
        {
          name: "Biking",
          time: "12:00pm",
          description: "Go biking from here to there",
          address: "",
        },
        {
          name: "Tour Thing",
          time: "3:00pm",
          address: "",
          description: "Tour this place",
        },
      ],
    },
    {
      location: "Seattle",
      date: "3/02/2025",
      activities: [
        {
          name: "Check In",
          time: "9:00am",
          address: "",
          description: "",
        },
        {
          name: "Biking",
          time: "12:00pm",
          description: "Go biking from here to there",
          address: "",
        },
        {
          name: "Tour Thing",
          time: "3:00pm",
          address: "",
          description: "Tour this place",
        },
      ],
    },
    {
      location: "Seattle",
      date: "3/01/2025",
      activities: [
        {
          name: "Check Out",
          time: "9:00am",
          address: "this is an address",
          description: "Check out of this hotel",
        },
      ],
    },
  ],
};

const itinerary1 = {
  title: "My other trip",
  startDate: "3/01/2025",
  endDate: "3/03/2025",
  dayInfo: [
    {
      location: "Seattle",
      date: "3/01/2025",
      activities: [
        {
          name: "Check In",
          time: "9:00am",
          address: "",
          description: "",
        },
        {
          name: "Biking",
          time: "12:00pm",
          description: "Go biking from here to there",
          address: "",
        },
        {
          name: "Tour Thing",
          time: "3:00pm",
          address: "",
          description: "Tour this place",
        },
      ],
    },
    {
      location: "Seattle",
      date: "3/02/2025",
      activities: [
        {
          name: "Check In",
          time: "9:00am",
          address: "",
          description: "",
        },
        {
          name: "Biking",
          time: "12:00pm",
          description: "Go biking from here to there",
          address: "",
        },
        {
          name: "Tour Thing",
          time: "3:00pm",
          address: "",
          description: "Tour this place",
        },
      ],
    },
    {
      location: "Seattle",
      date: "3/01/2025",
      activities: [
        {
          name: "Check Out",
          time: "9:00am",
          address: "this is an address",
          description: "Check out of this hotel",
        },
      ],
    },
  ],
};

const TripsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [tripList, setTripList] = useState([itinerary, itinerary1]);
  const [displayedItin, setDisplayedItin] = useState(itinerary);
  const [creatingTrip, setCreatingTrip] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen overflow-x-hidden mt-10">
      {user.email ? (
        <div className="flex">
          <div className="p-4 cursor-pointer">
            {tripList.map((trip, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer"
                onClick={() => {
                  setCreatingTrip(false);
                  setDisplayedItin(trip);
                }}
              >
                <h3 className="text-xl font-semibold">{trip.title}</h3>
                <p className="text-gray-600">{trip.startDate}</p>
              </div>
            ))}
            <button
              onClick={() => setCreatingTrip(true)}
              className="bg-blue-500 text-white shadow-md rounded-lg mb-4 cursor-pointer"
            >
              Create new trip
            </button>
          </div>
          {creatingTrip ? (
            <CreateTrip />
          ) : (
            <div>
              <ItinView itinerary={displayedItin} />
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg font-semibold text-red-500 mb-4">
            Please log in to view your trips.
          </p>
          <NavLink to="/login">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
              Log In
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default TripsPage;
