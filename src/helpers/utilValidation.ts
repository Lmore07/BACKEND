import { Joi } from "express-validation";

/**
 * It returns a Joi string object that is required.
 */
export const validString=()=>Joi.string()
.required()

/**
 * It returns a Joi number object that is required.
 */
export const validNumber=()=>Joi.number()
.required()

/**
 * It returns a Joi object that validates a boolean value.
 */
export const validBoolean=()=>Joi.boolean()
.required()


