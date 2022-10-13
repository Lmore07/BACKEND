import { Request,Response } from "express"
import pool from "../../models/conexion";

export const obtenerTablas=async (req:Request,res:Response) => {
    var respuesta=[]
    var tablas = await pool.query("select distinct(table_name) "+
                            "from information_schema.columns where table_schema='public' "+ 
                            "order by table_name;");
    for (let index = 0; index < tablas.rows.length; index++) {
        var columnas = await pool.query("select column_name,data_type, is_nullable "+
                                    "from information_schema.columns where table_schema='public' and table_name='"+tablas.rows[index].table_name+"' "+ 
                                    "order by table_name;");
        respuesta.push({table:tablas.rows[index].table_name, columnas:JSON.stringify(columnas.rows)})
    }
    return JSON.stringify(respuesta);
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
                primaryKey+=req.body.columnas[i].nombre+"";
        }
        columnas+=", PRIMARY KEY ("+primaryKey+")";
        await pool.query("CREATE TABLE "+req.body.table+"("+columnas+")");
        return {estado:"success"}
    } catch (error) {
        return {error:error}
    }
}