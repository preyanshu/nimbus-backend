import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventByTitle,
  getEventsByOrganizer,
} from "../controllers/event.controller";
import { validateCreateEvent } from "../middleware/eventValidation";

const router = Router();

router.post("/create", validateCreateEvent as any, createEvent as any);
router.get("/", getAllEvents as any);
router.get("/title/:title", getEventByTitle as any); 
router.get("/organizer/:organizer", getEventsByOrganizer as any); 

export default router;
