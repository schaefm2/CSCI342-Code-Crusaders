import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAccessToken } from "../AccessTokenContext/AccessTokenContext.jsx";

const HotelView = () => {
  const { id } = useParams();
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [hotelData, setHotelData] = useState(location.state?.hotel || {});

  useEffect(() => {
    if (location.state?.hotel) {
      setHotelData(location.state.hotel);
      console.log("Good state");
      console.log(location.state.hotel);
    }
  }, [location.state]);

  //   useEffect(() => {
  //     if (hotelData.hotel.name) {
  //       const fetchImages = async () => {
  //         try {
  //           const response = await fetch(
  //             `https://www.googleapis.com/customsearch/v1?q=${hotelData.hotel.name}&cx=3671b3f45ec244689&searchType=image&key=AIzaSyDr1PZL1FtszKOJWE8ju-oN7nbAQtNFyWs`
  //           );
  //           const data = await response.json();
  //           console.log(data);
  //           setImages(data.items);
  //         } catch (error) {
  //           console.error("Error fetching images:", error);
  //         }
  //       };

  //       fetchImages();
  //     }
  //   }, [location.state]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{hotelData.hotel.name}</h1>
      <p className="text-lg mb-2">
        <span className="font-semibold">Room Type:</span> {hotelData.roomType}
      </p>
      <p className="text-lg mb-2">
        <span className="font-semibold">Price:</span> {hotelData.price}
      </p>
      <p className="text-lg mb-4">
        <span className="font-semibold">Cancellation Policy:</span>{" "}
        {hotelData.cancellationPolicy}
      </p>
      <select className="mb-4 p-2 border rounded">
        <option value="standard">Standard Room</option>
        <option value="deluxe">Deluxe Room</option>
        <option value="suite">Suite</option>
      </select>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* {images.map((image) => (
          <img
            key={image.link}
            src={image.link}
            alt={image.title}
            className="w-full h-auto rounded shadow-md"
          />
        ))} */}
      </div>
    </div>
  );
};

export default HotelView;
