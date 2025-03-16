import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateTrip from "../components/Trip/CreateTrip";
import Trips from "../components/Trip/Trips";
import { NavLink } from "react-router-dom";
import ItinView from "../components/Itinerary/ItinView";
import { div } from "prelude-ls";

const TripsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [tripList, setTripList] = useState(null);
  const [displayedItin, setDisplayedItin] = useState(null);
  const [creatingTrip, setCreatingTrip] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTrips(user.email);
  }, [displayedItin, creatingTrip]);

  const getTrips = async (email) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/gettrips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error("Error getting users trips");
      }
      const json = await response.json();
      setTripList(json.trips);
      console.log(json);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTrip = () => {
    setCreatingTrip(true);
    getTrips(user.email); // Fetch trips after creating a new trip
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen overflow-x-hidden mt-10">
      {user.email ? (
        <div className="flex">
          <div className="p-4 cursor-pointer">
            {tripList && tripList.length > 0 ? (
              <div>
                {tripList.map((trip, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer"
                    onClick={() => {
                      setCreatingTrip(false);
                      setDisplayedItin(trip);
                    }}
                  >
                    <h3 className="text-xl font-semibold">{trip.tripName}</h3>
                    <p className="text-gray-600">{trip.startDate}</p>
                  </div>
                ))}
                <button
                  className="bg-blue-500 text-white shadow"
                  onClick={handleCreateTrip} // Updated to use handleCreateTrip
                >
                  Create Trip
                </button>
              </div>
            ) : (
              <CreateTrip setCreatingTrip={setCreatingTrip} />
            )}
          </div>
          {creatingTrip ? (
            <CreateTrip setCreatingTrip={setCreatingTrip} />
          ) : (
            displayedItin && (
              <div>
                <ItinView itinerary={displayedItin} />
              </div>
            )
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
