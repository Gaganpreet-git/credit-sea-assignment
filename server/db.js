const mongoose = require("mongoose");
const config = require("./config/config");

mongoose
  .connect(config.dbUri)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));
