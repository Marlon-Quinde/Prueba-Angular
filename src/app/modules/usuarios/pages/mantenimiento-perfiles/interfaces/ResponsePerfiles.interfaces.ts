export interface ResponsePerfiles {
    code:    string;
    message: string;
    status:  number;
    data:    Datum[];
}

export interface Datum {
    id:          number;
    descripcion: string;
}
