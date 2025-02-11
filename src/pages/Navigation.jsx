import React from "react";
import { Link, NavLink } from "react-router-dom";
import MaterialSymbolsTravelExplore from "../assets/material-symbols_travel-explore.svg";
import "./NavStyle.css";

const textWrapper =
  "relative w-fit mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-black text-base tracking-[0] leading-4 whitespace-nowrap";

const Navigation = () => {
  return (
    <nav className=" w-[1404px] h-[50px]">
      <div className="inline-flex items-center gap-10 absolute top-[18px] left-[498px]">
        <NavLink to="/">
          <div className={textWrapper}> Home</div>
        </NavLink>

        <NavLink to="/hotels">
          <div className={textWrapper}>Hotels</div>
        </NavLink>
        <NavLink to="/flights">
          <div className={textWrapper}>Flights</div>
        </NavLink>
        <NavLink to="/rentals">
          <div className={textWrapper}>Rentals</div>
        </NavLink>
        <NavLink to="/trips">
          <div className={textWrapper}>Trips</div>
        </NavLink>
      </div>
      <div className="inline-flex items-center gap-1.5 absolute top-0 left-0">
        <img
          src={MaterialSymbolsTravelExplore}
          className="!relative !w-[50px] !h-[50px]"
        />
        <div className="relative w-fit [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-2xl tracking-[0] leading-6 whitespace-nowrap">
          Crusader Travels
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
