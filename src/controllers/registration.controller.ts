import { Request, Response } from "express";
import Event from "../models/event.model";
import Student from "../models/student.model";


export const registerForEvent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { eventTitle } = req.body; 
    const studentId = (req as any).user.id;  


    console.log(eventTitle);
    const event = await Event.findOne({ title: eventTitle });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

 
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

   
    const isAlreadyRegistered = event.participants.some(
      (participant: any) => participant.toString() === (student._id as any).toString()
    );
    console.log(isAlreadyRegistered);
    if (isAlreadyRegistered) {
      return res.status(400).json({ error: "Student is already registered for this event" });
    }

  
    event.participants.push(student._id as any);

   
    await event.save();

    return res.status(200).json({ message: "Student successfully registered for the event", event });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
