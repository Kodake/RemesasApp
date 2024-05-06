import { Link } from 'react-router-dom'
import store from '../../store/monedaStore'
import { observer } from 'mobx-react'
import useMonedas from '../../hooks/useMonedas'

const Edit = () => {
  const {
    buscarPorId,
    handleUpdateMoneda,
    handleInputMoneda,
    handleClearMoneda,
  } = useMonedas()

  buscarPorId()

  return (
    <div className="container">
      <div className="text-center m-3">
        <h3>Editar Moneda</h3>
      </div>
      <form onSubmit={handleUpdateMoneda}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            {'Nombre'}
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            autoComplete="off"
            onChange={handleInputMoneda}
            value={store.moneda.nombre || ''}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="codigo" className="form-label">
            {'Código'}
          </label>
          <input
            type="text"
            className="form-control"
            id="codigo"
            name="codigo"
            autoComplete="off"
            onChange={handleInputMoneda}
            value={store.moneda.codigo || ''}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success btn-sm me-sm-3">
            Actualizar
          </button>
          <Link
            to={'/'}
            className="btn btn-danger btn-sm"
            onClick={handleClearMoneda}
          >
            Regresar
          </Link>
        </div>
      </form>
    </div>
  )
}

export default observer(Edit)
