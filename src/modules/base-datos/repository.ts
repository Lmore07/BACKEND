import pool from "../../connections/conexion";

export default class BaseDatosRepository {

    obtenerTablas = async () => {
        return await pool.query(
            "select distinct(table_name) as table " +
            "from information_schema.columns where table_schema='public' " +
            "order by table_name;"
        );
    }

    obtenerColumnasByTable = async (tableName: string) => {
        return await pool.query(
            "select column_name as nombre,data_type as tipo, is_nullable as notNull " +
            "from information_schema.columns where table_schema='public' and table_name='" + tableName + "' " +
            "order by table_name;"
        );
    }

    crearTablasColumnas = async (tableName: string, columnaString: string) => {

        console.log("CREATE TABLE " + tableName + " (" + columnaString + ")");

        return await pool.query(
            "CREATE TABLE " + tableName + " (" + columnaString + ")"
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

    borrarTablas = async (tableName: string) => {
        return await pool.query(
            "DROP TABLE " + tableName + ";"
        );
    }

    borrarColumnas = async (tableName: string, columna: string) => {
        return await pool.query(
            "ALTER TABLE " + tableName + " DROP COLUMN " + columna + ";"
        );
    }

}