import React, { useState, useEffect } from "react";

const ItinView = ({ itinerary }) => {
  const [itineraryData, setItineraryData] = useState(itinerary);

  useEffect(() => {
    setItineraryData(itinerary);
  }, [itinerary]);

  const handleEdit = (dayIndex, activityIndex) => {
    const newActivityName = prompt("Enter new activity name:");
    const newActivityTime = prompt("Enter new activity time:");
    const newActivityAddress = prompt("Enter new activity address:");
    const newActivityDescription = prompt("Enter new activity description:");

    const updatedDayInfo = itineraryData.dayInfo.map((day, dIndex) => {
      if (dIndex === dayIndex) {
        return {
          ...day,
          activities: day.activities.map((activity, aIndex) => {
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

    setItineraryData({ ...itineraryData, dayInfo: updatedDayInfo });
  };

  const handleDelete = (dayIndex, activityIndex) => {
    const updatedDayInfo = itineraryData.dayInfo.map((day, dIndex) => {
      if (dIndex === dayIndex) {
        return {
          ...day,
          activities: day.activities.filter(
            (_, aIndex) => aIndex !== activityIndex
          ),
        };
      }
      return day;
    });

    setItineraryData({ ...itineraryData, dayInfo: updatedDayInfo });
  };

  const handleAddActivity = (dayIndex) => {
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

    const updatedDayInfo = itineraryData.dayInfo.map((day, dIndex) => {
      if (dIndex === dayIndex) {
        return {
          ...day,
          activities: [...day.activities, newActivity],
        };
      }
      return day;
    });

    setItineraryData({ ...itineraryData, dayInfo: updatedDayInfo });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-200 mx-auto">
      <h1 className="text-4xl font-bold mb-4">{itineraryData.title}</h1>
      <p className="text-lg mb-6">
        {itineraryData.startDate} - {itineraryData.endDate}
      </p>
      {itineraryData.dayInfo.map((day, index) => (
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
              {day.activities.map((activity, idx) => (
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
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ItinView;
