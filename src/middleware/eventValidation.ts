
import { Request, Response, NextFunction } from "express";
import Joi from "joi";


export const validateCreateEvent = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Title is required.",
      "any.required": "Title is required.",
    }),
    description: Joi.string().required().messages({
      "string.empty": "Description is required.",
      "any.required": "Description is required.",
    }),
    date: Joi.date().required().messages({
      "date.base": "Date must be a valid date.",
      "any.required": "Date is required.",
    }),
    location: Joi.string().required().messages({
      "string.empty": "Location is required.",
      "any.required": "Location is required.",
    }),
    organizer: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({ error : errors });
  }

  next();
};
