import React, { useState, useEffect } from "react";
import StarIcon from "../../assets/star.svg";
import { Link } from "react-router-dom";

const Hotel = ({ hotel }) => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (hotel.hotel.name) {
      const fetchImages = async () => {
        try {
          const response = await fetch(
            `https://www.googleapis.com/customsearch/v1?q=${hotel.hotel.name}&cx=3671b3f45ec244689&searchType=image&key=AIzaSyDr1PZL1FtszKOJWE8ju-oN7nbAQtNFyWs`
          );
          const data = await response.json();
          console.log(data);
          setImage(data.items[0]);
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      };

      fetchImages();
    }
  }, [hotel]);

  const handleAddHotel = (hotel) => {
    // TODO: Add rest of logic here to add to itinerary
    console.log("Hotel added by add button:", hotel);
  };

  return (
    <div className="w-80 h-70 shadow">
      <div className="relative p-2 flex flex-col h-full">
        {/* <div className="flex justify-between mt-2">
          <ul className="font-semibold">{hotel?.hotel?.name}</ul>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-lg font-bold">${hotel.offers[0].price.base}</p>
        </div> */}

        <div className="p-2">
          <div className="flex justify-between ">
            <ul className="font-semibold">{hotel?.hotel?.name}</ul>
          </div>
          {/* <img
            className="w-full h-30"
            src="https://cache.marriott.com/is/image/marriotts7prod/br-seasm-exterior-signage-84882:Wide-Hor?wid=375&fit=constrain"
            alt=""
          /> */}
          {image && (
            <img
              src={image.link}
              alt={hotel.hotel.name}
              className="w-full h-30"
            />
          )}
          <div className="flex justify-between mt-2">
            <p className="text-lg font-bold">${hotel.offers[0].price.base}</p>
          </div>

          <Link
            to={`/hotels/${hotel.hotel.hotelId}`}
            state={{ hotel }}
            className="text-blue-500 underline mt-2 block"
          >
            View Details
          </Link>
          {/* <button
            className="absolute bottom-4 right-4 bg-black text-white p-2 rounded-full"
            onClick={() => handleAddHotel(hotel)}
          >
            Add
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Hotel;
