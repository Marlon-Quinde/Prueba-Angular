export interface ResponseInterface {
    code:    string;
    message: string;
    status:  number;
    data:    Datum[];
}

export interface Datum {
    id:       number;
    nombre:   string;
    apellido: string;
    usuario:  string;
    correo:   string;
    clave:    string;
}