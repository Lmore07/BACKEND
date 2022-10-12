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
router.post("/inserta-fila", (0, express_validation_1.validate)(validation_1.ValidarIngreso, {}, {}), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    var dato = (0, controller_1.inserta_fila)(req, res);
    console.log(dato);
    res.json({ datos: "datos" });
    return next();
}));
router.get("/mostrar", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let datos = (0, controller_1.obtener_tablas)(req, res);
    res.json({ datos: (yield datos).rows });
    return next();
}));
exports.default = router;
