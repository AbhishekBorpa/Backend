import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "hello",
  });
});




// Connect DB and start server
const PORT = process.env.PORT || 3000;

connectDB();

app.use("/api/auth", userRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
