require("dotenv").config();
require("./models/user");
require("./models/track");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/user");
const trackRoutes = require("./routes/track");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(userRoutes);
app.use(trackRoutes);

app.get("/", (req, res) => {
  res.send("Hi there !!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (error) => {
  console.log("Error connected to mongo", error);
});
