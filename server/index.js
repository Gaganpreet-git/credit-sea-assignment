// Require the database connection (Ensure db.js sets up and exports the connection properly)
require("./db");

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const { creditProfileController } = require("./controllers");
const { errorHandlerMiddleware } = require("./middlewares");
const { ApiError } = require("./utils");

const port = 3001;

// Configure multer to store uploaded files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });


// Enable CORS for all routes
app.use(cors());

app.use(express.json()); // Middleware to parse JSON request bodies

// Route to get credit profile
app.get("/credit-profile", creditProfileController.getCreditProfile);

// Route to upload a credit profile with file upload support
app.post(
  "/credit-profile",
  upload.single("file"), // Middleware to handle single file upload with field name "file"
  creditProfileController.uploadCreditProfile
);

// Handle unknown API requests with a 404 error
app.use((req, res, next) => {
  next(new ApiError(404, "Not found"));
});

// Centralized error handling middleware
app.use(errorHandlerMiddleware);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
