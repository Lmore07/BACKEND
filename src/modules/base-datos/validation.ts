import {Joi} from "express-validation"
import {validNumber, validString} from "../../helpers/utilValidation"

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