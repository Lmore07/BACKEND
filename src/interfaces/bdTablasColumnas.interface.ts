export interface Tabla {
    table    : string;
    columnas : Columna[];
}

export interface Columna {
    nombre      : string;
    tipo        : string;
    notNull     : string;
    length      : number;
    primaryKey  : boolean;
}

export interface Permisos {
    table    : string;
    permisos : TipoPermiso;
    user     : string;
}

export interface TipoPermiso {
    select : boolean;
    update : boolean;
    insert : boolean;
    delete : boolean;
}