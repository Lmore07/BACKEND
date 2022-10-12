"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidarInsercion = exports.ValidarIngreso = void 0;
const express_validation_1 = require("express-validation");
const utilValidation_1 = require("./../utilValidation");
exports.ValidarIngreso = {
    body: express_validation_1.Joi.object({
        id: (0, utilValidation_1.validNumber)(),
        nombre: (0, utilValidation_1.validString)()
    })
};
exports.ValidarInsercion = {
    body: express_validation_1.Joi.object({
        table: (0, utilValidation_1.validString)(),
        columnas: express_validation_1.Joi.array().items({
            tipo: (0, utilValidation_1.validString)(),
            nombre: (0, utilValidation_1.validString)(),
            notNull: (0, utilValidation_1.validBoolean)(),
            length: (0, utilValidation_1.validNumber)(),
            primaryKey: (0, utilValidation_1.validBoolean)()
        })
    })
};
