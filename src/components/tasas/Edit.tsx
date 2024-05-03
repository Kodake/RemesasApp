import { Link } from 'react-router-dom'
import store from '../../store/tasaStore';
import { observer } from 'mobx-react';
import useTasas from '../../hooks/useTasas';
import storeMon from '../../store/monedaStore';

const Edit = () => {
    const { buscarPorId, listarMonedas, handleUpdateTasa, handleInputTasa, handleInputMoneda } = useTasas();

    listarMonedas();

    buscarPorId();

    return (
        <div className="container">
            <div className="text-center m-3">
                <h3>Editar Tasa</h3>
            </div>
            <form onSubmit={handleUpdateTasa}>
            <div className="mb-3">
                    <label htmlFor='monedaOrigen' className="form-label">{'Moneda Origen'}</label>
                    <select className="form-select" id="monedaOrigen" name="monedaOrigen" onChange={handleInputMoneda} value={store.tasa.monedaOrigen}>
                        <option value={0}>Seleccione una moneda de Origen</option>
                        {storeMon.select.map((moneda) => (
                            <option key={moneda.idMoneda} value={moneda.idMoneda}>
                                {moneda.nombre} - {moneda.codigo}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor='monedaDestino' className="form-label">{'Moneda Destino'}</label>
                    <select className="form-select" id="monedaDestino" name="monedaDestino" onChange={handleInputMoneda} value={store.tasa.monedaDestino}>
                        <option value={0}>Seleccione una moneda de Destino</option>
                        {storeMon.select.map((moneda) => (
                            <option key={moneda.idMoneda} value={moneda.idMoneda}>
                                {moneda.nombre} - {moneda.codigo}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor='valor' className="form-label">{'Valor'}</label>
                    <input type="number" step=".0001" className="form-control" id="valor" name="valor" autoComplete='off' onChange={handleInputTasa} value={store.tasa.valor}/>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-success btn-sm me-sm-3">Actualizar</button>
                    <Link to={'/'} className="btn btn-danger btn-sm">Regresar</Link>
                </div>
            </form>
        </div>
    )
}

export default observer(Edit);