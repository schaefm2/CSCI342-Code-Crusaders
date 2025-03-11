import React from "react";
const itenerary = {
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
const ItenView = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen w-200 mx-auto">
      <h1 className="text-4xl font-bold mb-4">{itenerary.title}</h1>
      <p className="text-lg mb-6">
        {itenerary.startDate} - {itenerary.endDate}
      </p>
      {itenerary.dayInfo.map((day, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            Day {index + 1}: {day.location}
          </h2>
          <p className="text-md mb-4">{day.date}</p>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ItenView;
