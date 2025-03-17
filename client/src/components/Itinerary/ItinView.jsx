import React, { useState, useEffect } from "react";
import axios from "axios";

const ItinView = ({ itinerary }) => {
  const [itineraryData, setItineraryData] = useState(itinerary);

  useEffect(() => {
    setItineraryData(itinerary);
  }, [itinerary]);

  const handleEdit = async (dayIndex, activityIndex) => {
    const newActivityName = prompt("Enter new activity name:");
    const newActivityTime = prompt("Enter new activity time:");
    const newActivityAddress = prompt("Enter new activity address:");
    const newActivityDescription = prompt("Enter new activity description:");

    const updateddays = itineraryData.days.map((day, dIndex) => {
      if (dIndex === dayIndex) {
        return {
          ...day,
          events: day.events.map((activity, aIndex) => {
            if (aIndex === activityIndex) {
              return {
                ...activity,
                name: newActivityName,
                time: newActivityTime,
                address: newActivityAddress,
                description: newActivityDescription,
              };
            }
            return activity;
          }),
        };
      }
      return day;
    });

    setItineraryData({ ...itineraryData, days: updateddays });

    try {
      // Update event in the backend
      const response = await axios.post("http://localhost:3000/api/addevent", {
        email: itineraryData.email,
        tripName: itineraryData.tripName,
        event: {
          ...updateddays[dayIndex].events[activityIndex],
          day: itineraryData.days[dayIndex].date,
        },
      });

      if (!response.status === 200) {
        throw new Error("Failed to update event");
      }
      console.log(
        "Event updated successfully:",
        updateddays[dayIndex].events[activityIndex]
      );
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDelete = async (dayIndex, activityIndex) => {
    const updateddays = itineraryData.days.map((day, dIndex) => {
      if (dIndex === dayIndex) {
        return {
          ...day,
          events: day.events.filter((_, aIndex) => aIndex !== activityIndex),
        };
      }
      return day;
    });

    setItineraryData({ ...itineraryData, days: updateddays });

    try {
      // Delete event from the backend
      const response = await fetch("http://localhost:3000/api/deleteevent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: itineraryData.email,
          tripName: itineraryData.tripName,
          event: {
            ...itineraryData.days[dayIndex].events[activityIndex],
            day: itineraryData.days[dayIndex].date,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      console.log(
        "Event deleted successfully:",
        itineraryData.days[dayIndex].events[activityIndex]
      );
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleAddActivity = async (dayIndex) => {
    const newActivityName = prompt("Enter new activity name:");
    const newActivityTime = prompt("Enter new activity time:");
    const newActivityAddress = prompt("Enter new activity address:");
    const newActivityDescription = prompt("Enter new activity description:");

    const newActivity = {
      name: newActivityName,
      time: newActivityTime,
      address: newActivityAddress,
      description: newActivityDescription,
    };

    const updateddays = itineraryData.days.map((day, dIndex) => {
      if (dIndex === dayIndex) {
        return {
          ...day,
          events: [...day.events, newActivity],
        };
      }
      return day;
    });

    setItineraryData({ ...itineraryData, days: updateddays });

    try {
      // Add event to the backend
      const response = await fetch("http://localhost:3000/api/addevent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: itineraryData.email,
          tripName: itineraryData.tripName,
          event: {
            ...newActivity,
            day: itineraryData.days[dayIndex].date,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add event");
      }
      console.log("Event added successfully:", newActivity);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-200 mx-auto">
      <h1 className="text-4xl font-bold mb-4">{itineraryData.tripName}</h1>
      <p className="text-lg mb-6">
        {itineraryData.startDate} - {itineraryData.endDate}
      </p>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Hotels</h2>
        {itineraryData.hotels.map((hotel, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold">{hotel.name}</h3>
            <p>{hotel.city}</p>
            <p>Check-in: {hotel.checkIn}</p>
            <p>Check-out: {hotel.checkOut}</p>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Flights</h2>
        {itineraryData.flights.map((flight, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold">Flight {index + 1}</h3>
            <p>
              Departure: {flight.departure} at {flight.departureTime} on{" "}
              {flight.departureDate}
            </p>
            <p>
              Arrival: {flight.arrival} at {flight.arrivalTime} on{" "}
              {flight.arrivalDate}
            </p>
            <p>
              Price: {flight.price} {flight.currency}
            </p>
          </div>
        ))}
      </div>
      {itineraryData.days.map((day, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            Day {index + 1}: {day.location}
          </h2>
          <p className="text-md mb-4">{day.date}</p>
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleAddActivity(index)}
          >
            Add Activity
          </button>
          <table className="w-full text-left">
            <tbody>
              {day.events.map((activity, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-2 pr-4 text-sm text-gray-500">
                    {activity.time}
                  </td>
                  <td className="py-2">
                    <strong className="block text-lg">{activity.name}</strong>
                    <p className="mt-1">{activity.description}</p>
                    <p className="text-sm text-gray-400">{activity.address}</p>
                  </td>
                  <td className="py-2 text-right">
                    <button
                      className="text-blue-500 hover:underline mr-2"
                      onClick={() => handleEdit(index, idx)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(index, idx)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {itineraryData.hotels.map((hotel, hotelIndex) => (
                <>
                  {hotel.checkIn === day.date && (
                    <tr key={`checkin-${hotelIndex}`} className="border-b">
                      <td className="py-2 pr-4 text-sm text-gray-500">
                        Check-in
                      </td>
                      <td className="py-2">
                        <strong className="block text-lg">{hotel.name}</strong>
                        <p className="mt-1">Check-in at {hotel.checkIn}</p>
                        <p className="text-sm text-gray-400">{hotel.address}</p>
                      </td>
                    </tr>
                  )}
                  {hotel.checkOut === day.date && (
                    <tr key={`checkout-${hotelIndex}`} className="border-b">
                      <td className="py-2 pr-4 text-sm text-gray-500">
                        Check-out
                      </td>
                      <td className="py-2">
                        <strong className="block text-lg">{hotel.name}</strong>
                        <p className="mt-1">Check-out at {hotel.checkOut}</p>
                        <p className="text-sm text-gray-400">{hotel.address}</p>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ItinView;
