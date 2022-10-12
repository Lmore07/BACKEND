"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidarIngreso = void 0;
const express_validation_1 = require("express-validation");
const utilValidation_1 = require("./utilValidation");
exports.ValidarIngreso = {
    body: express_validation_1.Joi.array().items({
        id: (0, utilValidation_1.validNumber)("id"),
        nombre: (0, utilValidation_1.validString)("")
    })
};
