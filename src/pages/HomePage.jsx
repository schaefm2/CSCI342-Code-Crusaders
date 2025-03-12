import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Reviews from "../components/Reviews/Reviews";

const HomePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle button click
  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to the /signup route
  };

  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <div className="bg-blue-50 p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-black">Welcome to Crusader Travels</h1>
        <p className="mt-4 text-lg text-black">
          Explore our easy-to-use features and in-depth trip planning tools!
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Hotel Searching</h2>
          <p className="mt-2 text-gray-600">
            Find hotels that suit your budget and needs.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Flight Searching</h2>
          <p className="mt-2 text-gray-600">
            Find flights within any timeframe and budget.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Itinerary</h2>
          <p className="mt-2 text-gray-600">
            Add your flights, hotels, and more to your customizable itinerary.
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      

      {/* Call to Action Section */}
      <div className="bg-blue-200 p-8 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold text-black">Ready to Get Started?</h2>
        <p className="mt-4 text-lg text-black">
          Join us today and experience the best services we have to offer.
        </p>
        <button
          onClick={handleSignUpClick} // Add onClick handler
          className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
        >
          Sign Up Now
        </button>
      </div>
    </div>
  );
};

export default HomePage;