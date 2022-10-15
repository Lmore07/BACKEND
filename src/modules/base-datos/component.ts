import { Columna, Tabla } from "../../interfaces/bdTablasColumnas.interface";
import BaseDatosRepository from "./repository";

const baseDatosColumnas = new BaseDatosRepository();

export default class BaseDatosComponent{

    obtenerTablas = async () => {
        return (await baseDatosColumnas.obtenerTablas()).rows;
    }

    obtenerTablasYColumnas = async () => {
        var tablas = <any>(await this.obtenerTablas())
        var tablasColumnas:Tabla[]=[]
        for (var i = 0; i < tablas.length; i++){
            tablasColumnas.push({
            table: tablas[i].table_name, 
                columnas :  <Columna[]>(await this.obtenerColumnas(tablas[i].table_name))
            });
        }
        return tablasColumnas;
    }

    obtenerColumnas = async (table_name:string) => {
        var columnas :Columna[] =  (await baseDatosColumnas.obtenerColumnasByTable(table_name)).rows;
        return columnas;
    }

    insertarTablasColumnas = async (table:Tabla) => {
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
    }

}