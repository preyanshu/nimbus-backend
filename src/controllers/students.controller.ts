import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/student.model";

export const signUp = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password, place, accommodationDays } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: "Student already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student
    const student = new Student({
      name,
      email,
      password: hashedPassword,
      place,
      accommodationDays,
    });

    await student.save();

    // Generate a JWT token
    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET || "your_secret_key"
    );

    return res.status(201).json({ message: "Student created successfully", token });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const signIn = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET || "your_secret_key"
    );

    return res.status(200).json({ message: "Sign-in successful", token });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const getAllStudents = async (_: Request, res: Response): Promise<Response> => {
  try {
    const students = await Student.find().select("-password");
    return res.status(200).json(students);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const getStudentByEmail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.params;

    const student = await Student.findOne({ email }).select("-password");
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    return res.status(200).json(student);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
