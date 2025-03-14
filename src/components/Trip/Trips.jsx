import React, { useState, useEffect } from "react";
const trips = [
  { title: "Europe", startDate: "3/01/2025" },
  { title: "Europe", startDate: "3/01/2025" },
  { title: "Europe", startDate: "3/01/2025" },
];
const Trips = () => {
  const [tripList, setTripList] = useState([]);

  useEffect(() => {
    // Simulate fetching trips
    setTimeout(() => {
      setTripList(trips);
    }, 1000);
  }, []);

  const handleClick = () => {};

  return (
    <div className="p-4">
      {tripList.map((trip, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 mb-4"
          onClick={handleClick}
        >
          <h3 className="text-xl font-semibold">{trip.title}</h3>
          <p className="text-gray-600">{trip.startDate}</p>
        </div>
      ))}
    </div>
  );
  return <div></div>;
};

export default Trips;
