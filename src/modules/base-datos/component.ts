import { Columna, Permisos, Tabla } from "../../interfaces/bdTablasColumnas.interface";
import BaseDatosRepository from "./repository";

const baseDatosColumnas = new BaseDatosRepository();

export default class BaseDatosComponent{

    obtenerTablas = async () => {
        return <Tabla[]>(await baseDatosColumnas.obtenerTablas()).rows;
    }

    obtenerTablasYColumnas = async () => {
        var tablas = (await this.obtenerTablas())
        for (var i = 0; i < tablas.length; i++){
            tablas[i].columnas = (await this.obtenerColumnas(tablas[i].table))
        }
        return tablas;
    }

    obtenerColumnas = async (table_name:string) => {
        return <Columna[]> (await baseDatosColumnas.obtenerColumnasByTable(table_name)).rows;
    }

    crearTablasColumnas = async (table:Tabla) => {
        var stringColumnas = ""
        table.columnas.forEach(columna => {
            stringColumnas+=columna.nombre +" "+columna.tipo+" NULL,";
        });
        if(stringColumnas.endsWith(","))
            stringColumnas=stringColumnas.substring(0,stringColumnas.length-1);
        return baseDatosColumnas.crearTablasColumnas(table.table, stringColumnas);
    }

    otorgarPermisosTablas = async (permisosReq:Permisos) => {
        var permisosGrants = ""
        var permisosRevokes = ""
        if(permisosReq.permisos.select)
            permisosGrants+="SELECT,";
        else
            permisosRevokes+="SELECT,";
        if(permisosReq.permisos.update)
            permisosGrants+="UPDATE,";
        else
            permisosRevokes+="UPDATE,";
        if(permisosReq.permisos.delete)
            permisosGrants+="DELETE,";
        else
            permisosRevokes+="DELETE,";
        if(permisosReq.permisos.insert)
            permisosGrants+="INSERT,";
        else
            permisosRevokes+="INSERT,";

        if(permisosGrants.endsWith(','))
            permisosGrants=permisosGrants.substring(0,permisosGrants.length - 1);
        if(permisosRevokes.endsWith(','))
            permisosRevokes=permisosRevokes.substring(0,permisosRevokes.length - 1);
        
        if(permisosGrants!="" && permisosRevokes !="")
            return baseDatosColumnas.grantAndRevokePermisosTables(permisosReq.table,permisosGrants,permisosRevokes,permisosReq.user);
        else if(permisosGrants!="")
            return baseDatosColumnas.grantPermisosTables(permisosReq.table,permisosGrants,permisosReq.user);
        return baseDatosColumnas.revokePermisosTables(permisosReq.table,permisosRevokes,permisosReq.user);
    }

    borrarTablas = async (tableName:string) => {
        return baseDatosColumnas.borrarTablas(tableName);
    }

    borrarColumnas = async (tableName:string,columna:string) => {
        return baseDatosColumnas.borrarColumnas(tableName,columna);
    }

}