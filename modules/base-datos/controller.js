"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtener_tablas = void 0;
const obtener_tablas = (req, res) => {
    console.log("controlador");
    res.json({
        msg: "aqui van las tablas"
    });
};
exports.obtener_tablas = obtener_tablas;
