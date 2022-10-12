import { Request,Response } from "express"
import pool from "../../models/conexion";

export const obtenerTablas=async (req:Request,res:Response) => {
    var datos=await pool.query("select tablename from pg_catalog.pg_tables where schemaname='public'");
    return datos;
}

export const insertaFila=async (req:Request,res:Response) => {
    var datos=await pool.query("INSERT INTO prueba (id,nombre) VALUES ("+req.body.id+",'"+req.body.nombre+"');");
    if(datos.rowCount==0)
        return {estado:"failed"}
    return {estado:"success"}
}

export const creaTablaColumnas=async (req:Request,res:Response) => {
    try {
        var columnas="";
        var primaryKey=""
        for(var i=0;i<req.body.columnas.length;i++){
            columnas+=req.body.columnas[i].nombre +" "+req.body.columnas[i].tipo+" ";
            if(req.body.columnas[i].length>0)
                columnas+="("+req.body.columnas[i].length+") "
            if(req.body.columnas[i].notNull && i < req.body.columnas.length-1)
                columnas+="NOT NULL, "
            else if(req.body.columnas[i].notNull==false && i < req.body.columnas.length-1)
                columnas+="NULL, "
            else if(req.body.columnas[i].notNull)
                columnas+="NOT NULL "
            else if(req.body.columnas[i].notNull==false)
                columnas+="NULL"
            if(req.body.columnas[i].primaryKey && i < req.body.columnas.length-1)
                primaryKey+=req.body.columnas[i].nombre+",";
            else if(req.body.columnas[i].primaryKey)
                primaryKey+=req.body.columnas[i].nombre+" ";
        }
        columnas+=", PRIMARY KEY ("+primaryKey+")";
        var datos=await pool.query("CREATE TABLE "+req.body.table+"("+columnas+")");
        console.log(datos);
        //if(datos.rowCount==0)
            //return {estado:"failed"}
        return {estado:"success"}
    } catch (error) {
        return {error:error}
    }
}