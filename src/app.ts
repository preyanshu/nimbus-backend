import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/database";
import studentRoutes from "./routes/students";
import eventRoutes from "./routes/events";
import RegistrationRoute from "./routes/registration";
import coreTeamRoutes from "./routes/coreTeam";
import rateLimit from "express-rate-limit";

dotenv.config();
connectDB();

const app = express();


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});


app.use(limiter);

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/register", RegistrationRoute);
app.use("/api/coreTeam", coreTeamRoutes);


app.get("/", (_req, res) => {
  res.send("API is running...");
});

export default app;
