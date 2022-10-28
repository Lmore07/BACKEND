import { Joi } from "express-validation";

/**
 * It returns a Joi string object that is required.
 */
export const validString=(propiedad:string)=>Joi.string()
.required()
.min(2)
.max(25)
.messages({
    "any.required":propiedad+" es requerida",
    "string.min":propiedad+" debe tener 2 caracteres como minimo",
    "string.max":propiedad+" debe tener 25 caracteres como máximo",
})

/**
 * It returns a Joi number object that is required.
 */
export const validNumber=(propiedad:string)=>Joi.number()
.required()
.min(1)
.messages({
    "any.required":propiedad+" es requerida",
    "number.min":propiedad+" debe tener 1 caracter como minimo",
})
