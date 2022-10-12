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
exports.creaTablaColumnas = exports.insertaFila = exports.obtenerTablas = void 0;
const conexion_1 = __importDefault(require("../../models/conexion"));
const obtenerTablas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var datos = yield conexion_1.default.query("select tablename from pg_catalog.pg_tables where schemaname='public'");
    return datos;
});
exports.obtenerTablas = obtenerTablas;
const insertaFila = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var datos = yield conexion_1.default.query("INSERT INTO prueba (id,nombre) VALUES (" + req.body.id + ",'" + req.body.nombre + "');");
    if (datos.rowCount == 0)
        return { estado: "failed" };
    return { estado: "success" };
});
exports.insertaFila = insertaFila;
const creaTablaColumnas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var columnas = "";
        var primaryKey = "";
        for (var i = 0; i < req.body.columnas.length; i++) {
            columnas += req.body.columnas[i].nombre + " " + req.body.columnas[i].tipo + " ";
            if (req.body.columnas[i].length > 0)
                columnas += "(" + req.body.columnas[i].length + ") ";
            if (req.body.columnas[i].notNull && i < req.body.columnas.length - 1)
                columnas += "NOT NULL, ";
            else if (req.body.columnas[i].notNull == false && i < req.body.columnas.length - 1)
                columnas += "NULL, ";
            else if (req.body.columnas[i].notNull)
                columnas += "NOT NULL ";
            else if (req.body.columnas[i].notNull == false)
                columnas += "NULL";
            if (req.body.columnas[i].primaryKey && i < req.body.columnas.length - 1)
                primaryKey += req.body.columnas[i].nombre + ",";
            else if (req.body.columnas[i].primaryKey)
                primaryKey += req.body.columnas[i].nombre + " ";
        }
        columnas += ", PRIMARY KEY (" + primaryKey + ")";
        var datos = yield conexion_1.default.query("CREATE TABLE " + req.body.table + "(" + columnas + ")");
        console.log(datos);
        //if(datos.rowCount==0)
        //return {estado:"failed"}
        return { estado: "success" };
    }
    catch (error) {
        return { error: error };
    }
});
exports.creaTablaColumnas = creaTablaColumnas;
