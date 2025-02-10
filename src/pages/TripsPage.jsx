import React from "react";
import Search from "../components/Search";

const TripsPage = () => {
  return (
    <div>
      <form className="">
        <label>
          Location
          <Search />
        </label>
        <label>
          Description
          <input placeholder="Input your activity here" />
        </label>
      </form>
    </div>
  );
};

export default TripsPage;
