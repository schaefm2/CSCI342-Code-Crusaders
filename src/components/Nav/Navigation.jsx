import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice"

import MaterialSymbolsTravelExplore from "../../assets/material-symbols_travel-explore.svg";

const textWrapper =
  "relative w-fit mt-[-1.00px] [font-family:'Montserrat-Medium',Helvetica] font-medium text-black text-base tracking-[0] leading-4 whitespace-nowrap";

const Navigation = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    console.log("Logged out");
    navigate("/");
    console.log("email", user.email);
  };
  return (
    <nav className="bg-blue-200 w-full h-[65px] fixed top-0 left-0 z-10">
      <div className="container h-full flex justify-between items-center">
        <div className="inline-flex items-center">
          <img
            src={MaterialSymbolsTravelExplore}
            className="w-[50px] h-[50px]"
            alt="Logo"
          />
          <div className="w-fit [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-2xl tracking-[0]">
            Crusader Travels
          </div>
        </div>
        <div className="flex justify-center items-center gap-10 px-30">
          <NavLink to="/">
            <div className={textWrapper}>Home</div>
          </NavLink>
          <NavLink to="/hotels">
            <div className={textWrapper}>Hotels</div>
          </NavLink>
          <NavLink to="/flights">
            <div className={textWrapper}>Flights</div>
          </NavLink>
          <NavLink to="/trips">
            <div className={textWrapper}>Trips</div>
          </NavLink>
        </div>
        {user.email ? (
          <div className="inline-flex items-center gap-2">
            {/* note will conditionally render this later*/}
            <NavLink to="/account">
              <button className="bg-black text-white px-4 py-2 rounded">
                Account
              </button>
            </NavLink>
            <NavLink to="/">
              <button className="bg-black text-white px-4 py-2 rounded" onClick={logoutHandler}>
                Logout
              </button>
            </NavLink>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2">
            {/* note will conditionally render this later*/}
            <NavLink to="/login">
              <button className="bg-black text-white px-4 py-2 rounded">
                Log In
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
