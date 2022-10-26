import { Joi } from "express-validation";

export const validString=()=>Joi.string()
.required()

export const validNumber=()=>Joi.number()
.required()

export const validBoolean=()=>Joi.boolean()
.required()


