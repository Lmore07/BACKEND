import {Joi} from "express-validation"
import {validBoolean, validNumber, validString} from "../../helpers/utilValidation"

export const ValidarInsercion={
    body : Joi.object({
        table  : Joi.object({
            name        : validString(),
            description : validString(),
            code        : validString(),
            company_id  : validNumber()
        }),
        fields : Joi.array().items({
            name        : validString(),
            description : validString(),
            code        : validString()
        })
    })
}

export const ValidarPermisos = {
    body:Joi.object({
        table    : validString(),
        permisos : Joi.object({
            select : validBoolean(),
            insert : validBoolean(),
            update : validBoolean(),
            delete : validBoolean()
        }),
        user : validString()
    })
}

export const ValidarUpdateTabla = {
    body:Joi.object({
        table    : validString(),
        columnas : Joi.object({
            tipo : validString(),
            nombre : validString()
        })
    })
}
