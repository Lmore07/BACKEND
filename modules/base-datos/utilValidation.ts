import { Joi } from "express-validation";

export const validString=(propiedad:string)=>Joi.string()
.required()
.regex(/^[a-zA-Z]+$/)
.min(10)
.messages({
    'any.required':propiedad + "es requerida",
    'string.min': propiedad+"debe ser mayor a 5 caracteres"
})