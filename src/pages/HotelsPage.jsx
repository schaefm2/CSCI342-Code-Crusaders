import React from "react";
import HotelList from "../components/HotelList/HotelList";
import Search from "../components/Search/Search";

const HotelsPage = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4">
        <Search
          className="rounded-full shadow p-2 mb-4"
          placeholder="Enter A City"
        />
        <div className="space-x-2">
          <button className="!bg-white text-black px-4 py-2 rounded !hover:bg-blue-700 !active:bg-blue-900">
            Price Ascending
          </button>
          <button className="!bg-white text-black px-4 py-2 rounded !hover:bg-blue-700 !active:bg-blue-900">
            Price Descending
          </button>
          <button className="!bg-white text-black px-4 py-2 rounded ">
            Rating
          </button>
        </div>
      </div>

      <HotelList />
    </div>
  );
};

export default HotelsPage;
