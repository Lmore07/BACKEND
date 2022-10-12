import { Request,Response } from "express"
import pool from "../../models/conexion";

export const obtener_tablas=async (req:Request,res:Response) => {
    var datos=await pool.query("select tablename from pg_catalog.pg_tables where schemaname='public';");
    return datos;
}

export const inserta_fila=async (req:Request,res:Response) => {
    console.log(req.body);
    return 1;
}