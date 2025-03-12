import flightSearch from "../components/FlightData/FlightData";

import { useAccessToken } from "../AccessTokenContext/AccessTokenContext.jsx";

const FlightResults = () => {
  const { accessToken, loading } = useAccessToken();

  const [originState, setOrigin] = useState("JFK");
  const [destinationState, setDestination] = useState("LAX");
  const [departureDateState, setDepartureDate] = useState("2025-05-01");
  const [returnDateState, setReturnDate] = useState("2025-05-10");
  const [adultsState, setAdults] = useState("2");
  const [maxPriceState, setMaxPrice] = useState("499");
  const [currencyCodeState, setCurrencyCode] = useState("USD");

  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (loading) {
      console.log("Loading token...");
      return; // Avoid calling flightSearch until the token is available
    }

    if (!accessToken) {
      console.log("Access token not available.");
      return; // Ensure that the access token is available
    }

    // Check if all states are set
    if (originState && destinationState && departureDateState && returnDateState &&
      adultsState && maxPriceState && currencyCodeState) {

      console.log("State values before calling flightSearch:");
      console.log("Origin:", originState);
      console.log("Destination:", destinationState);
      console.log("Departure Date:", departureDateState);
      console.log("Return Date:", returnDateState);
      console.log("Adults:", adultsState);
      console.log("Max Price:", maxPriceState);
      console.log("Currency Code:", currencyCodeState);

      // Call flightSearch function with necessary parameters
      flightSearch({
        accessToken,
        originLocationCode: "JFK",
        destinationLocationCode: destinationState,
        departureDate: departureDateState,
        returnDate: returnDateState,
        adults: Number(adultsState),
        maxPrice: Number(maxPriceState),
        currencyCode: currencyCodeState,
        setFlights,
        setError,
      });
    } else {
      console.log("Some state values are missing.");
    }
  };

  const logFlightData = (flights) => {
    console.log(`Flight object length: ${flights.length}`);
    for (let i = 0; i < flights.length; i++) {
      const flight = flights[i];
      // Log relevant flight information to the console
      console.log(`Flight ${i + 1}:`);
      console.log(
        `Departure: ${flight.itineraries[0].segments[0].departure.iataCode}`
      );
      console.log(
        `Arrival: ${flight.itineraries[0].segments[0].arrival.iataCode}`
      );
      console.log(`Price: ${flight.price.total} ${flight.price.currency}`);
      console.log("////////////////////////////////////");
    }
  };

  return (
    <div>
      <ul>THIS IS THIS FLIGHTS PAGE</ul>

      <button
        onClick={handleSearch}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50", // Green background
          color: "white", // White text color
          border: "none", // No border
          borderRadius: "4px", // Rounded corners
          cursor: "pointer", // Pointer cursor on hover
          fontSize: "16px", // Font size
        }}
      >
        Search
      </button>

      {/* Below is used for debugging to make sure flights is correctly set from FlightData.jsx */}
      {/* <button onClick={logFlightData(flights)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50', // Green background
          color: 'white', // White text color
          border: 'none', // No border
          borderRadius: '4px', // Rounded corners
          cursor: 'pointer', // Pointer cursor on hover
          fontSize: '16px', // Font size
        }}>
        Check Flights Object
      </button> */}
    </div>
  );
};
