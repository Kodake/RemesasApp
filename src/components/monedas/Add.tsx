import { Link } from 'react-router-dom'
import { observer } from 'mobx-react';
import useMonedas from '../../hooks/useMonedas';

const Add = () => {
    const { handleSaveMoneda, handleInputMoneda } = useMonedas();

    return (
        <div className="container">
            <div className="text-center m-3">
                <h3>Agregar Moneda</h3>
            </div>
            <form onSubmit={handleSaveMoneda}>
                <div className="mb-3">
                    <label htmlFor='nombre' className="form-label">{'Nombre'}</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" autoComplete='off' onChange={handleInputMoneda} />
                </div>
                <div className="mb-3">
                    <label htmlFor='codigo' className="form-label">{'Código'}</label>
                    <input type="text" className="form-control" id="codigo" name="codigo" autoComplete='off' onChange={handleInputMoneda} />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-success btn-sm me-sm-3">Agregar</button>
                    <Link to={'/'} className="btn btn-danger btn-sm">Regresar</Link>
                </div>
            </form>
        </div>
    )
}

export default observer(Add);