import {Joi} from "express-validation"
import {validBoolean, validNumber, validString} from "./../utilValidation"

export const ValidarIngreso={
    body:Joi.object({
        id:validNumber(),
        nombre:validString()
    })
}

export const ValidarInsercion={
    body:Joi.object({
        table:validString(),
        columnas:Joi.array().items({
            tipo:validString(),
            nombre:validString(),
            notNull:validBoolean(),
            length:validNumber(),
            primaryKey:validBoolean()
        })
    })
}