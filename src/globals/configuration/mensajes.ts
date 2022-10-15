import { CodigosPostgreEnum } from "../../enum/codigosPostgreEnum";

export const TRANSACCION_EXITOSA: string = 'Transacción Exitosa';
export const TRANSACCION_ERRONEA: string = 'No se pudo completar la transacción';


export const ERROR_POSTGRESQL = (codigo: string) => {
    switch(codigo){
        case CodigosPostgreEnum.columnaAmbigua: return 'Columna Ambigua';
        case CodigosPostgreEnum.columnaDuplicada: return 'Columna Duplicada';
        case CodigosPostgreEnum.columnaIndefinida: return 'Columna No Definida';
        case CodigosPostgreEnum.datosErroneos: return 'Datos Erroneos';
        case CodigosPostgreEnum.errorSintaxis: return 'Error en la sintaxis';
        case CodigosPostgreEnum.falloConeccion: return 'Ocurrio un error en la conexion a la base de datos';
        case CodigosPostgreEnum.llaveForaneInvalida: return 'Llave Foranea no existe';
        case CodigosPostgreEnum.nombreInvalido: return 'Nombre no válido';
        case CodigosPostgreEnum.privilegioNoRevocado: return 'Privilegios no fueron revocados';
        case CodigosPostgreEnum.privilegiosInsuficientes: return 'Privilegios insuficiente';
        case CodigosPostgreEnum.tablaDuplicada: return 'Tabla duplicada';
        case CodigosPostgreEnum.tablaIndefinida: return 'Tabla no definida';
        case CodigosPostgreEnum.falloAuth: return 'Falló la autenticacion de las credenciales';
    }
    return "Error en base de datos"
}