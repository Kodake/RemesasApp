import { observer } from 'mobx-react';
import store from '../../store/tasaStore';
import { Link } from 'react-router-dom';
import useTasas from '../../hooks/useTasas';

const List = () => {
    const { cargarListaPaginada, handleCalculate, handlePageChange } = useTasas();

    cargarListaPaginada();

    return (
        <>
            <div className="container">
                <div className='text-center m-3'>
                    <h3>Gestor de Tasas</h3>
                </div>
            </div>
            <div className="container">
                <table className="table table-hover table-striped table-bordered align-middle">
                    <thead className="table-dark text-center">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Moneda Origen</th>
                            <th scope="col">Moneda Destino</th>
                            <th scope="col">Valor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.tasas.length > 0 ? (
                            store.tasas.map((tasa: any) => (
                                <tr key={tasa.idTasa}>
                                    <th scope="row">{tasa.idTasa}</th>
                                    <td>{tasa.monedaOrigen}</td>
                                    <td>{tasa.monedaDestino}</td>
                                    <td>{tasa.valor}</td>
                                    <td className="text-center">
                                        <Link to={`/tasas/editar/${tasa.idTasa}`} className="btn btn-warning btn-sm me-sm-3">
                                            <svg fillRule="evenodd" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"></path>
                                            </svg>
                                        </Link>
                                        <button onClick={() => handleCalculate(tasa)} className="btn btn-primary btn-sm">
                                        <svg fillRule="evenodd" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-calculator" viewBox="0 0 16 16">
                                                <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                                <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">{'No hay datos para mostrar'}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {store.totalPages > 1 && (
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${store.pageNumber === 0 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(store.pageNumber - 1)} aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </button>
                            </li>
                            {[...Array(store.totalPages).keys()].map((page) => (
                                <li key={page} className={`page-item ${store.pageNumber === page ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(page)}>
                                        {page + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${store.pageNumber === store.totalPages - 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(store.pageNumber + 1)} aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </>
    );
};

export default observer(List);
