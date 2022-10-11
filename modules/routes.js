"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routers_1 = __importDefault(require("./base-datos/routers"));
const applyRoutes = (app) => {
    console.log("entro a rutas");
    app.use("/api/base-datos", routers_1.default);
};
exports.default = applyRoutes;
