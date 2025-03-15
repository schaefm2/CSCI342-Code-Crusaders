require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { late } = require("zod");

const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.MONGO_URL;

console.log(".env url: ", URL);

mongoose
  .connect(URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

//define user schema here
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profession: { type: String, required: true},
    phoneNumber: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
})

//TODO: other schemas

const flightSchema = new mongoose.Schema({
    departure: { type: String, required: true },
    departureDate: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrival: { type: String, required: true },
    arrivalDate: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
})

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    distance: { type: Number, required: true }, 
})

const tripSchema = new mongoose.Schema({
    email: { type: String, required: true }, //foreign key to user
    flights: [flightSchema],
    hotels: [hotelSchema],
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    tripName: { type: String, required: true },
})


//
const authenticateJWT = (req, res, next) => {
    /*const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "forbidden" });
        }
        req.user = user;
        next();
    });*/
    next();
} //COMMENTED OUT TO TEST WITHOUT AUTHENTICATION

app.use(cors());
app.use(bodyParser.json());

const User = mongoose.model("User", userSchema);
const Flight = mongoose.model("Flight", flightSchema);
const Hotel = mongoose.model("Hotel", hotelSchema);
const Trip = mongoose.model("Trip", tripSchema);

//stole this from from ass-8 do we want this password validation?
function validatePassword(password) {
  const minLength = 6;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return password.length >= minLength && hasLetter && hasNumber;
}

app.post("/api/signup", async (req, res) => {
    const {email, password, ...rest} = req.body;
  try {
    const user = await User.findOne({ email });

    //DEBUG LINE
    console.log("user after the findOne() called", user);

    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }

    //DEBUG LINE
    console.log("user does not exist validate password and create");

    if (!validatePassword(password)) {
      return res.status(400).json({
        message:
          "password must be at least 6 characters long and contain at least one letter and one number",
      });
    }

    console.log("users password was validated succesfully");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...rest,email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({
      message: "user created successfully",
      user: { ...newUser._doc, password: undefined },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "error during signup" });
  }
});

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "please fill all required fields" });
    }
  
    try {
      const user = await User.findOne({email});

      if (!user) {
        return res.status(401).json({ message: "user does not exist" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: "invalid credentials" });
      }
      const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "login successful", token, user });
    } catch (err) {
      return res.status(500).json({ message: "error finding user" });
    }
  });

app.post("/api/getuser", async (req,res)=>{

})

//create trip
app.post("/api/trip", authenticateJWT, async (req, res) => {
    const { email, flights, hotels, startDate, endDate, tripName } = req.body;
    try {
        const newTrip = new Trip({ email, flights, hotels, startDate, endDate, tripName });
        await newTrip.save();
        return res.status(201).json({ message: "trip created successfully", trip: newTrip });
    } catch (error) {
        return res.status(500).json({ message: "error creating trip" });
    }
}) // works

//get trip

app.post("/api/gettrips",authenticateJWT, async (req, res) => {
    const { email } = req.body;
    try {
        const trips = await Trip.find({ email });
        res.status(200).json({ trips });
    } catch (error) {
        return res.status(500).json({ message: "error getting trips" });
    }
}) // works

//add flight to trip
//currently adds a whole flight schema to the trip, could be just a foreign key?
app.post("/api/addflight", authenticateJWT, async (req, res) => {
    const { email, tripName, flight } = req.body;
    try {
        const newFlight = new Flight(flight);
        const updatedTrip = await Trip.findOneAndUpdate(
            { email, tripName },
            { $push: { flights: newFlight } },
            { new: true }
        );
        return res.status(200).json({ message: "flight added successfully", trip: updatedTrip});
    } catch (error) {
        return res.status(500).json({ message: "error adding flight" });      
    }
})
//delete flight from trip
app.post("/api/deleteflight", authenticateJWT, async (req, res) => {
    const {email, tripName, flight} = req.body;
    try {
        const updatedTrip = await Trip.findOneAndUpdate
        (
            { email, tripName },
            { $pull: { flights: flight } },
            { new: true }
        );
        return res.status(200).json({ message: "flight deleted successfully", trip: updatedTrip });
    } catch (error) {
        return res.status(500).json({ message: "error deleting flight" });
    }
})
//add hotel to trip
app.post("/api/addhotel",authenticateJWT, async (req, res) => {
    const {email, tripName, hotel} = req.body;
    try{
        const newHotel = new Hotel(hotel);
        const updatedTrip = await Trip.findOneAndUpdate(
            { email, tripName },
            { $push: { hotels: newHotel } },
            { new: true }
        );
        return res.status(200).json({ message: "hotel added successfully", trip: updatedTrip });
    }catch(error){
        return res.status(500).json({ message: "error adding hotel" });
    }
})
//delete hotel from trip
app.post("/api/deletehotel",authenticateJWT, async (req, res) => {
    const {email, tripName, hotel} = req.body;
    try{
        const updatedTrip = await Trip.findOneAndUpdate(
            { email, tripName },
            { $pull: { hotels: hotel } },
            { new: true }
        );
        return res.status(200).json({ message: "hotel deleted successfully", trip: updatedTrip });
    }catch(error){
        return res.status(500).json({ message: "error deleting hotel" });
    }
})

//create a new flight
app.post("/api/createflight",authenticateJWT, async (req, res) => {
    const {departure, departureDate, departureTime, arrival, arrivalDate, arrivalTime, price, currency} = req.body;
    try{
        const newFlight = new Flight({ departure, departureDate, departureTime, arrival, arrivalDate, arrivalTime, price, currency });
        await newFlight.save();
        return res.status(201).json({ message: "flight created successfully", flight: newFlight });
    }catch(error){
        return res.status(500).json({ message: "error creating flight" });
    }
})

//create a new hotel
app.post("/api/createhotel",authenticateJWT, async (req, res) => {
    const {name, city, latitude, longitude, distance} = req.body;
    try{
        const newHotel = new Hotel({ name, city, latitude, longitude, distance });
        await newHotel.save();
        return res.status(201).json({ message: "hotel created successfully", hotel: newHotel });
    }catch(error){
        return res.status(500).json({ message: "error creating hotel" });
    }
})

  
  app.get("/", (req, res) => {
    res.send("root path");
  });
  
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));