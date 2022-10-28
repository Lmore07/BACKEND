import {
  Columna,
  Tabla,
  Table
} from "../../interfaces/bdTablasColumnas.interface";
import BaseDatosRepository from "./repository";

const baseDatosColumnas = new BaseDatosRepository();

export default class BaseDatosComponent {

  /* A function that returns a promise that returns an array of tables. */
  obtenerTablas = async () => {
    return <Table[]>(await baseDatosColumnas.obtenerTablas()).rows;
  };

  /* A function that returns a promise that returns an array of columns. */
  obtenerColumnas = async (idTable: string) => {
    return <Columna[]>(
      (await baseDatosColumnas.obtenerColumnasByTable(idTable)).rows
    );
  };

  /* A function that returns a promise that returns an array of tables and columns. */
  obtenerTablasYColumnas = async () => {
    var tables = await this.obtenerTablas();
    var tablasGeneral: Tabla[]=[];
    for (var i = 0; i < tables.length; i++) {
      let fields = await this.obtenerColumnas(tables[i].id);
      tablasGeneral.push({table:tables[i], fields:fields});
    }
    return tablasGeneral;
  };

  obtenerDetalleTabla = async (idTable:string) => {
    let table = <Table>(await baseDatosColumnas.obtenerTablaByID(idTable)).rows[0];
    let fields = await this.obtenerColumnas(idTable);
    var tablaGeneral:Tabla[]=[{table:table, fields:fields}];
    return tablaGeneral;
  }

  /* Creating a table with the columns that are passed in the table object. */
  crearTablasColumnas = async (table: Tabla) => {
    var stringColumnas     = "";
    table.table.created_At = new Date().toLocaleString();
    table.table.status     = true;
    var fieldsDatos        = "";
    var tableDatos         = "'"+table.table.name+"','"+table.table.description+"',"+table.table.status+",'"+
                             table.table.created_At+"',"+table.table.company_id+",'"+table.table.code+"'";
    table.fields.forEach((columna) => {
      stringColumnas     += columna.name.trimEnd() + " VARCHAR,";
      columna.status      =  true;
      columna.created_At  =  new Date().toLocaleString();
      fieldsDatos        += "((select id from tabla where code='"+table.table.code+"'),'"+columna.name+"','"+columna.description+"',"+columna.status+",'"+columna.created_At+"','"+columna.code+"'),";
    });
    if(fieldsDatos.endsWith(","))
      fieldsDatos = fieldsDatos.substring(0,fieldsDatos.length-1);
    return baseDatosColumnas.insertaTablesFields(table.table.name, stringColumnas,tableDatos,fieldsDatos);
  };

  /* Deleting a table. */
  borrarTablas = async (idTable: string) => {
    return baseDatosColumnas.borrarTablas(idTable);
  };

  /* Deleting a column. */
  borrarColumnas = async (idTable: string, idColumna: string) => {
    return baseDatosColumnas.borrarColumnas(idTable, idColumna);
  };

  /* This function is used to grant or revoke permissions to a table. */
  /*otorgarPermisosTablas = async (permisosReq: Permisos) => {
    var permisosGrants = "";
    var permisosRevokes = "";
    if (permisosReq.permisos.select) permisosGrants += "SELECT,";
    else permisosRevokes += "SELECT,";
    if (permisosReq.permisos.update) permisosGrants += "UPDATE,";
    else permisosRevokes += "UPDATE,";
    if (permisosReq.permisos.delete) permisosGrants += "DELETE,";
    else permisosRevokes += "DELETE,";
    if (permisosReq.permisos.insert) permisosGrants += "INSERT,";
    else permisosRevokes += "INSERT,";

    if (permisosGrants.endsWith(","))
      permisosGrants = permisosGrants.substring(0, permisosGrants.length - 1);
    if (permisosRevokes.endsWith(","))
        permisosRevokes = permisosRevokes.substring(0,permisosRevokes.length - 1);
    if (permisosGrants != "" && permisosRevokes != "")
      return baseDatosColumnas.grantAndRevokePermisosTables(
        permisosReq.table,
        permisosGrants,
        permisosRevokes,
        permisosReq.user
      );
    else if (permisosGrants != "")
      return baseDatosColumnas.grantPermisosTables(
        permisosReq.table,
        permisosGrants,
        permisosReq.user
      );
    return baseDatosColumnas.revokePermisosTables(
      permisosReq.table,
      permisosRevokes,
      permisosReq.user
    );
  };*/
  
}
