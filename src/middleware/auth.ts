import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  console.log(token);
  
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");

    (req as any).user = decoded;
 
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
  }
};

export default authenticateJWT;
