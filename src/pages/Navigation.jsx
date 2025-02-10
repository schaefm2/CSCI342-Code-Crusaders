import React from "react";
import { Link, NavLink } from "react-router-dom";
import MaterialSymbolsTravelExplore from "../assets/material-symbols_travel-explore.svg";

const Navigation = () => {
  return (
    <nav className=" w-[1404px] h-[50px]">
      <div className="inline-flex items-center gap-10 absolute top-[18px] left-[545px] ">
        <div className="flex space-x-10">
          <NavLink to="/">Home</NavLink>
        </div>
        <div>
          <NavLink to="/hotels">Hotels</NavLink>
        </div>
        <div>
          <NavLink to="/flights">Flights</NavLink>
        </div>
        <div>
          <NavLink to="/rentals">Rentals</NavLink>
        </div>
        <div>
          <NavLink to="/trips">Trips</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
