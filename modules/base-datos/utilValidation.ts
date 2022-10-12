import { Joi } from "express-validation";

export const validString=(propiedad:string)=>Joi.string()
.required()
.min(5)
.messages({
    'any.required':propiedad + "es requerida",
    'string.min': propiedad+"debe ser mayor a 5 caracteres"
})

export const validNumber=(propiedad:string)=>Joi.string()
.required()
.messages({
    'any.required':propiedad + "es requerida"
})