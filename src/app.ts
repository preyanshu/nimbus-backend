import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/database";
import studentRoutes from "./routes/students";
import eventRoutes from "./routes/events";
import RegistrationRoute from "./routes/registration";
import coreTeamRoutes from "./routes/coreTeam";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/register", RegistrationRoute);
app.use("/api/coreTeam", coreTeamRoutes);

//health check route
app.get("/", (_req, res) => {
  res.send("API is running...");
});

export default app;
