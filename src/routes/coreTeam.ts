import { Router } from "express";
import { addCoreTeamMembers, getAllCoreTeamMembers } from "../controllers/coreTeam.controller";

const router = Router();


router.post("/add", addCoreTeamMembers as any); // NOTE: when deployed, REMOVE this endpoint to avoid exposing sensitive operations for adding core team members.

router.get("/", getAllCoreTeamMembers as any);

export default router;
