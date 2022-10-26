import pool from "../../connections/conexionPostgre";
import { Tabla } from "../../interfaces/bdTablasColumnas.interface";

export default class BaseDatosRepository {

    obtenerTablas = async () => {
        return await pool.query(
            "SELECT * FROM tabla where status=true;"
        );
    }

    obtenerColumnasByTable = async (idTable: string) => {
        return await pool.query(
            "select * from fields where id_table="+idTable+" and status=true;"
        );
    }

    insertaTablesFields = async (tableName:string,columnaString:string,tableDatos: string, fieldsDatos:String) => {        
        return await pool.query("BEGIN;"+
        " INSERT INTO tabla (name, description, status, created_at, company_id,code) VALUES ("+tableDatos+");"+
        " INSERT INTO fields (id_table, name, description, status, created_at, code) VALUES "+fieldsDatos+" ;"+
        " CREATE TABLE " + tableName + " (answer_id INTEGER, " + columnaString + " created_At DATE);"+
        " COMMIT;");
    }

    borrarTablas = async (tabla: string) => {
        return await pool.query(
            "BEGIN;"+
            " UPDATE tabla SET status=false WHERE id="+tabla+";"+
            " UPDATE fields SET status=false WHERE id_table="+tabla+";"+
            " COMMIT;"
        );
    }

    borrarColumnas = async (table: string, columna: string) => {
        return await pool.query(
            "BEGIN;"+
            " UPDATE fields SET status=false WHERE id_table="+table+" and id="+columna+";"+
            " COMMIT;"
        );
    }

    grantAndRevokePermisosTables = async (tableName: string, permisosGrants: string, permisosRevokes: string, user: string) => {
        return await pool.query(
            "GRANT " + permisosGrants + " ON " + tableName + " TO " + user + "; " +
            "REVOKE " + permisosRevokes + " ON " + tableName + " FROM " + user + ";"
        );
    }

    grantPermisosTables = async (tableName: string, permisosGrants: string, user: string) => {
        return await pool.query(
            "GRANT " + permisosGrants + " ON " + tableName + " TO " + user + ";"
        );
    }

    revokePermisosTables = async (tableName: string, permisosRevokes: string, user: string) => {
        return await pool.query(
            "REVOKE " + permisosRevokes + " ON " + tableName + " FROM " + user + ";"
        );
    }

}