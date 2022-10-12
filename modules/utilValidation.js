"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validBoolean = exports.validNumber = exports.validString = void 0;
const express_validation_1 = require("express-validation");
const validString = () => express_validation_1.Joi.string()
    .required();
exports.validString = validString;
const validNumber = () => express_validation_1.Joi.number()
    .required();
exports.validNumber = validNumber;
const validBoolean = () => express_validation_1.Joi.boolean()
    .required();
exports.validBoolean = validBoolean;
