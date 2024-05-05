import { Link } from 'react-router-dom'
import { observer } from 'mobx-react';
import useTasas from '../../hooks/useTasas';
import monedaStore from '../../store/monedaStore';
import useMonedas from '../../hooks/useMonedas';

const Add = () => {
    const { handleSaveTasa, handleInputTasa, handleInputMoneda, handleClearTasa } = useTasas();
    const { listarMonedas } = useMonedas();

    listarMonedas();

    return (
        <div className="container">
            <div className="text-center m-3">
                <h3>Agregar Tasa</h3>
            </div>
            <form onSubmit={handleSaveTasa}>
                <div className="mb-3">
                    <label htmlFor='monedaOrigen' className="form-label">{'Moneda Origen'}</label>
                    <select className="form-select" id="monedaOrigen" name="monedaOrigen" onChange={handleInputMoneda}>
                        <option value={0}>Seleccione una moneda de Origen</option>
                        {monedaStore.select.map((moneda) => (
                            <option key={moneda.idMoneda} value={moneda.idMoneda}>
                                {moneda.nombre} - {moneda.codigo}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor='monedaDestino' className="form-label">{'Moneda Destino'}</label>
                    <select className="form-select" id="monedaDestino" name="monedaDestino" onChange={handleInputMoneda}>
                        <option value={0}>Seleccione una moneda de Destino</option>
                        {monedaStore.select.map((moneda) => (
                            <option key={moneda.idMoneda} value={moneda.idMoneda}>
                                {moneda.nombre} - {moneda.codigo}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor='valor' className="form-label">{'Valor'}</label>
                    <input type="number" step=".0001" className="form-control" id="valor" name="valor" autoComplete='off' onChange={handleInputTasa} />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-success btn-sm me-sm-3">Agregar</button>
                    <Link to={'/'} className="btn btn-danger btn-sm" onClick={handleClearTasa}>Regresar</Link>
                </div>
            </form>
        </div>
    )
}

export default observer(Add);