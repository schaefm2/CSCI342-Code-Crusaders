import React from "react";
import StarIcon from "../../assets/star.svg";

const Hotel = ({ hotel }) => {
  return (
    <div className="w-80 shadow">
      <img src={hotel.img}></img>
      <div className="flex justify-between mt-2">
        <ul className="p-2 font-semibold">{hotel.hotelName}</ul>
        <ul className="p-2 font-bold">{hotel.location}</ul>
      </div>
      <div className="flex justify-between mt-2">
        <p className="text-lg font-bold">${hotel.avgPrice}</p>
        {Array.from({ length: hotel.rating }).map((_, index) => {
          return (
            <img
              key={index}
              src={StarIcon}
              alt="Star rating"
              className="w-6 h-6"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Hotel;
