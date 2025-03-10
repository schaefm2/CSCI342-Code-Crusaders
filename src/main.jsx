import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

import HomePage from "./pages/HomePage.jsx";
import HotelsPage from "./pages/HotelsPage.jsx";
import FlightsPage from "./pages/FlightsPage.jsx";
import RentalsPage from "./pages/RentalsPage.jsx";
import TripsPage from "./pages/TripsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import LoginForm from "./components/Forms/LoginForm.jsx";
import SignupForm from "./components/Forms/SignupForm.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<HomePage />} />
            <Route path="hotels" element={<HotelsPage />} />
            <Route path="flights" element={<FlightsPage />} />
            <Route path="rentals" element={<RentalsPage />} />
            <Route path="trips" element={<TripsPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
