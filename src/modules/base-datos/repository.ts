import pool from "../../connections/conexionPostgre";

export default class BaseDatosRepository {

    obtenerTablas = async () => {
        return await pool.query(
            "SELECT * FROM tabla where status=true;"
        );
    }

    obtenerTablaByID = async (idTable:string) => {
        return await pool.query(
            "SELECT * FROM tabla where status=true and id="+idTable+";"
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
        " CREATE TABLE " + tableName + " (id SERIAL PRIMARY KEY, answer_id INTEGER, " + columnaString + " created_At DATE);"+
        " COMMIT;");
    }

    borrarTablas = async (idTable: string) => {
        return await pool.query(
            "BEGIN;"+
            " UPDATE tabla SET status=false WHERE id="+idTable+";"+
            " UPDATE fields SET status=false WHERE id_table="+idTable+";"+
            " COMMIT;"
        );
    }

    borrarColumnas = async (idTable: string, idColumna: string) => {
        return await pool.query(
            "BEGIN;"+
            " UPDATE fields SET status=false WHERE id_table="+idTable+" and id="+idColumna+";"+
            " COMMIT;"
        );
    }

}