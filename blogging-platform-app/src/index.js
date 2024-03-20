require("dotenv").config({ path: "src/.env" });
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Import user authentication routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/users", authRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});