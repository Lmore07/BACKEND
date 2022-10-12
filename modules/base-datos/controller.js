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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inserta_fila = exports.obtener_tablas = void 0;
const conexion_1 = __importDefault(require("../../models/conexion"));
const obtener_tablas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var datos = yield conexion_1.default.query("select tablename from pg_catalog.pg_tables where schemaname='public';");
    return datos;
});
exports.obtener_tablas = obtener_tablas;
const inserta_fila = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var datos = yield conexion_1.default.query("INSERT INTO prueba (id,nombre) VALUES (" + req.body.id + ",'" + req.body.nombre + "');");
    if (datos.rowCount == 0)
        return { estado: "failed" };
    return { estado: "success" };
});
exports.inserta_fila = inserta_fila;
