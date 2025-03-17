import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAccessToken } from "../AccessTokenContext/AccessTokenContext.jsx";
import { useSelector } from "react-redux";

const HotelView = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [hotelData, setHotelData] = useState(location.state?.hotel || {});
  const [tripsList, setTripList] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState("");

  useEffect(() => {
    if (location.state?.hotel) {
      setHotelData(location.state.hotel);
      console.log("Good state");
      console.log(location.state.hotel);
    }
    getTrips(user.email);
  }, [location.state]);

  const getTrips = async (email) => {
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
      if (json.trips.length > 0) {
        setSelectedTrip(json.trips[0].tripName);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAdd = async () => {
    if (!selectedTrip) {
      console.log("Please select a trip");
      return;
    }

    console.log("Selected trip:", selectedTrip);
    console.log("Hotel data:", hotelData);
    try {
      const response = await fetch("http://localhost:3000/api/addhotel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          tripName: selectedTrip,
          hotel: {
            name: hotelData.hotel.name,
            city: hotelData.hotel.cityCode,
            checkIn: hotelData.offers[0].checkInDate,
            checkOut: hotelData.offers[0].checkOutDate,
          },
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error adding hotel to trip: ${response.status} ${response.statusText} - ${errorText}`
        );
      }
      const result = await response.json();
      console.log(result.message);
      console.log(result.trip);
      console.log("Successfully added");
    } catch (error) {
      console.log("Error adding hotel to trip:", error.message);
    }
  };

  useEffect(() => {
    if (hotelData.hotel.name) {
      const fetchImages = async () => {
        try {
          const response = await fetch(
            `https://www.googleapis.com/customsearch/v1?q=${hotelData.hotel.name}&cx=3671b3f45ec244689&searchType=image&key=AIzaSyDr1PZL1FtszKOJWE8ju-oN7nbAQtNFyWs`
          );
          const data = await response.json();
          console.log(data);
          setImages(data.items);
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      };

      fetchImages();
    }
  }, [location.state]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">{hotelData.hotel.name}</h1>
      <p className="text-xl mb-4">
        <span className="font-semibold"></span>{" "}
        {hotelData.offers[0].room.description.text}
      </p>
      <p className="text-xl mb-4">
        <span className="font-semibold">Price:</span> $
        {hotelData.offers[0].price.base}
      </p>
      <select
        className="mb-6 p-3 border rounded"
        value={selectedTrip}
        onChange={(e) => setSelectedTrip(e.target.value)}
      >
        {tripsList.map((trip, index) => (
          <option key={index} value={trip.tripName}>
            {trip.tripName}
          </option>
        ))}
      </select>
      <button className="ml-2 bg-blue-500 text-white" onClick={handleAdd}>
        Add to itinerary
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* {Array.from({ length: 10 }).map((_, index) => (
          <img
            key={index}
            src="https://cache.marriott.com/is/image/marriotts7prod/br-seasm-exterior-signage-84882:Wide-Hor?wid=375&fit=constrain"
            alt={`Hotel view ${index + 1}`}
            className="w-full h-auto rounded shadow-lg"
          />
        ))} */}
        {images.map((image) => (
          <img
            key={image.link}
            src={image.link}
            alt={image.title}
            className="w-full h-auto rounded shadow-md"
          />
        ))}
      </div>
    </div>
  );
};

export default HotelView;
