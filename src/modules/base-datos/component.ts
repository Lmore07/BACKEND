import { Columna, Tabla } from "../../interfaces/bdTablasColumnas.interface";
import BaseDatosRepository from "./repository";

const baseDatosColumnas = new BaseDatosRepository();

export default class BaseDatosComponent{

    obtenerTablas = async () => {
        try {
            var tablasColumnas:Tabla[]=[]
            var tablas= (await baseDatosColumnas.obtenerTablas()).rows;
            for (var i = 0; i < tablas.length; i++){
                tablasColumnas.push({
                    table: tablas[i].table_name, 
                    columnas : (await this.obtenerColumnas(tablas[i].table_name)) || []
                });
            }
            return tablasColumnas;
        } catch (error) {
            return error;
        }
    }

    obtenerTablasYColumnas = async () => {
        try {
            
        } catch (error) {
            return error;
        }
    }

    obtenerColumnas = async (table_name:string) => {
        try{
            var columnas : Columna[]= (await baseDatosColumnas.obtenerColumnasByTable(table_name)).rows;
            return columnas;
        }catch(error:any){
            return error
        }

    }

    insertarTablasColumnas = async (table:Tabla) => {
        try {
            var stringColumnas = ""
            var primaryKeyString = ""
            table.columnas.forEach(columna => {
                stringColumnas+=columna.nombre +" "+columna.tipo+" ";
                if(columna.primaryKey)
                    primaryKeyString+=columna.nombre+",";
                if(columna.length>0)
                    stringColumnas+="("+columna.length+") "
                if(columna.notNull == "SI")
                    stringColumnas+="NOT NULL, "
                else if(columna.notNull == "NO")
                    stringColumnas+="NULL, "
            });
            if(primaryKeyString.endsWith(',')){
                primaryKeyString=primaryKeyString.substring(0,primaryKeyString.length-1);
            }
            return baseDatosColumnas.insertarTablasColumnas(table.table, stringColumnas, primaryKeyString);
        } catch (error) {
            return error;
        }
    }

}