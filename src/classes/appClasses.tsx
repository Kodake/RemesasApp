export class MonedaDTO {
    idMoneda: number;
    nombre: string;
    codigo: string;

    constructor(idMoneda: number, nombre: string, codigo: string) {
        this.idMoneda = idMoneda;
        this.nombre = nombre;
        this.codigo = codigo;
    }
}

export class ClienteDTO {
    idCliente: number;
    nombre: string;
    apellido: string;
    documento: string;
    tipo: number;

    constructor(idCliente: number, nombre: string, apellido: string, documento: string, tipo: number) {
        this.idCliente = idCliente;
        this.nombre = nombre;
        this.apellido = apellido;
        this.documento = documento;
        this.tipo = tipo;
    }
}