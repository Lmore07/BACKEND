import { Joi } from "express-validation";

/**
 * It returns a Joi string object that is required.
 */
export const validString=(propiedad:string)=>Joi.string()
.required()
.min(2)
.max(50)
.messages({
    "any.required":propiedad+" es requerida",
    "string.min":propiedad+" debe tener 2 caracteres como minimo",
    "string.max":propiedad+" debe tener 50 caracteres como máximo",
})