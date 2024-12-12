import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateStudentSignUp = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "Name is required.",
      "any.required": "Name is required.",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required.",
      "string.email": "Invalid email format.",
      "any.required": "Email is required.",
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 6 characters long.",
      "any.required": "Password is required.",
    }),
    place: Joi.string().optional(),
    accommodationDays: Joi.number().optional(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors });
  }

  next();
};


export const validateStudentSignIn = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required.",
      "string.email": "Invalid email format.",
      "any.required": "Email is required.",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required.",
      "any.required": "Password is required.",
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({ error:errors });
  }

  next();
};
