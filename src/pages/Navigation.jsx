import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/hotels">Hotels</NavLink>
        </li>
        <li>
          <NavLink to="/flights">Flights</NavLink>
        </li>
        <li>
          <NavLink to="/rentals">Rentals</NavLink>
        </li>
        <li>
          <NavLink to="/trips">Trips</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
