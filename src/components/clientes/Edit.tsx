import { Link } from 'react-router-dom'
import store from '../../store/clienteStore';
import { observer } from 'mobx-react';
import useClientes from '../../hooks/useClientes';

const Edit = () => {
    const { buscarPorId, handleInputCliente, handleInputTipoDocumento, handleUpdateCliente } = useClientes();

    buscarPorId();

    return (
        <div className="container">
            <div className="text-center m-3">
                <h3>Editar Cliente</h3>
            </div>
            <form onSubmit={handleUpdateCliente}>
                <div className="mb-3">
                    <label htmlFor='nombre' className="form-label">{'Nombre'}</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" autoComplete='off' onChange={handleInputCliente} value={store.cliente.nombre || ''} />
                </div>
                <div className="mb-3">
                    <label htmlFor='apellido' className="form-label">{'Apellido'}</label>
                    <input type="text" className="form-control" id="apellido" name="apellido" autoComplete='off' onChange={handleInputCliente} value={store.cliente.apellido || ''} />
                </div>
                <div className="mb-3">
                    <label htmlFor='tipo' className="form-label">{'Tipo de Documento'}</label>
                    <select className="form-select" id="tipo" name="tipo" onChange={handleInputTipoDocumento} value={store.cliente.tipo}>
                        <option value={0}>Cédula</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor='documento' className="form-label">{'Documento'}</label>
                    <input type="text" className="form-control" id="documento" name="documento" autoComplete='off' onChange={handleInputCliente} value={store.cliente.documento || 0} />
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