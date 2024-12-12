import express from "express";
import { registerForEvent } from "../controllers/registration.controller";
import authenticateJWT from "../middleware/auth";

const router = express.Router();

router.post("/", authenticateJWT as any, registerForEvent as any);

export default router;
