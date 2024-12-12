import { Request, Response } from "express";
import Event from "../models/event.model";


export const createEvent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, description, date, location, organizer } = req.body;

    const existingEvent = await Event.findOne({ title });
    if (existingEvent) {
      return res.status(400).json({ error: "Event title must be unique." });
    }

    const event = new Event({
      title,
      description,
      date,
      location,
      organizer,
    });

    await event.save();

    return res.status(201).json({ message: "Event created successfully", event });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};


export const getAllEvents = async (_: Request, res: Response): Promise<Response> => {
  try {
    const events = await Event.find().populate("participants" , "-password");
    return res.status(200).json(events);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};


export const getEventByTitle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { title } = req.params;
  
    
      const event = await Event.findOne({ title }).populate("participants" , "-password");
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
  
      return res.status(200).json(event);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return res.status(500).json({ error: err.message });
      } else {
        return res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };
  


export const getEventsByOrganizer = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { organizer } = req.params;

      const events = await Event.find({ organizer }).populate("participants" , "-password");
      if (!events.length) {
        return res.status(404).json({ error: "No events found for this organizer" });
      }
  
      return res.status(200).json(events);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return res.status(500).json({ error: err.message });
      } else {
        return res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };
  
