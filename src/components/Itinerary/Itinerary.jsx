import React, { useState } from 'react';

// Placeholder data to simulate what a possible itenerary would look like
const placeholderItinerary = {
  tripName: 'My Vacation Trip to New York',
  flights: [
    { 
        airline: 'Alaska', 
        from: 'Los Angeles', 
        to: 'New York', 
        date: '2025-03-10', 
        takeoffTime: '5:00 PM', 
        flightNumber: "123", 
        price: '399.99', 
        currencyType: 'USD', 
        Seats: ['17A', '17B', '17C'] },
  ],
  hotels: [
    { 
        name: 'Hotel New York', 
        location: 'New York', 
        checkInDate: '2025-03-01', 
        checkOutDate: '2025-03-07', 
        price: '299.99', 
        currencyType: 'USD' },
  ],
  activities: [
    { 
        name: 'Go on a Downtown Central Park Tour', 
        location: 'Central Park', 
        date: '2025-03-08', 
        time: '3:00 PM', 
        price: '39.99', 
        currencyType: 'USD' },
  ],
  restaurants: [
    { 
        name: 'Sushi Paradise', 
        location: 'New York', 
        date: '2025-03-09', 
        time: '6:00 PM', 
        price: '29.99', 
        currencyType: 'USD' },
  ],
};

// TODO: Currently the setters copy over the existing array to a new array for mutability sake.
//       This is ineffecient so alternative could be using a library called immer if needed, but lists shouldnt get too long?

const Itinerary = () => {
  // States to hold itinerary data (for future data which will be fetched from an API)
  const [itinerary, setItinerary] = useState(placeholderItinerary);

  // Getters are below which return an item from the associated index in a string form.
  // The string is seperated by commas so that it can be parsed for front-end display
  const getFlightDetails = (index) => {
    const flight = itinerary.flights[index];
    return `${flight.airline}, ${flight.from}, ${flight.to}, ${flight.date}, ${flight.takeoffTime}, ${flight.flightNumber}, ${flight.price} ${flight.currencyType}`;
  };

  const getHotelDetails = (index) => {
    const hotel = itinerary.hotels[index];
    return `${hotel.name}, ${hotel.location}, ${hotel.checkInDate}, ${hotel.checkOutDate}, ${hotel.price} ${hotel.currencyType}`;
  };

  const getActivityDetails = (index) => {
    const activity = itinerary.activities[index];
    return `${activity.name}, ${activity.location}, ${activity.date}, ${activity.time}, ${activity.price} ${activity.currencyType}`;
  };

  const getRestaurantDetails = (index) => {
    const restaurant = itinerary.restaurants[index];
    return `${restaurant.name}, ${restaurant.location}, ${restaurant.date}, ${restaurant.time}, ${restaurant.price} ${restaurant.currencyType}`;
  };


  // Below are setters where when used it appends a new item to the end of the associated array, 
  // i.e. setNewRestaurant adds a new restaurant to itinerary restaurants array
  const setNewFlight = (airline, from, to, date, takeoffTime, flightNumber, price, currencyType, seats) => {
    const newFlight = {
      airline,
      from,
      to,
      date,
      takeoffTime,
      flightNumber,
      price,
      currencyType,
      Seats: seats,
    };
    setItinerary({ ...itinerary, flights: [...itinerary.flights, newFlight] });
  };

  const setNewHotel = (name, location, checkInDate, checkOutDate, price, currencyType) => {
    const newHotel = { 
        name, 
        location, 
        checkInDate, 
        checkOutDate, 
        price, 
        currencyType 
    };
    setItinerary({ ...itinerary, hotels: [...itinerary.hotels, newHotel] });
  };

  const setNewActivity = (name, location, date, time, price, currencyType) => {
    const newActivity = { 
        name, 
        location, 
        date, 
        time, 
        price, 
        currencyType 
    };
    setItinerary({ ...itinerary, activities: [...itinerary.activities, newActivity] });
  };

  const setNewRestaurant = (name, location, date, time, price, currencyType) => {
    const newRestaurant = { 
        name, 
        location, 
        date, 
        time, 
        price, 
        currencyType 
    };
    setItinerary({ ...itinerary, restaurants: [...itinerary.restaurants, newRestaurant] });
  };

}