import {Joi} from "express-validation"
import {validNumber, validString} from "../../helpers/utilValidation"

export const ValidarInsercion={
    body : Joi.object({
        table  : Joi.object({
            name        : validString("Nombre"),
            description : validString("Descripcion"),
            code        : validString("Codigo"),
            company_id  : validNumber("Compañia ID")
        }),
        fields : Joi.array().items({
            name        : validString("Nombre"),
            description : validString("Descripcion"),
            code        : validString("Codigo")
        })
    })
}