import { Request,Response } from "express"
import pool from "../../connections/conexion";
import { Columna, Tabla } from "../../interfaces/bdTablasColumnas.interface";
import BaseDatosComponent from "./component";

const bdTablasColumnas = new BaseDatosComponent();

export default class BaseDatosController{

    obtenerTablasColumnas=async () => {
        return bdTablasColumnas.obtenerTablasYColumnas();
    }

    crearTablaColumnas = async (req:Request) => {
        return bdTablasColumnas.crearTablasColumnas(<Tabla>req.body);
    }

    otorgarPermisosTablas = async (req:Request) => {
        return bdTablasColumnas.otorgarPermisosTablas(req.body);
    }

    obtenerColumnas = async (req:Request) => {
        return bdTablasColumnas.obtenerColumnas(req.params.table);
    }

    obtenerTablas = async () => {
        return bdTablasColumnas.obtenerTablas();
    }

}

