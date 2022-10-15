import { Request,Response } from "express"
import pool from "../../connections/conexion";
import { Columna, Tabla } from "../../interfaces/bdTablasColumnas.interface";
import BaseDatosComponent from "./component";

const bdTablasColumnas = new BaseDatosComponent();

export default class BaseDatosController{

    obtenerTablasColumnas=async () => {
        return bdTablasColumnas.obtenerTablasYColumnas();
    }
    
    creaTablaColumnas = async (req:Request) => {
        return bdTablasColumnas.insertarTablasColumnas(<Tabla>req.body);
    }

}

