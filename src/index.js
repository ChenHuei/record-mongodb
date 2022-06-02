require("dotenv").config();
require("./models/user");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const authMiddleware = require("./middlewares/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(authRoutes);

app.get("/", authMiddleware, (req, res) => {
  res.send(`Hi there !! ${req.user.email}`);
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
