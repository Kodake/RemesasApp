import { observer } from 'mobx-react'
import store from '../../store/monedaStore'
import { Link } from 'react-router-dom'
import useMonedas from '../../hooks/useMonedas'

const List = () => {
  const { cargarListaPaginada, handlePageChange } = useMonedas()

  cargarListaPaginada()

  return (
    <>
      <div className="container">
        <div className="text-center m-3">
          <h3>Gestor de Monedas</h3>
        </div>
      </div>
      <div className="container">
        <table className="table table-hover table-striped table-bordered align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Código</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {store.monedas.length > 0 ? (
              store.monedas.map((moneda: any) => (
                <tr key={moneda.idMoneda}>
                  <th scope="row">{moneda.idMoneda}</th>
                  <td>{moneda.nombre}</td>
                  <td>{moneda.codigo}</td>
                  <td className="text-center">
                    <Link
                      to={`/monedas/editar/${moneda.idMoneda}`}
                      className="btn btn-warning btn-sm me-sm-3"
                    >
                      <svg
                        fillRule="evenodd"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                        ></path>
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  {'No hay datos para mostrar'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {store.totalPages > 1 && (
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${store.pageNumber === 0 ? 'disabled' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(store.pageNumber - 1)}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {[...Array(store.totalPages).keys()].map((page) => (
                <li
                  key={page}
                  className={`page-item ${store.pageNumber === page ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page)}
                  >
                    {page + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${store.pageNumber === store.totalPages - 1 ? 'disabled' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(store.pageNumber + 1)}
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  )
}

export default observer(List)
