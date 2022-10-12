import {Joi} from "express-validation"
import {validNumber, validString} from "./utilValidation"

export const ValidarIngreso={
    body:Joi.object().keys({
        id:validNumber("id"),
        nombre:validString("")
    })
}