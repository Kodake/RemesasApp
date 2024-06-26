import { observer } from 'mobx-react'
import store from '../../store/transaccionStore'
import useTransacciones from '../../hooks/useTransacciones'
import { NumericFormat } from 'react-number-format'
import useTasas from '../../hooks/useTasas'
import useMonedas from '../../hooks/useMonedas'

const List = () => {
  const {
    cargarListaPaginada,
    handlePageChange,
    handleClipboard,
    truncateCode,
    handleRequestExchange,
  } = useTransacciones()
  const { listarTasas } = useTasas()
  const { listarMonedas } = useMonedas()

  cargarListaPaginada()

  listarTasas()

  listarMonedas()

  return (
    <>
      <div className="container">
        <div className="text-center m-3">
          <h3>Gestor de Transacciones</h3>
        </div>
      </div>
      <div className="container">
        <table className="table table-hover table-striped table-bordered align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Destinatario</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Moneda</th>
              <th scope="col">Código</th>
              <th scope="col">Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {store.transacciones.length > 0 ? (
              store.transacciones.map((transaccion: any) => (
                <tr key={transaccion.idTransaccion}>
                  <th scope="row">{transaccion.idTransaccion}</th>
                  <td>{transaccion.clienteDestino}</td>
                  <td>
                    <NumericFormat
                      value={transaccion.cantidad}
                      displayType={'text'}
                      thousandSeparator=","
                      prefix="$"
                      decimalScale={2}
                      fixedDecimalScale
                    />
                  </td>
                  <td>{transaccion.moneda}</td>
                  <td>{truncateCode(transaccion.codigo)}</td>
                  <td className="text-center">
                    {transaccion.retirado ? (
                      <span className="badge text-bg-danger">Retirado</span>
                    ) : (
                      <span className="badge text-bg-success">Disponible</span>
                    )}
                  </td>
                  <td className="text-center">
                    {!transaccion.retirado ? (
                      <button
                        onClick={() => handleRequestExchange(transaccion)}
                        className="btn btn-warning btn-sm me-sm-3"
                      >
                        <svg
                          fillRule="evenodd"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="bi bi-arrow-repeat"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                          <path
                            fillRule="evenodd"
                            d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning btn-sm me-sm-3"
                        disabled
                      >
                        <svg
                          fillRule="evenodd"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="bi bi-arrow-repeat"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                          <path
                            fillRule="evenodd"
                            d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                          />
                        </svg>
                      </button>
                    )}

                    <button
                      onClick={() => handleClipboard(transaccion.codigo)}
                      className="btn btn-primary btn-sm"
                    >
                      <svg
                        fillRule="evenodd"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-clipboard-check"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"
                        />
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center">
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
