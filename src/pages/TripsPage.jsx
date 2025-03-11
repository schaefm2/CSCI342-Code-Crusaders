import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateTrip from "../components/Trip/CreateTrip";
import Trips from "../components/Trip/Trips";
import { NavLink } from "react-router-dom";

const TripsPage = () => {
  const { user } = useSelector((state) => state.auth);

  const handleNav = () => {};
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen overflow-x-hidden mt-10">
      {user.email ? (
        <div>
          <Trips />
          <CreateTrip />
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
