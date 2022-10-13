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
        respuesta.push({table:tablas.rows[index].table_name, columnas:columnas.rows})
    }
    return respuesta;
}

export const creaTablaColumnas = async (req:Request,res:Response) => {
    try {
        var columnas="";
        var primaryKey=""
        req.body.columnas.forEach((columna: { nombre: string; tipo: string; primaryKey: boolean; length: number; notNull: boolean; }) => {
            columnas+=columna.nombre +" "+columna.tipo+" ";
            if(columna.primaryKey)
                primaryKey+=columna.nombre+",";
            if(columna.length>0)
                columnas+="("+columna.length+") "
            if(columna.notNull)
                columnas+="NOT NULL, "
            else if(columna.notNull==false)
                columnas+="NULL, "
        });
        if(primaryKey.endsWith(',')){
            primaryKey=primaryKey.substring(0,primaryKey.length-1);
        }
        await pool.query("CREATE TABLE "+req.body.table+"("+columnas+" PRIMARY KEY ("+primaryKey+"))");
        return {estado:"success"}
    } catch (error) {
        console.log(error);
        return {error:error}
    }
}