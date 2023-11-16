const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

// Use cors middleware
app.use(cors());

// Serve static files (including images) from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Define a route to fetch and serve the image URL
app.get("/api/getImage", (req, res) => {
  // Construct the image URL to send back to the client
  const imageUrl = "/images/pic1.jpg"; // This path should be relative to the "public" directory

  res.json({ url: imageUrl });
});

// Serve an HTML file for the root path
app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
