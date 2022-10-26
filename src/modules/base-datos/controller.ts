import { Request,Response } from "express"
import { Tabla } from "../../interfaces/bdTablasColumnas.interface";
import BaseDatosComponent from "./component";

const bdTablasColumnas = new BaseDatosComponent();

export default class BaseDatosController{

    obtenerTablas = async () => {
        return bdTablasColumnas.obtenerTablas();
    }

    obtenerColumnas = async (req:Request) => {
        return bdTablasColumnas.obtenerColumnas(req.params.table);
    }

    obtenerTablasColumnas=async () => {
        return bdTablasColumnas.obtenerTablasYColumnas();
    }

    crearTablaColumnas = async (req:Request) => {
        return bdTablasColumnas.crearTablasColumnas(req.body);
    }

    borrarTablas = async (req:Request) => {
        return bdTablasColumnas.borrarTablas(req.params.tableName);
    }

    borrarColumna = async (req:Request) => {
        return bdTablasColumnas.borrarColumnas(req.params.table, req.params.columna);
    }

    otorgarPermisosTablas = async (req:Request) => {
        return bdTablasColumnas.otorgarPermisosTablas(req.body);
    }

}

