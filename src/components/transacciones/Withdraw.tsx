import { Link } from "react-router-dom";
import useClientes from "../../hooks/useClientes";
import useMonedas from "../../hooks/useMonedas";
import useTransacciones from "../../hooks/useTransacciones";
import clienteStore from "../../store/clienteStore";
import monedaStore from "../../store/monedaStore";
import store from "../../store/transaccionStore";
import { observer } from "mobx-react";

const Withdraw = () => {
    const { buscarPorCodigo, handleInputCliente, handleInputMoneda, handleInputTransaccion, handleUpdateTransaccion, handleClearTransaccion } = useTransacciones();
    const { listarClientes } = useClientes();
    const { listarMonedas } = useMonedas();

    listarClientes();

    listarMonedas();

    buscarPorCodigo();

    return (
        <div className="container">
            <div className="text-center m-3">
                <h3>Realizar Retiro</h3>
            </div>
            <form onSubmit={handleUpdateTransaccion}>
                <div className="mb-3">
                    <label htmlFor='clienteOrigen' className="form-label">{'Cliente Origen'}</label>
                    <select className="form-select" id="clienteOrigen" name="clienteOrigen" onChange={handleInputCliente} value={store.transaccion.clienteOrigen} disabled>
                        <option value={0}>Seleccione el cliente que Envía</option>
                        {clienteStore.select.map((cliente) => (
                            <option key={cliente.idCliente} value={cliente.idCliente}>
                                {cliente.documento} - {cliente.nombre} {cliente.apellido}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor='clienteDestino' className="form-label">{'Cliente Destino'}</label>
                    <select className="form-select" id="clienteDestino" name="clienteDestino" onChange={handleInputCliente} value={store.transaccion.clienteDestino} disabled>
                        <option value={0}>Seleccione el cliente que Recibe</option>
                        {clienteStore.select.map((cliente) => (
                            <option key={cliente.idCliente} value={cliente.idCliente}>
                                {cliente.documento} - {cliente.nombre} {cliente.apellido}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor='moneda' className="form-label">{'Moneda'}</label>
                    <select className="form-select" id="moneda" name="moneda" onChange={handleInputMoneda} value={store.transaccion.moneda} disabled>
                        <option value={0}>Seleccione el tipo de moneda</option>
                        {monedaStore.select.map((moneda) => (
                            <option key={moneda.idMoneda} value={moneda.idMoneda}>
                                {moneda.nombre} - {moneda.codigo}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor='cantidad' className="form-label">{'Cantidad'}</label>
                    <input type="number" step=".0001" className="form-control" id="cantidad" name="cantidad" autoComplete='off' onChange={handleInputTransaccion} value={store.transaccion.cantidad} disabled />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-success btn-sm me-sm-3">Retirar</button>
                    <Link to={'/'} className="btn btn-danger btn-sm" onClick={handleClearTransaccion}>Regresar</Link>
                </div>
            </form>
        </div>
    )
}

export default observer(Withdraw);