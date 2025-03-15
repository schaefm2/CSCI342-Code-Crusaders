import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import ProtectedRoute from "./util/ProtectedRoute.jsx";

import HomePage from "./pages/HomePage.jsx";
import HotelsPage from "./pages/HotelsPage.jsx";
import FlightsPage from "./pages/FlightsPage.jsx";
import RentalsPage from "./pages/RentalsPage.jsx";
import TripsPage from "./pages/TripsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import LoginForm from "./components/Forms/LoginForm.jsx";
import SignupForm from "./components/Forms/SignupForm.jsx";
import AccountPage from "./components/Account/Account.jsx";
import HotelView from "./components/Hotel/HotelView.jsx";

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
            {/* Protected Routes still to be added */}
            <Route path="account" element={<AccountPage />} />

            <Route
              path="account"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />
            <Route path="hotels/:id" element={<HotelView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
