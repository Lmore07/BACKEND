"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validation_1 = require("express-validation");
const controller_1 = require("./controller");
const validation_1 = require("./validation");
const router = (0, express_1.Router)();
router.post("/inserta", (0, express_validation_1.validate)(validation_1.ValidarIngreso, {}, {}), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var dato = (0, controller_1.insertaFila)(req, res);
    res.json((yield dato));
    return next();
}));
router.get("/mostrar", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let datos = (0, controller_1.obtenerTablas)(req, res);
    res.json((yield datos).rows);
    return next();
}));
router.post("/insertar-tabla-columnas", (0, express_validation_1.validate)(validation_1.ValidarInsercion, {}, {}), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let datos = (0, controller_1.creaTablaColumnas)(req, res);
    res.json((yield datos));
    return next();
}));
exports.default = router;
