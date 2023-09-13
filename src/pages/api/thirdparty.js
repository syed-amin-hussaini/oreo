const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

// Use middleware to parse JSON requests
app.use(bodyParser.json());

// Configure CORS to allow requests from your Next.js app's domain
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your Next.js app's domain
  methods: "POST", // Specify the allowed HTTP methods
};
app.use(cors(corsOptions));

// Create an endpoint to receive data
app.post("/api/thirdparty", (req, res) => {
  try {
    const requestData = req.body;

    // Process the requestData as needed
    console.log("Received data:", requestData);

    // Respond with a success message
    res.status(200).json(
      {
        status: "success",
        
      }
    );
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3001, () => {
  console.log("Third-party API server is running on port 3001");
});
