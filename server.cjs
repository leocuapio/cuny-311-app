// server.cjs - Express backend for CUNY 311 App
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, "data", "requests.json");

// Ensure data directory exists
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize data file with sample data if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  const initialData = [
    {
      id: 1,
      title: "Water leak in North Building – 5th floor hallway",
      campus: "Hunter College",
      category: "Facilities",
      status: "OPEN",
      submitted: "2 hours ago",
    },
    {
      id: 2,
      title: "Broken elevator in Library Building",
      campus: "City College",
      category: "Accessibility",
      status: "RESOLVED",
      submitted: "Resolved yesterday",
    },
    {
      id: 3,
      title: "Slow WiFi in student lounge",
      campus: "Baruch College",
      category: "IT / WiFi",
      status: "IN_PROGRESS",
      submitted: "Submitted 1 day ago",
    },
    {
      id: 4,
      title: "Outdoor lighting not working near main entrance",
      campus: "Brooklyn College",
      category: "Security",
      status: "OPEN",
      submitted: "Submitted 3 days ago",
    },
  ];
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read requests from file
function readRequests() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading requests:", error);
    return [];
  }
}

// Helper function to write requests to file
function writeRequests(requests) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(requests, null, 2));
  } catch (error) {
    console.error("Error writing requests:", error);
    throw error;
  }
}

// GET /api/requests - Get all requests
app.get("/api/requests", (req, res) => {
  try {
    const requests = readRequests();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

// POST /api/requests - Create a new request
app.post("/api/requests", (req, res) => {
  try {
    const { campus, category, description } = req.body;

    if (!campus || !category || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const requests = readRequests();
    const newRequest = {
      id: requests.length > 0 ? Math.max(...requests.map((r) => r.id)) + 1 : 1,
      title: description.trim().slice(0, 80) || "New service request",
      campus,
      category,
      status: "OPEN",
      submitted: "Just now",
    };

    requests.unshift(newRequest); // Add to beginning
    writeRequests(requests);

    res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ error: "Failed to create request" });
  }
});

// PATCH /api/requests/:id - Update request status
app.patch("/api/requests/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["OPEN", "IN_PROGRESS", "RESOLVED"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const requests = readRequests();
    const requestIndex = requests.findIndex((r) => r.id === parseInt(id));

    if (requestIndex === -1) {
      return res.status(404).json({ error: "Request not found" });
    }

    requests[requestIndex].status = status;
    writeRequests(requests);

    res.json(requests[requestIndex]);
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({ error: "Failed to update request" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CUNY 311 Backend Server running on http://localhost:${PORT}`);
  console.log(`📁 Data stored in: ${DATA_FILE}`);
});

