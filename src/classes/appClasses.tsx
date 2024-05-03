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

export class TasaDTO {
    idTasa: number;
    monedaOrigen: number;
    monedaDestino: number;
    valor: number;

    constructor(idTasa: number, monedaOrigen: number, monedaDestino: number, valor: number) {
        this.idTasa = idTasa;
        this.monedaOrigen = monedaOrigen;
        this.monedaDestino = monedaDestino;
        this.valor = valor;
    }
}

export class GetTasaDTO {
    idTasa: number;
    monedaOrigen: string;
    monedaDestino: string;
    valor: number;

    constructor(idTasa: number, monedaOrigen: string, monedaDestino: string, valor: number) {
        this.idTasa = idTasa;
        this.monedaOrigen = monedaOrigen;
        this.monedaDestino = monedaDestino;
        this.valor = valor;
    }
}

export class TransaccionDTO {
    idTransaccion: number;
    codigo: string;
    clienteOrigen: number;
    clienteDestino: number;
    moneda: number;
    cantidad: number;
    fecha: Date;
    retirado: boolean;

    constructor(idTransaccion: number, codigo: string, clienteOrigen: number, clienteDestino: number,
        moneda: number, cantidad: number, fecha: Date, retirado: boolean) {
        this.idTransaccion = idTransaccion;
        this.codigo = codigo;
        this.clienteOrigen = clienteOrigen;
        this.clienteDestino = clienteDestino;
        this.moneda = moneda;
        this.cantidad = cantidad;
        this.fecha = fecha;
        this.retirado = retirado;
    }
}

export class GetTransaccionDTO {
    idTransaccion: number;
    codigo: string;
    clienteDestino: string;
    moneda: string;
    cantidad: number;
    fecha: Date;
    retirado: boolean;

    constructor(idTransaccion: number, codigo: string, clienteDestino: string,
        moneda: string, cantidad: number, fecha: Date, retirado: boolean) {
        this.idTransaccion = idTransaccion;
        this.codigo = codigo;
        this.clienteDestino = clienteDestino;
        this.moneda = moneda;
        this.cantidad = cantidad;
        this.fecha = fecha;
        this.retirado = retirado;
    }
}