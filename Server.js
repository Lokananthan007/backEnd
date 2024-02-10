const express = require("express");
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const Database = require('./database');
const User = require('./stuModel');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: false }));
app.use(cors());

Database.connect();

const storage = multer.memoryStorage(); // Save images in memory as Buffer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Adjust the file size limit as needed
});

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

app.post("/users", upload.single('photo'), async (req, res) => {
  const { name, class: className, place, phoneNumber } = req.body;

  const photo = req.file;

  const newUser = new User({
    name,
    class: className,
    place,
    phoneNumber,
    photo: photo.buffer, 
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
