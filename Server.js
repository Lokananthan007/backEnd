// Server.js
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const Database = require('./database');
const User = require('./stuModel');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: false }));
app.use(cors());

// Connect to the database
Database.connect();

app.get("/", async (req, res) => {
  console.log("connected");
  res.status(201).json({ message: "connected" });
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while fetching data" });
  }
});

app.post("/users", async (req, res) => {
  const { name, class: className, place, phoneNumber, photo } = req.body;

  const newUser = new User({
    name,
    class: className,
    place,
    phoneNumber,
    photo
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: "Data inserted successfully", user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred while inserting data" });
  }
});

const PORT = 2233;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
