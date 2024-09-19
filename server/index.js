import express, { urlencoded } from "express";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./constants.js";
const app = express();

connectDB();

// const allowedOrigins = [
//   process.env.FRONTEND_URL,
//   "http://localhost:5173",
//   "https://notes-tube-frontend.onrender.com",
// ];

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    sameSite: "none",
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log("Frontend URL: ", process.env.FRONTEND_URL);
});
