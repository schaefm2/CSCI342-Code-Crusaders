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

const Itinerary = () => {
  // States to hold itinerary data (for future data which will be fetched from an API)
  const [itinerary, setItinerary] = useState(placeholderItinerary);


}