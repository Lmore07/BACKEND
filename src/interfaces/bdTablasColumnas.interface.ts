export interface Tabla {
    table    : Table;
    fields : Columna[];
}

export interface Columna {
    id          : string;
    id_table    : string;
    name        : string;
    description : string;
    status      : boolean;
    created_At  : string;
    code        : string;
}

export interface Table {
    id          : string;
    name        : string;
    description : string;
    code        : string;
    company_id  : number;
    status      : boolean;
    created_At  : string;
}