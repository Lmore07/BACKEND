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