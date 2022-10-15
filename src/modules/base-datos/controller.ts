import { Request,Response } from "express"
import pool from "../../connections/conexion";
import { Columna, Tabla } from "../../interfaces/bdTablasColumnas.interface";
import BaseDatosComponent from "./component";

const bdTablasColumnas = new BaseDatosComponent();

export default class BaseDatosController{

    obtenerTablasColumnas=async () => {
        return bdTablasColumnas.obtenerTablas();
    }
    
    creaTablaColumnas = async (req:Request) => {
        var tabla:Tabla = req.body;
        return bdTablasColumnas.insertarTablasColumnas(tabla);
    }

}

