import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Retrieve auth state from Redux store
  const { user, loaded } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // If the authentication state is loaded and no user is authenticated,
    // redirect to the login page.
    if (loaded && !user.email) {
      navigate("/login", { replace: true });
    }
  }, [loaded, user, navigate]);

  // Only render the protected content if the user is authenticated.
  // Optionally, you could return a loading indicator while authentication state is being determined.
  console.log("loaded state", loaded);
  console.log("user", user);
  console.log("user email", user.email);
  
  return loaded && user.email ? children : null;
};

export default ProtectedRoute;