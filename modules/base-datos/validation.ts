import {Joi} from "express-validation"
import {validNumber, validString} from "./utilValidation"

export const ValidarIngreso={
    body:Joi.object({
        id:validNumber(),
        nombre:validString()
    })
}