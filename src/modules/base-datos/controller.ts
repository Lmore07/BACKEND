import { request, Request,Response } from "express"
import { Tabla, Table } from "../../interfaces/bdTablasColumnas.interface";
import BaseDatosComponent from "./component";

const bdTablasColumnas = new BaseDatosComponent();

export default class BaseDatosController{

    obtenerTablas = async () => {
        return bdTablasColumnas.obtenerTablas();
    }

    obtenerDetalleTabla = async (req:Request) => {
        return bdTablasColumnas.obtenerDetalleTabla(req.params.id);
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
        return bdTablasColumnas.borrarTablas(req.params.idTable);
    }

    borrarColumna = async (req:Request) => {
        return bdTablasColumnas.borrarColumnas(req.params.idTable, req.params.idColumna);
    }

    otorgarPermisosTablas = async (req:Request) => {
        return bdTablasColumnas.otorgarPermisosTablas(req.body);
    }

}

