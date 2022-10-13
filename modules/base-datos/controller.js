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
exports.creaTablaColumnas = exports.obtenerTablas = void 0;
const conexion_1 = __importDefault(require("../../models/conexion"));
const obtenerTablas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var respuesta = [];
    var tablas = yield conexion_1.default.query("select distinct(table_name) " +
        "from information_schema.columns where table_schema='public' " +
        "order by table_name;");
    for (let index = 0; index < tablas.rows.length; index++) {
        var columnas = yield conexion_1.default.query("select column_name,data_type, is_nullable " +
            "from information_schema.columns where table_schema='public' and table_name='" + tablas.rows[index].table_name + "' " +
            "order by table_name;");
        respuesta.push({ table: tablas.rows[index].table_name, columnas: columnas.rows });
    }
    return respuesta;
});
exports.obtenerTablas = obtenerTablas;
const creaTablaColumnas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var columnas = "";
        var primaryKey = "";
        /*for(var i=0;i<req.body.columnas.length;i++){
            columnas+=req.body.columnas[i].nombre +" "+req.body.columnas[i].tipo+" ";
            if(req.body.columnas[i].primaryKey)
                primaryKey+=req.body.columnas[i].nombre+",";
            if(req.body.columnas[i].length>0)
                columnas+="("+req.body.columnas[i].length+") "
            if(req.body.columnas[i].notNull)
                columnas+="NOT NULL, "
            else if(req.body.columnas[i].notNull==false)
                columnas+="NULL, "
        }*/
        req.body.columnas.forEach((columna) => {
            columnas += columna.nombre + " " + columna.tipo + " ";
            if (columna.primaryKey)
                primaryKey += columna.nombre + ",";
            if (columna.length > 0)
                columnas += "(" + columna.length + ") ";
            if (columna.notNull)
                columnas += "NOT NULL, ";
            else if (columna.notNull == false)
                columnas += "NULL, ";
        });
        if (primaryKey.endsWith(',')) {
            primaryKey = primaryKey.substring(0, primaryKey.length - 1);
        }
        yield conexion_1.default.query("CREATE TABLE " + req.body.table + "(" + columnas + " PRIMARY KEY (" + primaryKey + "))");
        return { estado: "success" };
    }
    catch (error) {
        console.log(error);
        return { error: error };
    }
});
exports.creaTablaColumnas = creaTablaColumnas;
