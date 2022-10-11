import {Joi} from "express-validation"
import {validString} from "./utilValidation"

export const ValidarIngreso={
    body:Joi.object().keys({
        nombre:validString("nombre")
    })
}