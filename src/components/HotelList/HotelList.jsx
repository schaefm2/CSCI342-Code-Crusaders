import React from "react";
import Hotel from "../Hotel/Hotel";

const HotelList = ({ Hotles }) => {
  const Hotels = [
    {
      hotelName: "Marriot",
      avgPrice: "80",
      location: "Seattle",
      img: "https://img.freepik.com/free-vector/hotel-building-tropical-country-with-palms-cartoon-icon_1284-63176.jpg?semt=ais_hybrid",
      rating: "5",
    },
    {
      hotelName: "Marriot",
      avgPrice: "80",
      location: "Seattle",
      img: "https://img.freepik.com/free-vector/hotel-building-tropical-country-with-palms-cartoon-icon_1284-63176.jpg?semt=ais_hybrid",
      rating: "5",
    },
    {
      hotelName: "Marriot",
      avgPrice: "80",
      location: "Seattle",
      img: "https://img.freepik.com/free-vector/hotel-building-tropical-country-with-palms-cartoon-icon_1284-63176.jpg?semt=ais_hybrid",
      rating: "5",
    },
  ];
  return (
    <div className="flex flex-auto justify-between space-x-4">
      {Hotels.map((hotel, index) => {
        return <Hotel key={index} hotel={hotel} className="m-2" />;
      })}
    </div>
  );
};

export default HotelList;
