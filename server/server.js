require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.MONGO_URL;

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
    phone: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
})

//TODO: other schemas

app.use(cors());
app.use(bodyParser.json());

const User = mongoose.model("User", userSchema);

//stole this from from ass-8 do we want this password validation?
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return passwordRegex.test(password);
};

app.post("/api/signup", async (req, res) => {
    const {email, password, ...rest} = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({
        message:
          "password must be at least 6 characters long and contain at least one letter and one number",
      });
    }
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
  
  app.get("/", (req, res) => {
    res.send("root path");
  });
  
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));