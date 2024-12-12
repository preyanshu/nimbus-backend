import { Request, Response } from "express";
import CoreTeamMember from "../models/coreTeam.model";


export const addCoreTeamMembers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const teamMembers = req.body;

    if (!Array.isArray(teamMembers) || teamMembers.length === 0) {
      return res.status(400).json({ error: "Please provide an array of core team members." });
    }

    const errors: string[] = [];
    const uniqueTeamMembers = [];

    for (const member of teamMembers) {
      const { name, position, photo } = member;

      if (!name || !position || !photo) {
        errors.push(`Missing fields in team member: ${name || "unknown name"} (${position || "unknown position"})`);
        continue;
      }

      const existingMember = await CoreTeamMember.findOne({ name, position });
      if (existingMember) {
        errors.push(`A team member with the name "${name}" and position "${position}" already exists.`);
        continue;
      }

      uniqueTeamMembers.push({ name, position, photo });
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }


    const addedMembers = await CoreTeamMember.insertMany(uniqueTeamMembers);

    return res.status(201).json({ message: `${addedMembers.length} team members added successfully`, addedMembers });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};


export const getAllCoreTeamMembers = async (_: Request, res: Response): Promise<Response> => {
  try {
    const teamMembers = await CoreTeamMember.find();

    if (teamMembers.length === 0) {
      return res.status(404).json({ message: "No core team members found." });
    }

    return res.status(200).json(teamMembers);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
