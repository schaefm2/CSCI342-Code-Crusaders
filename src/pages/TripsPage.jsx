import React from "react";
import Search from "../components/Search/Search.jsx";
import { ColorThemeProvider, colorTheme } from '../components/ColorTheme/ColorTheme.jsx';


const TripsPage = () => {
  return (
    <ColorThemeProvider>
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
    </ColorThemeProvider>
  );
};

export default TripsPage;
