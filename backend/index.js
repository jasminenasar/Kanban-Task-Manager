const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// ✅ CREATE APP FIRST
const app = express();

// ✅ CORS CONFIG (MUST BE AFTER app IS CREATED)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://task-friend.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ JSON MIDDLEWARE
app.use(express.json());

// ✅ CONNECT DATABASE
connectDB();

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Kanban Backend API is running");
});

// ✅ ROUTES
app.use("/api/auth", require("./routes/routes"));
app.use("/api/tasks", require("./routes/taskroutes"));

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
