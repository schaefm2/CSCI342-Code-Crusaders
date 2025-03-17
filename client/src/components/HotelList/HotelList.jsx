import React, { useState, useEffect } from "react";
import Hotel from "../Hotel/Hotel";

const HotelList = ({ hotels }) => {
  const [hotelList, sethotelLIst] = useState(hotels);
  useEffect(() => {
    sethotelLIst(hotels);
  }, [hotels]);
  return (
    <div className="flex flex-wrap gap-4">
      {hotelList.slice(0, 4).map((hotel, index) => {
        return (
          <div key={index} className="flex-1 min-w-[calc(25%-16px)] box-border">
            <Hotel hotel={hotel} />
          </div>
        );
      })}
    </div>
  );
};

export default HotelList;

// const Hotels = [
//   {
//     hotelName: "Marriot",
//     avgPrice: "80",
//     location: "Seattle",
//     img: "https://img.freepik.com/free-vector/hotel-building-tropical-country-with-palms-cartoon-icon_1284-63176.jpg?semt=ais_hybrid",
//     rating: "5",
//   },
//   {
//     hotelName: "Marriot",
//     avgPrice: "80",
//     location: "Seattle",
//     img: "https://img.freepik.com/free-vector/hotel-building-tropical-country-with-palms-cartoon-icon_1284-63176.jpg?semt=ais_hybrid",
//     rating: "5",
//   },
//   {
//     hotelName: "Marriot",
//     avgPrice: "80",
//     location: "Seattle",
//     img: "https://img.freepik.com/free-vector/hotel-building-tropical-country-with-palms-cartoon-icon_1284-63176.jpg?semt=ais_hybrid",
//     rating: "5",
//   },
// ];
