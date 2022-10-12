"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validNumber = exports.validString = void 0;
const express_validation_1 = require("express-validation");
const validString = (propiedad) => express_validation_1.Joi.string()
    .required()
    .min(5)
    .messages({
    'any.required': propiedad + "es requerida",
    'string.min': propiedad + "debe ser mayor a 5 caracteres"
});
exports.validString = validString;
const validNumber = (propiedad) => express_validation_1.Joi.string()
    .required()
    .messages({
    'any.required': propiedad + "es requerida"
});
exports.validNumber = validNumber;
