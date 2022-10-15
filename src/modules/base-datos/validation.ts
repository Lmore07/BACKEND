import {Joi} from "express-validation"
import {validBoolean, validNumber, validString} from "../../helpers/utilValidation"

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
            notNull:validString(),
            length:validNumber(),
            primaryKey:validBoolean()
        })
    })
}