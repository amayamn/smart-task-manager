const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Home
app.get("/", (req, res) => {
    res.json({
        message: "Smart Task Manager Backend is running!"
    });
});

// Task routes
app.use("/api/tasks", taskRoutes);

// Authentication routes
app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});