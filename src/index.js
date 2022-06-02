require("dotenv").config();
require("./models/user");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (error) => {
  console.log("Error connected to mongo", error);
});

app.get("/", (req, res) => {
  res.send("Hi there !!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
