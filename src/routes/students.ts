import express from "express";
import { signUp, signIn, getAllStudents ,getStudentByEmail } from "../controllers/students.controller";
import { validateStudentSignUp, validateStudentSignIn } from "../middleware/studentValidation";

const router = express.Router();


router.post("/signup", validateStudentSignUp as any, signUp as any);
router.post("/signin", validateStudentSignIn as any, signIn as any);
router.get("/", getAllStudents as any);
router.get("/students/:email", getStudentByEmail as any);


export default router;
