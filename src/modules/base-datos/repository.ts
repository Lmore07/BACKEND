import pool from "../../connections/conexion";

export default class BaseDatosRepository{

    obtenerTablas = async () => {
        return await pool.query("select distinct(table_name) "+
                            "from information_schema.columns where table_schema='public' "+ 
                            "order by table_name;");
    }

    obtenerColumnasByTable = async (table_name:string) => {
        return await pool.query("select column_name as nombre,data_type as tipo, is_nullable as notNull "+
        "from information_schema.columns where table_schema='public' and table_name='"+table_name+"' "+ 
        "order by table_name;");
    }

    insertarTablasColumnas = async (table_name:string, columnasString:string, primaryKeyString:string) =>{
        return await pool.query("CREATE TABLE "+table_name+" ("+columnasString+" PRIMARY KEY ("+primaryKeyString+"))");
    }
}