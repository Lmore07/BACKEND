import { Joi } from "express-validation";

export const validString=()=>Joi.string()
.required()
.min(5)

export const validNumber=()=>Joi.number()
.required()