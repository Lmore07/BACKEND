import { Joi } from "express-validation";

/**
 * It returns a Joi string object that is required.
 */
export const validString=()=>Joi.string()
.required()
.min(4)
.max(25)

/**
 * It returns a Joi number object that is required.
 */
export const validNumber=()=>Joi.number()
.required()
.min(1)
