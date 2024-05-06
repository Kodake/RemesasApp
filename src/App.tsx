import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

function App() {
  return (
    <>
      <div className="container">
        <div className="text-center m-3">
          <h3>Gestor de Remesas</h3>
        </div>
      </div>
      <div className="container">
        <table className="table table-hover table-striped table-bordered align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th scope="col">Módulo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">{'Monedas'}</td>
              <td className="text-center">
                <Link to={`/monedas`} className="btn btn-info btn-sm me-sm-3">
                  <svg
                    fillRule="evenodd"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-folder-symlink-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2l.04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3M2.19 3q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672a1 1 0 0 1 .707.293L7.586 3zm9.608 5.271-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742" />
                  </svg>
                </Link>
              </td>
            </tr>
            <tr>
              <td className="text-center">{'Clientes'}</td>
              <td className="text-center">
                <Link to={`/clientes`} className="btn btn-info btn-sm me-sm-3">
                  <svg
                    fillRule="evenodd"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-folder-symlink-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2l.04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3M2.19 3q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672a1 1 0 0 1 .707.293L7.586 3zm9.608 5.271-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742" />
                  </svg>
                </Link>
              </td>
            </tr>
            <tr>
              <td className="text-center">{'Tasas'}</td>
              <td className="text-center">
                <Link to={`/tasas`} className="btn btn-info btn-sm me-sm-3">
                  <svg
                    fillRule="evenodd"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-folder-symlink-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2l.04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3M2.19 3q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672a1 1 0 0 1 .707.293L7.586 3zm9.608 5.271-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742" />
                  </svg>
                </Link>
              </td>
            </tr>
            <tr>
              <td className="text-center">{'Transacciones'}</td>
              <td className="text-center">
                <Link
                  to={`/transacciones`}
                  className="btn btn-info btn-sm me-sm-3"
                >
                  <svg
                    fillRule="evenodd"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-folder-symlink-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2l.04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3M2.19 3q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672a1 1 0 0 1 .707.293L7.586 3zm9.608 5.271-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742" />
                  </svg>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default observer(App)
