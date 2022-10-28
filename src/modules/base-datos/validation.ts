import {Joi} from "express-validation"
import {validString} from "../../helpers/utilValidation"

export const ValidarInsercion={
    body : Joi.object({
        table  : Joi.object({
            name        : validString("Nombre"),
            description : validString("Descripcion"),
            code        : validString("Codigo")
        }),
        fields : Joi.array().items({
            name        : validString("Nombre"),
            description : validString("Descripcion"),
            code        : validString("Codigo")
        })
    })
}